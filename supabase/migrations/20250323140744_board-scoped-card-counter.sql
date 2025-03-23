alter table "public"."cards" add column "number" bigint;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_card_created_event()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE cardNumber INTEGER;
begin
    cardNumber := (select count(*) as number from public.cards where column_id IN (select id from public.columns where board_id = (select board_id from public.columns where id = new.column_id)));
    new.number = cardNumber + 1;
  return new;
end;
$function$
;

CREATE TRIGGER on_card_comment_created BEFORE INSERT ON public.cards FOR EACH ROW EXECUTE FUNCTION handle_card_created_event();


