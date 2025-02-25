import { Chip, Stack } from "@mui/material";
import {
  RecordRepresentation,
  ReferenceManyField,
  SingleFieldList,
  useRecordContext,
  WithRecord,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { Link } from "react-router";
import { DocumentIconField } from "./DocumentIconField";

export const FavoriteDocuments = () => {
  const board = useRecordContext();
  return (
    <ReferenceManyField
      target="board_id"
      reference="documents"
      perPage={1000}
      filter={{ favorite: true }}
    >
      <SingleFieldList linkType={false}>
        <WithRecord
          render={(document) => (
            <Link to={`/boards/${board?.id}/documents/${document.id}`}>
              <Chip
                color="info"
                size="small"
                sx={{ cursor: "inherit" }}
                label={
                  <Stack direction="row" alignItems="center" gap={1}>
                    <DocumentIconField source="type" />
                    <RecordRepresentation />
                  </Stack>
                }
                clickable
              />
            </Link>
          )}
        />
      </SingleFieldList>
      <ListLiveUpdate />
    </ReferenceManyField>
  );
};
