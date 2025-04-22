import { useQueryState } from "nuqs";
import debounce from "lodash/debounce";
import { useEvent } from "react-admin";

export const useCardFilter = () => {
  const [value, setValue] = useQueryState("filter", {
    throttleMs: 300,
  });

  const debouncedSetCardFilter = useEvent(
    debounce((query: string) => {
      setValue(query || null);
    }, 300),
  );

  return [value, debouncedSetCardFilter] as const;
};
