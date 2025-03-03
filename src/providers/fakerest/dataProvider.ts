import { addRevisionMethodsBasedOnSingleResource } from "@react-admin/ra-history";
import { addLocksMethodsBasedOnALockResource } from "@react-admin/ra-realtime";
import createFakeRestProvider from "ra-data-fakerest";
import { generateData } from "./dataGenerator/generateData";
import { withLifecycleCallbacks } from "react-admin";
import { getUserFromStorage } from "./utils";

const fakerestDataProvider = createFakeRestProvider(generateData(), true);

const baseDataProvider = addRevisionMethodsBasedOnSingleResource(
  addLocksMethodsBasedOnALockResource(fakerestDataProvider),
);

export const dataProvider = withLifecycleCallbacks(
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
    },
  ],
);
