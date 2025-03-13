import { RecordContextProvider, ReferenceField, WithRecord } from "react-admin";
import { CardDiff } from "./CardDiff";

export const CardRevisionDetails = () => {
  return (
    <ReferenceField source="revision_id" reference="revisions">
      <WithRecord
        render={(record) => (
          <RecordContextProvider value={record.data}>
            <CardDiff revision={record} />
          </RecordContextProvider>
        )}
      />
    </ReferenceField>
  );
};