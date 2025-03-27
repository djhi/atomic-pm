import {
  ChoicesProps,
  InputProps,
  useChoicesContext,
  useInput,
  useSuggestions,
  useTranslate,
} from "ra-core";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
} from "@mui/material";
import { usePopoverInput } from "./PopoverInput";

export const ListSelectorInput = ({
  multiple,
  ...props
}: Partial<InputProps> & ChoicesProps & { multiple?: boolean }) => {
  const choicesContext = useChoicesContext(props);
  const { field } = useInput(choicesContext);
  const { getChoiceText, getChoiceValue } = useSuggestions(props);
  const popoverContext = usePopoverInput();
  const translate = useTranslate();
  const { allChoices, selectedChoices, setFilters, total } = choicesContext;
  return (
    <Stack direction="column" gap={1}>
      <List sx={{ flexGrow: 1 }}>
        <ListItem>
          {allChoices != null && allChoices.length < (total ?? 0) ? (
            <TextField
              placeholder={translate("ra.action.search")}
              onChange={(event) => setFilters({ q: event.target.value })}
            />
          ) : null}
        </ListItem>
        {allChoices?.map((record) => (
          <ListItemButton
            selected={selectedChoices?.find(
              (choice) => choice.id === getChoiceValue(record),
            )}
            key={record.id}
            onClick={() => {
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
            }}
          >
            {getChoiceText(record)}
          </ListItemButton>
        ))}
      </List>
      <Button
        form="card-edit-form"
        variant="outlined"
        type="submit"
        sx={{ border: "none" }}
        onClick={popoverContext.close}
      >
        {translate("ra.action.save")}
      </Button>
    </Stack>
  );
};
