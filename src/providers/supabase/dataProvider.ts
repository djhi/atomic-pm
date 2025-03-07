import { supabaseDataProvider } from "ra-supabase";
import {
  addLocksMethodsBasedOnALockResource,
  addRealTimeMethodsBasedOnSupabase,
} from "@react-admin/ra-realtime";
import { addRevisionMethodsBasedOnSingleResource } from "@react-admin/ra-history";
import { withLifecycleCallbacks, type DataProvider } from "react-admin";
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
      afterGetOne: async (response) => {
        return {
          ...response,
          data: {
            ...response.data,
            columns: response.data.columns
              ? response.data.columns
                  .map((column: any) => ({
                    ...column,
                    cards: column.cards?.sort(
                      (a: any, b: any) => a.position - b.position,
                    ),
                  }))
                  .sort((a: any, b: any) => a.position - b.position)
              : undefined,
          },
        };
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
    {
      resource: "profiles",
      beforeUpdate: async ({ data, id, meta, previousData }) => {
        if (data.avatar?.rawFile instanceof File) {
          data.avatar = await convertFileToBase64(data.avatar?.rawFile);
        }
        return { data, id, meta, previousData };
      },
      afterRead: async (data) => {
        return Array.isArray(data)
          ? data.map((record) => ({
              ...record,
              avatar: record.avatar ? { src: record.avatar } : record.avatar,
            }))
          : {
              ...data,
              avatar: data.avatar ? { src: data.avatar } : data.avatar,
            };
      },
    },
  ],
);

const convertFileToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};
