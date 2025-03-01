set check_function_bodies = off;

CREATE OR REPLACE FUNCTION private.get_user_boards_as_text(user_id_to_check uuid)
 RETURNS SETOF text
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
    select board_members.board_id::text from board_members
    where (user_id = user_id_to_check)
$function$
;

create policy "Allow board members to add files in their boards"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'documents'::text) AND ((storage.foldername(name))[1] IN ( SELECT private.get_user_boards_as_text(( SELECT auth.uid() AS uid)) AS get_user_boards))));


create policy "Allow board members to download files in their boards"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'documents'::text) AND ((storage.foldername(name))[1] IN ( SELECT private.get_user_boards_as_text(( SELECT auth.uid() AS uid)) AS get_user_boards))));


create policy "Allow members to update files in their boards flreew_0"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'documents'::text) AND ((storage.foldername(name))[1] IN ( SELECT private.get_user_boards_as_text(( SELECT auth.uid() AS uid)) AS get_user_boards))));

