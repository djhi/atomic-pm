import * as React from "react";
import {
  ChoicesProps,
  InputProps,
  RaRecord,
  useChoicesContext,
  useEvent,
  useInput,
  useSuggestions,
  useTranslate,
  UseUpdateOptions,
} from "ra-core";
import {
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  TextField,
} from "@mui/material";
import { SaveButton } from "react-admin";
import { usePopoverInput } from "./PopoverInput";

export const ListSelectorInput = ({
  multiple,
  mutationOptions,
  ...props
}: ListSelectorInputProps) => {
  const choicesContext = useChoicesContext(props);
  const { field } = useInput(choicesContext);
  const { getChoiceText, getChoiceValue } = useSuggestions(props);
  const popoverContext = usePopoverInput();
  const translate = useTranslate();
  const { allChoices, selectedChoices, setFilters, total } = choicesContext;

  const toggleChoice = useEvent((record: RaRecord) => {
    if (multiple) {
      if (field.value.includes(getChoiceValue(record))) {
        field.onChange(
          field.value.filter(
            (value: string) => value !== getChoiceValue(record),
          ),
        );
      } else {
        field.onChange([...field.value, getChoiceValue(record)]);
      }
    } else {
      field.onChange(getChoiceValue(record));
    }
  });
  const context = React.useMemo(() => ({ toggleChoice }), [toggleChoice]);
  return (
    <Stack direction="column" gap={1}>
      {allChoices != null && allChoices.length < (total ?? 0) ? (
        <TextField
          placeholder={translate("ra.action.search")}
          onChange={(event) => setFilters({ q: event.target.value })}
        />
      ) : null}
      <MenuList sx={{ flexGrow: 1 }}>
        {allChoices?.map((record) => (
          <MenuItem
            selected={selectedChoices?.find(
              (choice) => choice.id === getChoiceValue(record),
            )}
            key={record.id}
            onClick={() => {
              toggleChoice(record);
            }}
          >
            <ListItemText>{getChoiceText(record)}</ListItemText>
          </MenuItem>
        ))}
        <ListSelectorContext.Provider value={context}>
          {props.children}
        </ListSelectorContext.Provider>
      </MenuList>
      <SaveButton
        icon={<div />}
        variant="outlined"
        color="inherit"
        size="medium"
        type="button"
        mutationOptions={{
          onSuccess: (data, variables, context) => {
            mutationOptions?.onSuccess?.(data, variables, context);
            popoverContext.close();
          },
        }}
        sx={{
          fontSize: (theme) => theme.typography.body1.fontSize,
          textAlign: "left",
          justifyContent: "start",
          borderRadius: 0,
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
          width: "100%",
        }}
      >
        {translate("ra.action.save")}
      </SaveButton>
    </Stack>
  );
};
export interface ListSelectorInputProps
  extends Partial<InputProps>,
    ChoicesProps {
  multiple?: boolean;
  children?: React.ReactNode;
  mutationOptions?: UseUpdateOptions;
}

type ListSelectorContextValue = {
  toggleChoice: (record: RaRecord) => void;
};

const ListSelectorContext =
  React.createContext<ListSelectorContextValue | null>(null);

export const useListSelectorContext = () => {
  const context = React.useContext(ListSelectorContext);
  if (!context) {
    throw new Error(
      "useListSelectorContext must be used within a ListSelectorInput",
    );
  }
  return context;
};
