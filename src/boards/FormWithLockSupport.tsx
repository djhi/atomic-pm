import { SimpleForm, SimpleFormProps, useGetIdentity } from "react-admin";
import { BoardItemFormToolbar } from "./BoardItemFormToolbar";
import { useGetLockLive } from "@react-admin/ra-realtime";

export const FormWithLockSupport = (props: SimpleFormProps) => {
  const { data: lock } = useGetLockLive();
  const { identity } = useGetIdentity();

  const disabled = !!lock && lock?.identity !== identity?.id;
  
  return (
    <SimpleForm
      disabled={disabled}
      toolbar={<BoardItemFormToolbar />}
      {...props}
    />
  );
};
