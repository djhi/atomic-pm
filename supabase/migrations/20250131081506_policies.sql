create schema if not exists "private";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION private.get_user_boards(user_id_to_check uuid)
 RETURNS SETOF bigint
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
    select board_members.board_id from board_members
    where (user_id = user_id_to_check)
$function$
;

CREATE OR REPLACE FUNCTION private.is_board_owner(user_id_to_check uuid, board_id_to_check bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  return exists (
    select 1 from boards where user_id = user_id_to_check and id = board_id_to_check
  );
end;
$function$
;


create table "public"."board_members" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid not null,
    "board_id" bigint not null
);


alter table "public"."board_members" enable row level security;

alter table "public"."boards" enable row level security;

alter table "public"."cards" enable row level security;

alter table "public"."columns" enable row level security;

CREATE UNIQUE INDEX board_members_pkey ON public.board_members USING btree (id);

alter table "public"."board_members" add constraint "board_members_pkey" PRIMARY KEY using index "board_members_pkey";

alter table "public"."board_members" add constraint "board_members_board_id_fkey" FOREIGN KEY (board_id) REFERENCES boards(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."board_members" validate constraint "board_members_board_id_fkey";

alter table "public"."board_members" add constraint "board_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."board_members" validate constraint "board_members_user_id_fkey";

grant delete on table "public"."board_members" to "anon";

grant insert on table "public"."board_members" to "anon";

grant references on table "public"."board_members" to "anon";

grant select on table "public"."board_members" to "anon";

grant trigger on table "public"."board_members" to "anon";

grant truncate on table "public"."board_members" to "anon";

grant update on table "public"."board_members" to "anon";

grant delete on table "public"."board_members" to "authenticated";

grant insert on table "public"."board_members" to "authenticated";

grant references on table "public"."board_members" to "authenticated";

grant select on table "public"."board_members" to "authenticated";

grant trigger on table "public"."board_members" to "authenticated";

grant truncate on table "public"."board_members" to "authenticated";

grant update on table "public"."board_members" to "authenticated";

grant delete on table "public"."board_members" to "service_role";

grant insert on table "public"."board_members" to "service_role";

grant references on table "public"."board_members" to "service_role";

grant select on table "public"."board_members" to "service_role";

grant trigger on table "public"."board_members" to "service_role";

grant truncate on table "public"."board_members" to "service_role";

grant update on table "public"."board_members" to "service_role";

create policy "Enable delete for board owners"
on "public"."board_members"
as permissive
for delete
to public
using (private.is_board_owner(( SELECT auth.uid() AS uid), board_id));


create policy "Enable insert for board owners"
on "public"."board_members"
as permissive
for insert
to public
with check (private.is_board_owner(( SELECT auth.uid() AS uid), board_id));


create policy "Enable select for board members"
on "public"."board_members"
as permissive
for select
to authenticated
using ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)));


create policy "Enable update for board owners"
on "public"."board_members"
as permissive
for update
to public
using (private.is_board_owner(( SELECT auth.uid() AS uid), board_id))
with check (private.is_board_owner(( SELECT auth.uid() AS uid), board_id));


create policy "Enable delete user boards"
on "public"."boards"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert user boards"
on "public"."boards"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable select user boards"
on "public"."boards"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable update user boards"
on "public"."boards"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable delete for board members"
on "public"."cards"
as permissive
for delete
to public
using ((column_id IN ( SELECT columns.id
   FROM columns
  WHERE (columns.board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)))));


create policy "Enable insert for board members"
on "public"."cards"
as permissive
for insert
to public
with check ((column_id IN ( SELECT columns.id
   FROM columns
  WHERE (columns.board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)))));


create policy "Enable select for board members"
on "public"."cards"
as permissive
for select
to public
using ((column_id IN ( SELECT columns.id
   FROM columns
  WHERE (columns.board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)))));


create policy "Enable update for board members"
on "public"."cards"
as permissive
for update
to public
using ((column_id IN ( SELECT columns.id
   FROM columns
  WHERE (columns.board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)))))
with check ((column_id IN ( SELECT columns.id
   FROM columns
  WHERE (columns.board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)))));


create policy "Enable delete for board members"
on "public"."columns"
as permissive
for delete
to public
using ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)));


create policy "Enable insert for board members"
on "public"."columns"
as permissive
for insert
to public
with check ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)));


create policy "Enable select for board members"
on "public"."columns"
as permissive
for select
to public
using ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)));


create policy "Enable update for board members"
on "public"."columns"
as permissive
for update
to public
using ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)))
with check ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)));



