import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(null, {
      status: 404,
      headers: corsHeaders,
    });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(null, {
      status: 401,
      headers: corsHeaders,
    });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    // This ensure the client is authenticated as the calling user
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: userData } = await supabaseClient.auth.getUser();

  if (!userData.user) {
    return new Response(null, {
      status: 401,
      headers: corsHeaders,
    });
  }

  // Get the request parameters
  const { card_id, column_id, position } = await req.json();

  const { data: previous } = await supabaseClient
    .from("cards")
    .select("*")
    .eq("id", card_id)
    .maybeSingle();

  const { data: previousSiblings } = await supabaseClient
    .from("cards")
    .select("*")
    .eq("column_id", previous.column_id)
    .gt("position", previous.position)
    .order("position", { ascending: true });

  // Decrement their position
  await Promise.all(
    previousSiblings.map(async (sibling: any) => {
      await supabaseClient
        .from("cards")
        .update({
          position: sibling.position - 1,
        })
        .eq("id", sibling.id);
    }),
  );

  // Get all cards that are after the moved card in its new column
  const { data: newSiblings } = await supabaseClient
    .from("cards")
    .select("*")
    .eq("column_id", column_id)
    .gte("position", position)
    .order("position", { ascending: true });

  // Increment their position
  await Promise.all(
    newSiblings.map(async (sibling: any) => {
      await supabaseClient
        .from("cards")
        .update({
          position: sibling.position + 1,
        })
        .eq("id", sibling.id);
    }),
  );

  // Finally, update the moved card
  const { data } = await supabaseClient
    .from("cards")
    .update({
      column_id,
      position,
    })
    .eq("id", card_id)
    .select("*")
    .single();

  if (!data) {
    return new Response(null, {
      status: 404,
      headers: corsHeaders,
    });
  }

  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
    status: 200,
  });
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, PATCH, DELETE",
};
