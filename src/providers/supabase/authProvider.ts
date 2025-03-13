import { supabaseAuthProvider } from "ra-supabase";
import { supabaseClient } from "./supabaseClient";

export const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id, first_name, last_name, email, avatar")
      .match({ id: user.id })
      .single();

    if (!data || error) {
      throw new Error();
    }

    return {
      id: data.id,
      fullName: data.email,
      avatar: data.avatar,
    };
  },
});
