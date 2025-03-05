import { Fragment, useState } from "react";
import {
  CreateBase,
  Form,
  required,
  SaveButton,
  TextInput,
  useGetIdentity,
  useRecordContext,
} from "react-admin";
import { useParams } from "react-router";

export const NewMessage = () => {
  const card = useRecordContext();
  const { identity } = useGetIdentity();
  const params = useParams<"boardId">();
  const [key, setKey] = useState(0);

  return (
    <CreateBase
      key={key}
      resource="comments"
      record={{
        card_id: card?.id,
        board_id: params.boardId,
        user_id: identity?.id,
      }}
      mutationOptions={{
        onSuccess: () => {
          setKey((prev) => prev + 1);
        },
      }}
    >
      <Form>
        <TextInput
          multiline
          rows={4}
          source="message"
          fullWidth
          helperText={false}
          validate={required()}
        />
        <SaveButton
          label="pm.sendMessage"
          type="submit"
          icon={<Fragment />}
          size="small"
          variant="outlined"
        />
      </Form>
    </CreateBase>
  );
};
