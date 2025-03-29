import { AvatarGroup, AvatarGroupProps } from "@mui/material";
import { RecordContextProvider, useListContext } from "react-admin";
import { AvatarField } from "./AvatarField";
import { ReactNode } from "react";

export const AvatarList = (props: AvatarGroupProps & { empty?: ReactNode }) => {
  const { empty = null, ...rest } = props;
  const { data, total } = useListContext();

  if (!data) return empty;
  if (data.length === 0) return empty;

  return (
    <AvatarGroup total={total} {...rest}>
      {data.map((record: any) => (
        <RecordContextProvider key={record.id} value={record}>
          <AvatarField />
        </RecordContextProvider>
      ))}
    </AvatarGroup>
  );
};
