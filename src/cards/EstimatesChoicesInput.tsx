import { ChoicesContextProvider, ChoicesContextValue, InputProps, useInput, useList } from "ra-core";
import { useMemo } from "react";

export const EstimatesChoicesInput = ({
  children,
  ...props
}: InputProps & { children: React.ReactNode }) => {
  const { field } = useInput(props);
  const list = useList({
    data: Estimates,
  });
  const choices = useMemo(
    () =>
      ({
        ...list,
        allChoices: list.data ?? [],
        availableChoices: list.data ?? [],
        selectedChoices:
          list.data?.filter((choice) => choice.id === field.value) ?? [],
        source: props.source,
        isFromReference: false,
        total: list.total ?? 0,
      }) as ChoicesContextValue,
    [list],
  );
  return (
    <ChoicesContextProvider value={choices}>{children}</ChoicesContextProvider>
  );
};

const Estimates = [
  { id: 0, name: "0" },
  { id: 0.5, name: "0.5" },
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 5, name: "5" },
  { id: 8, name: "8" },
  { id: 13, name: "13" },
];
