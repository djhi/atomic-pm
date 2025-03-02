import { supabaseDataProvider } from "ra-supabase";
import {
  addLocksMethodsBasedOnALockResource,
  addRealTimeMethodsBasedOnSupabase,
} from "@react-admin/ra-realtime";
import { addRevisionMethodsBasedOnSingleResource } from "@react-admin/ra-history";
import {
  withLifecycleCallbacks,
  type DataProvider,
  type GetOneResult,
  type RaRecord,
} from "react-admin";
import { queryClient } from "../queryClient";
import { supabaseClient } from "../supabaseClient";

const baseDataProvider = addRevisionMethodsBasedOnSingleResource(
  addLocksMethodsBasedOnALockResource(
    addRealTimeMethodsBasedOnSupabase({
      dataProvider: supabaseDataProvider({
        instanceUrl: import.meta.env.VITE_SUPABASE_URL,
        apiKey: import.meta.env.VITE_SUPAPASE_ANON_KEY,
        supabaseClient,
      }),
      supabaseClient,
    }),
  ),
);

export const dataProvider: DataProvider = withLifecycleCallbacks(
  {
    ...baseDataProvider,
    invite: async ({ data }: { data: { email: string; board_id: number } }) => {
      const { data: invitation, error } = await supabaseClient.functions.invoke(
        "invite",
        { method: "POST", body: data },
      );

      if (error) {
        throw new Error(error.message);
      }

      return { data: invitation };
    },
    answerInvitation: async ({
      data,
    }: {
      data: { invitation_id: number; accepted: boolean };
    }) => {
      const { error } = await supabaseClient.functions.invoke(
        "answer_invitation",
        { method: "PATCH", body: data },
      );

      if (error) {
        throw new Error(error.message);
      }

      return { data: {} };
    },
    moveCard: async ({
      data,
    }: {
      data: { card_id: number; column_id: number; position: number };
    }) => {
      const { data: response, error } = await supabaseClient.functions.invoke(
        "move-card",
        { method: "POST", body: data },
      );

      if (error) {
        throw new Error(error.message);
      }

      return { data: response };
    },
    moveColumn: async ({
      data,
    }: {
      data: { column_id: number; position: number };
    }) => {
      const { data: response, error } = await supabaseClient.functions.invoke(
        "move-column",
        { method: "POST", body: data },
      );

      if (error) {
        throw new Error(error.message);
      }

      return { data: response };
    },
    getDocumentUrl: async ({
      data,
    }: {
      data: { bucket: string; filePath: string };
    }) => {
      const oneHour = 60 * 60 * 24;
      const { data: signedUrl, error } = await supabaseClient.storage
        .from(data.bucket)
        .createSignedUrl(data.filePath, oneHour);

      if (error) {
        throw new Error(error.message);
      }

      return { data: signedUrl.signedUrl };
    },
  },
  [
    {
      resource: "boards",
      afterGetOne: async (response: GetOneResult<RaRecord>) => {
        const { data, meta } = response;
        if (!data) {
          return response;
        }
        const updatedAt = Date.now() + 10000;
        let columnsWithoutCards = [];
        const { columns, documents, ...board } = data;
        for (const column of columns) {
          const { cards, ...columnWithoutCards } = column;
          columnsWithoutCards.push(columnWithoutCards);

          queryClient.setQueryData(
            [
              "cards",
              "getManyReference",
              {
                target: "column_id",
                id: columnWithoutCards.id,
                pagination: { page: 1, perPage: 1000 },
                sort: { field: "position", order: "ASC" },
                filter: {},
                meta: undefined,
              },
            ],
            { data: cards, total: cards.length },
            { updatedAt },
          );
        }

        queryClient.setQueryData(
          [
            "columns",
            "getManyReference",
            {
              target: "board_id",
              id: data.id,
              pagination: { page: 1, perPage: 1000 },
              sort: { field: "position", order: "ASC" },
              filter: {},
              meta: undefined,
            },
          ],
          { data: columnsWithoutCards, total: columnsWithoutCards.length },
          { updatedAt },
        );
        queryClient.setQueryData(
          [
            "documents",
            "getManyReference",
            {
              target: "board_id",
              id: data.id,
              pagination: { page: 1, perPage: 1000 },
              sort: { field: "created_at", order: "ASC" },
              filter: {},
              meta: undefined,
            },
          ],
          { data: documents, total: documents.length },
          { updatedAt },
        );
        const favoriteDocuments = documents.filter((document: any) => document.favorite);
        queryClient.setQueryData(
          [
            "documents",
            "getManyReference",
            {
              target: "board_id",
              id: data.id,
              pagination: { page: 1, perPage: 1000 },
              sort: { field: "created_at", order: "ASC" },
              filter: { favorite: true },
              meta: undefined,
            },
          ],
          { data: favoriteDocuments, total: favoriteDocuments.length },
          { updatedAt },
        );
        return { data: board, meta };
      },
    },
    {
      resource: "documents",
      beforeCreate: async ({ data, meta }) => {
        if (data.content instanceof File) {
          const { data: file, error } = await supabaseClient.storage
            .from("documents")
            .upload(`${data.board_id}/${data.content.name}`, data.content, {
              upsert: true,
            });

          if (error) {
            throw new Error(error.message);
          }

          data.type = data.content.type;
          data.content = file.path;
        }
        return { data, meta };
      },
    },
  ],
);
