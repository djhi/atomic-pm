alter table "public"."profiles" add column "avatar" text;

create policy "Enable update profile owner"
on "public"."profiles"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



