alter table "public"."cards" add column "assigned_user_ids" bigint[];

update "public"."cards" set "assigned_user_ids" = array[assigned_user_id] where assigned_user_id is not null;

alter table "public"."cards" drop column "assigned_user_id";