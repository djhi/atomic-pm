import { supabaseDataProvider } from "ra-supabase";
import {
  addLocksMethodsBasedOnALockResource,
  addRealTimeMethodsBasedOnSupabase,
} from "@react-admin/ra-realtime";
import { supabaseClient } from "./supabaseClient";

export const baseDataProvider = addLocksMethodsBasedOnALockResource(
  addRealTimeMethodsBasedOnSupabase({
    dataProvider: supabaseDataProvider({
      instanceUrl: import.meta.env.VITE_SUPABASE_URL,
      apiKey: import.meta.env.VITE_SUPAPASE_ANON_KEY,
      supabaseClient,
    }),
    supabaseClient,
  }),
);

export const dataProvider = {
  ...baseDataProvider,
  invite: async ({ data }: { data: { email: string; board_id: number } }) => {
    const { data: invitation, error } = await supabaseClient.functions.invoke(
      "invite",
      {
        method: "POST",
        body: data,
      },
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
      {
        method: "PATCH",
        body: data,
      },
    );

    if (error) {
      throw new Error(error.message);
    }

    return { data: {} };
  },
};
