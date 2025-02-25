import { supabaseDataProvider } from "ra-supabase";
import {
  addLocksMethodsBasedOnALockResource,
  addRealTimeMethodsBasedOnSupabase,
} from "@react-admin/ra-realtime";
import { addRevisionMethodsBasedOnSingleResource } from "@react-admin/ra-history";
import type {
  DataProvider,
  GetOneParams,
  GetOneResult,
  RaRecord,
} from "react-admin";
import { queryClient } from "./queryClient";
import { supabaseClient } from "./supabaseClient";

export const baseDataProvider = addRevisionMethodsBasedOnSingleResource(
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

export const dataProvider: DataProvider = {
  ...baseDataProvider,
  getOne: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetOneParams,
  ) => {
    const response = await baseDataProvider.getOne(resource, params);
    const result = handlePrefetch(
      response,
      params?.meta?.columns ? params?.meta?.columns[0] : undefined,
    );

    // React-admin cannot apply prefetching to getManyReferences for boards so we do it ourselves
    if (result.meta?.prefetched?.columns) {
      populateQueryCache(result.meta.prefetched);
    }
    return result as GetOneResult<RecordType>;
  },
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
};

const References: Record<string, string> = {
  columns: "board_id",
  cards: "column_id",
};

const populateQueryCache = (data: Record<string, any>) => {
  Object.keys(References).forEach((resource) => {
    if (data[resource.toString()] == null) {
      return;
    }

    const reference = References[resource];
    if (
      reference == null ||
      data[resource.toString()] == null ||
      data[resource.toString()].length === 0
    ) {
      return;
    }

    // setQueryData doesn't accept a stale time option
    // So we set an updatedAt in the future to make sure the data isn't considered stale
    const updatedAt = Date.now() + 10000;
    const target = References[resource];
    const groupByParentId = data[resource.toString()].reduce(
      (acc: Record<string, any>, record: any) => {
        const parentId = record[target];
        if (!acc[parentId]) {
          acc[parentId] = [];
        }
        acc[parentId].push(record);
        return acc;
      },
      {},
    );

    Object.keys(groupByParentId).forEach((parentId) => {
      const id = groupByParentId[parentId][0][References[resource]];
      const records = groupByParentId[parentId].sort(
        (a: any, b: any) => a.position - b.position,
      );
      queryClient.setQueryData(
        [
          resource,
          "getManyReference",
          {
            target,
            // We know we only use numbers for boards ids
            id: typeof id === "number" ? id : parseInt(id),
            pagination: { page: 1, perPage: 10000 },
            sort: { field: "position", order: "ASC" },
            filter: {},
            meta: undefined,
          },
        ],
        { data: records, total: records.length },
        { updatedAt },
      );
      queryClient.setQueryData(
        [
          resource,
          "getManyReference",
          {
            target,
            // We know we only use numbers for boards ids
            id: typeof id === "number" ? id : parseInt(id),
            pagination: { page: 1, perPage: 1 },
            sort: { field: "position", order: "ASC" },
            filter: {},
            meta: undefined,
          },
        ],
        { data: records, total: records.length },
        { updatedAt },
      );
    });
  });
};

const ResourceRegex = /(\w+)\((.+)\)/;

// Where data looks like:
// { id: 1, columns: [{ id: 1, cards: [{ id: 1 }, { id: 2 }] }] }
// And columns is an array of fields including embedded resources like '*, columns(*, cards(*))' and the star means all fields
// We need to extract the prefetched data from the columns field (here columns and cards) in their own arrays and remove them from the initial data
// The function should return the data without the prefetched fields and the prefetched fields in an object
// Example:
// - data: { id: 1, name: 'test', columns: [{ id: 1, name: 'test', cards: [{ id: 1, name: 'test' }, { id: 2, name: 'test'}] }] }
// - columns: '*, columns(*, cards(*))'
// Expected result:
// - data: { id: 1, name: 'test' }
// - prefetched: { columns: [{ id: 1, name: 'test' }], cards: [{ id: 1, name: 'test' }, { id: 2, name: 'test'}] }
const handlePrefetch = (
  response: {
    data: Record<string, any>;
    meta?: { prefetched?: Record<string, Record<string, any>[]> };
  },
  columns: string | undefined,
) => {
  if (!columns) {
    return response;
  }

  const matches = columns.match(ResourceRegex);
  if (!matches) {
    return response;
  }

  const [, embbededResourceName, embeddedColumns] = matches;
  const { [embbededResourceName]: embbededResourceData, ...mainResourceData } =
    response.data;
  let result = {
    data: mainResourceData,
    meta: { prefetched: { [embbededResourceName]: [] as any[] } },
  };

  if (Array.isArray(embbededResourceData)) {
    for (const embeddedResourceRecord of embbededResourceData) {
      const embbededResourcePrefetch = handlePrefetch(
        { data: embeddedResourceRecord },
        embeddedColumns,
      );

      result.meta.prefetched[embbededResourceName].push(
        embbededResourcePrefetch.data,
      );

      if (embbededResourcePrefetch.meta?.prefetched) {
        for (const prefetchedResource of Object.keys(
          embbededResourcePrefetch.meta.prefetched,
        )) {
          if (!result.meta.prefetched[prefetchedResource]) {
            result.meta.prefetched[prefetchedResource] = [];
          }

          result.meta.prefetched[prefetchedResource].push(
            ...embbededResourcePrefetch.meta.prefetched[prefetchedResource],
          );
        }
      }
    }
  } else {
    // TODO
  }

  return result;
};
