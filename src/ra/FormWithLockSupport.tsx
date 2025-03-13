import { SimpleForm, SimpleFormProps, useGetIdentity } from "react-admin";
import { useGetLockLive } from "@react-admin/ra-realtime";
import { FormWithLockSupportToolbar } from "./FormWithLockSupportToolbar";

export const FormWithLockSupport = (props: SimpleFormProps) => {
  const { data: lock } = useGetLockLive();
  const { identity } = useGetIdentity();

  const disabled = !!lock && lock?.identity !== identity?.id;
  
  return (
    <SimpleForm
      disabled={disabled}
      toolbar={<FormWithLockSupportToolbar />}
      {...props}
    />
  );
};
