import { Chip, Stack } from "@mui/material";
import {
  RecordRepresentation,
  ReferenceManyField,
  SingleFieldList,
} from "react-admin";
import { ListLiveUpdate } from "@react-admin/ra-realtime";
import { DocumentLink } from "./DocumentLink";

export const FavoriteDocuments = () => {
  return (
    <ReferenceManyField
      target="board_id"
      reference="documents"
      perPage={1000}
      filter={{ favorite: true }}
    >
      <SingleFieldList linkType={false}>
        <DocumentLink>
          <Chip
            color="info"
            sx={{ cursor: "inherit" }}
            label={
              <Stack direction="row" alignItems="center" gap={1}>
                <RecordRepresentation />
              </Stack>
            }
            clickable
          />
        </DocumentLink>
      </SingleFieldList>
      <ListLiveUpdate />
    </ReferenceManyField>
  );
};
