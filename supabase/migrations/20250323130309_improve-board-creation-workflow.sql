set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_board()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  -- Add the current user as a board member
  insert into public.board_members (board_id, user_id)
  values (new.id, (SELECT auth.uid() AS uid));
  -- Create a new default column
  insert into public.columns (board_id, name, position)
  values (new.id, '', 0);
  return new;
end;
$function$
;


