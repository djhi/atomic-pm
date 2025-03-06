alter table "public"."cards" add column "assigned_user_id" uuid;

alter table "public"."cards" alter column "estimate" drop not null;

alter table "public"."cards" add constraint "cards_assigned_user_id_fkey" FOREIGN KEY (assigned_user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."cards" validate constraint "cards_assigned_user_id_fkey";


