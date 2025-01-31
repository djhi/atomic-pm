import { supabaseDataProvider } from "ra-supabase";
import { supabaseClient } from "./supabaseClient";

export const dataProvider = supabaseDataProvider({
  instanceUrl: import.meta.env.VITE_SUPABASE_URL,
  apiKey: import.meta.env.VITE_SUPAPASE_ANON_KEY,
  supabaseClient,
});
