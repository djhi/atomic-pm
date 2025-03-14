alter table "public"."cards" drop constraint "cards_assigned_user_id_fkey";

alter table "public"."cards" drop column "assigned_user_id";
alter table "public"."cards" add column "assigned_user_id" bigint;

alter table "public"."cards" add constraint "cards_assigned_user_id_fkey" FOREIGN KEY (assigned_user_id) REFERENCES board_members(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."cards" validate constraint "cards_assigned_user_id_fkey";

create or replace view "public"."board_members_with_profiles" as  SELECT board_members.id,
    board_members.user_id,
    board_members.board_id,
    profiles.avatar,
    profiles.email,
    profiles.first_name,
    profiles.last_name
   FROM (board_members
     LEFT JOIN profiles ON ((board_members.user_id = profiles.id)));



