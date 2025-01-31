import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "PATCH") {
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
  const { invitation_id, accepted } = await req.json();

  // Create or retrieve the invitation
  const { data: invitation } = await supabaseClient
    .from("invitations")
    .select("*")
    .eq("id", invitation_id)
    .maybeSingle();

  if (!invitation) {
    return new Response(null, {
      status: 404,
      headers: corsHeaders,
    });
  }

  if (accepted) {
    await supabaseAdmin
      .from("board_members")
      .insert({ board_id: invitation.board_id, user_id: userData.user.id });
  }

  await supabaseAdmin.from("invitations").delete().eq("id", invitation_id);

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
