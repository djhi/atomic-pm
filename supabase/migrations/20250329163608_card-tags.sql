create table "public"."tags" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "board_id" bigint not null,
    "name" text not null
);


alter table "public"."tags" enable row level security;

alter table "public"."cards" add column "tags_ids" bigint[] not null default '{}'::bigint[];

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."tags" add constraint "tags_board_id_fkey" FOREIGN KEY (board_id) REFERENCES boards(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tags" validate constraint "tags_board_id_fkey";

grant delete on table "public"."tags" to "anon";

grant insert on table "public"."tags" to "anon";

grant references on table "public"."tags" to "anon";

grant select on table "public"."tags" to "anon";

grant trigger on table "public"."tags" to "anon";

grant truncate on table "public"."tags" to "anon";

grant update on table "public"."tags" to "anon";

grant delete on table "public"."tags" to "authenticated";

grant insert on table "public"."tags" to "authenticated";

grant references on table "public"."tags" to "authenticated";

grant select on table "public"."tags" to "authenticated";

grant trigger on table "public"."tags" to "authenticated";

grant truncate on table "public"."tags" to "authenticated";

grant update on table "public"."tags" to "authenticated";

grant delete on table "public"."tags" to "service_role";

grant insert on table "public"."tags" to "service_role";

grant references on table "public"."tags" to "service_role";

grant select on table "public"."tags" to "service_role";

grant trigger on table "public"."tags" to "service_role";

grant truncate on table "public"."tags" to "service_role";

grant update on table "public"."tags" to "service_role";

create policy "Allow board members"
on "public"."tags"
as permissive
for all
to public
using ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)))
with check ((board_id IN ( SELECT private.get_user_boards(( SELECT auth.uid() AS uid)) AS get_user_boards)));



