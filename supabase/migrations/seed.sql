-- enable realtime in seed to ensure it's ran last
set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.executeschematables(_schema text, _query text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
row record;
BEGIN
FOR row IN SELECT tablename FROM pg_tables AS t
WHERE t.schemaname = _schema
LOOP
-- run query
EXECUTE format(_query, row.tablename);
END LOOP;
RETURN 'success';
END;
$function$
;

SELECT executeSchemaTables('public', 'ALTER PUBLICATION supabase_realtime ADD TABLE %I;');

-- Create the documents bucket
INSERT INTO storage.buckets
  (id, name, public)
VALUES
  ('documents', 'documents', false);
