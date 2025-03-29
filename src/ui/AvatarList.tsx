import { AvatarGroup, AvatarGroupProps } from "@mui/material";
import { RecordContextProvider, useListContext } from "react-admin";
import { AvatarField } from "./AvatarField";

export const AvatarList = (props: AvatarGroupProps) => {
  const { data, total } = useListContext();

  if (!data) return null;
  if (data.length === 0) return null;

  return (
    <AvatarGroup total={total} {...props}>
      {data.map((record: any) => (
        <RecordContextProvider key={record.id} value={record}>
          <AvatarField />
        </RecordContextProvider>
      ))}
    </AvatarGroup>
  );
};
