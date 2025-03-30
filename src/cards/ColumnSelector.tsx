import { Stack } from "@mui/material";
import {
    AutocompleteInput,
  FormDataConsumer,
  Identifier,
  RaRecord,
  ReferenceInput,
  required,
  SelectInput,
} from "react-admin";
import { useBoardContext } from "../BoardContext";

export const ColumnSelector = () => {
  const [board] = useBoardContext();
  return (
    <Stack direction="row" gap={2} padding={2}>
      <ReferenceInput
        reference="columns"
        source="column_id"
        filter={{ board_id: board?.id }}
        sort={{ field: "position", order: "ASC" }}
      >
        <AutocompleteInput helperText={false} />
      </ReferenceInput>
      <FormDataConsumer>
        {({ formData }) => {
          return <PositionInput column_id={formData.column_id} />;
        }}
      </FormDataConsumer>
    </Stack>
  );
};

const PositionInput = ({ column_id }: { column_id: Identifier }) => {
  const [board] = useBoardContext();
  const column = board?.columns.find(
    (column: RaRecord) => column.id === column_id,
  );
  const choices = Array.from<unknown, { id: Identifier; name: string }>(
    { length: column ? column.cards.length + 1 : 0 },
    (_, i) => ({
      id: i,
      name: `${i + 1}`,
    }),
  );
  return (
    <SelectInput
      source="position"
      choices={choices}
      disabled={column == null}
      validate={required()}
      helperText={false}
    />
  );
};
