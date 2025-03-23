import { addRevisionMethodsBasedOnSingleResource } from "@react-admin/ra-history";
import { addLocksMethodsBasedOnALockResource } from "@react-admin/ra-realtime";
import createSimpleRestProvider from "ra-data-simple-rest";
import { withLifecycleCallbacks } from "react-admin";
import { getUserFromStorage } from "./utils";
import { queryClient } from "../queryClient";

const simpleRestDataProvider = createSimpleRestProvider(
  import.meta.env.VITE_SIMPLE_REST_URL,
);

const baseDataProvider = addLocksMethodsBasedOnALockResource(
  simpleRestDataProvider,
);

export const dataProvider = addRevisionMethodsBasedOnSingleResource(
  withLifecycleCallbacks(
    {
      ...baseDataProvider,
      subscribe: () => Promise.resolve(),
      unsubscribe: () => Promise.resolve(),
      moveColumn: async ({
        data,
        previousData,
      }: {
        data: { column_id: number; position: number };
        previousData: any;
      }) => {
        // @ts-expect-error _database is set by ra-data-fakerest
        const previousSiblings = window._database.collections.columns.getAll({
          filter: {
            position: {
              board_id: previousData.board_id,
              position_gt: previousData.position,
            },
          },
          sort: ["position", "asc"],
          range: [0, 1000],
        });
        for (const sibling of previousSiblings) {
          // @ts-expect-error _database is set by ra-data-fakerest
          window._database.collections.columns.updateOne(sibling.id, {
            ...sibling,
            position: sibling.position - 1,
          });
        }
        // @ts-expect-error _database is set by ra-data-fakerest
        const newSiblings = window._database.collections.columns.getAll({
          filter: {
            position: {
              board_id: previousData.board_id,
              position_gte: data.position,
            },
          },
          sort: ["position", "asc"],
          range: [0, 1000],
        });
        for (const sibling of previousSiblings) {
          // @ts-expect-error _database is set by ra-data-fakerest
          window._database.collections.columns.updateOne(sibling.id, {
            ...sibling,
            position: sibling.position + 1,
          });
        }
        // @ts-expect-error _database is set by ra-data-fakerest
        window._database.collections.columns.updateOne(data.column_id, {
          position: data.position,
        });
      },
      moveCard: async ({
        data,
        previousData,
      }: {
        data: any;
        previousData: any;
      }) => {
        // @ts-expect-error _database is set by ra-data-fakerest
        const previousSiblings = window._database.collections.cards.getAll({
          filter: {
            position: {
              column_id: previousData.column_id,
              position_gt: previousData.position,
            },
          },
          sort: ["position", "asc"],
          range: [0, 1000],
        });
        for (const sibling of previousSiblings) {
          // @ts-expect-error _database is set by ra-data-fakerest
          window._database.collections.cards.updateOne(sibling.id, {
            ...sibling,
            position: sibling.position - 1,
          });
        }

        // @ts-expect-error _database is set by ra-data-fakerest
        const newSiblings = window._database.collections.columns.getAll({
          filter: {
            position: {
              column_id: previousData.column_id,
              position_gte: data.position,
            },
          },
          sort: ["position", "asc"],
          range: [0, 1000],
        });
        for (const sibling of previousSiblings) {
          // @ts-expect-error _database is set by ra-data-fakerest
          window._database.collections.columns.updateOne(sibling.id, {
            ...sibling,
            position: sibling.position + 1,
          });
        }

        // @ts-expect-error _database is set by ra-data-fakerest
        window._database.collections.cards.updateOne(data.card_id, {
          column_id: data.column_id,
          position: data.position,
        });

        // @ts-expect-error _database is set by ra-data-fakerest
        const sourceColumn = window._database.collections.columns.getOne(
          previousData.column_id,
        );
        const user = getUserFromStorage();
        if (previousData.column_id !== data.column_id) {
          // @ts-expect-error _database is set by ra-data-fakerest
          const destinationColumn = window._database.collections.columns.getOne(
            data.column_id,
          );
          // @ts-expect-error _database is set by ra-data-fakerest
          window._database.collections.card_events.addOne({
            card_id: data.card_id,
            user_id: user.id,
            date: new Date().toISOString(),
            type: "revision",
            message: `Moved card from column "${sourceColumn.name}" to "${destinationColumn.name}" at position ${data.position}`,
          });
        } else {
          // @ts-expect-error _database is set by ra-data-fakerest
          window._database.collections.card_events.addOne({
            card_id: data.card_id,
            user_id: user.id,
            date: new Date().toISOString(),
            type: "revision",
            message: `Moved card to position ${data.position} `,
          });
        }
      },
      getDocumentUrl: async ({
        data,
      }: {
        data: { bucket: string; filePath: string };
      }) => {
        const base64Document = localStorage.getItem(data.filePath);
        if (!base64Document) return null;
        const [, base64DocumentWithoutPrefix] = base64Document.split(",");
        const document = Uint8Array.from(
          atob(base64DocumentWithoutPrefix),
          (c) => c.charCodeAt(0),
        );
        const blob = new Blob([document]);
        const signedUrl = URL.createObjectURL(blob);

        return { data: signedUrl };
      },
    },
    [
      {
        resource: "boards",
        afterGetOne: async (response) => {
          const board = response.data;
          // @ts-expect-error _database is set by ra-data-fakerest
          const columns = window._database.collections.columns.getAll({
            filter: { board_id: board.id },
            sort: ["position", "asc"],
            range: [0, 1000],
            embed: ["cards"],
          });

          return {
            ...response,
            data: {
              ...board,
              columns,
            },
          };
        },
        beforeGetList: (params) => {
          const user = getUserFromStorage();

          return Promise.resolve({
            ...params,
            filter: {
              ...params.filter,
              user_id: user.id,
            },
          });
        },
        afterCreate: async (response) => {
          const board = response.data;
          // Add a default column
          // @ts-expect-error _database is set by ra-data-fakerest
          const columns = window._database.collections.columns.addOne({
            name: "",
            board_id: board.id,
            position: 0,
          });

          return response;
        },
      },
      {
        resource: "documents",
        beforeCreate: async ({ data, meta }) => {
          if (data.content instanceof File) {
            const base64Document = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.readAsDataURL(data.content);
            });
            localStorage.setItem(data.content.name, base64Document);

            data.type = data.content.type;
            data.content = data.content.name;
          }
          return { data, meta };
        },
      },
      {
        resource: "comments",
        afterCreate: async ({ data, meta }) => {
          const user = getUserFromStorage();
          // @ts-expect-error _database is set by ra-data-fakerest
          window._database.collections.card_events.addOne({
            card_id: data.card_id,
            user_id: user.id,
            date: new Date().toISOString(),
            type: "comment",
            message: data.message,
          });
          // Simulate a real-time update
          queryClient.invalidateQueries({
            queryKey: ["card_events", "getManyReference"],
          });
          return { data, meta };
        },
      },
      {
        resource: "revisions",
        beforeGetList: async (params) => {
          if (params?.filter["date@lt"]) {
            const { "date@lt": date, ...filter } = params.filter;
            return {
              ...params,
              filter: {
                ...filter,
                ["date_lt"]: date,
              },
            };
          }
          return params;
        },
        afterCreate: async ({ data, meta }) => {
          const user = getUserFromStorage();
          if (data.resource === "cards") {
            // @ts-expect-error _database is set by ra-data-fakerest
            window._database.collections.card_events.addOne({
              card_id: data.recordId,
              revision_id: data.id,
              user_id: user.id,
              date: new Date().toISOString(),
              type: "revision",
              message: data.message,
            });
            // Simulate a real-time update
            queryClient.invalidateQueries({
              queryKey: ["card_events", "getManyReference"],
            });
          }
          return { data, meta };
        },
      },
    ],
  ),
);
