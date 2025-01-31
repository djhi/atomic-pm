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

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
  const { data: userData } = await supabaseClient.auth.getUser();

  if (!userData.user) {
    return new Response(null, {
      status: 401,
      headers: corsHeaders,
    });
  }

  // Get the request parameters
  const { email, board_id } = await req.json();

  const { data: boardData } = await supabaseClient
    .from("boards")
    .select("name")
    .eq("id", board_id)
    .maybeSingle();

  if (!boardData) {
    return new Response(null, {
      status: 404,
      headers: corsHeaders,
    });
  }

  // Create or retrieve the invitation
  const { data: invitation, error } = await supabaseClient
    .from("invitations")
    .upsert(
      {
        board_id,
        board_name: boardData.name,
        invited_by: userData.user.email,
        email,
      },
      { onConflict: "email, board_id" },
    )
    .select("*")
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
      status: 500,
    });
  }

  await supabaseAdmin.auth.admin.inviteUserByEmail(email);

  return new Response(JSON.stringify({ data: invitation }), {
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
