import { KeyboardEvent, useRef, useState } from "react";
import {
  CreateBase,
  Form,
  TextInput,
  useGetIdentity,
  useRecordContext,
} from "react-admin";
import { useParams } from "react-router";
import { visuallyHidden } from "@mui/utils";

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
        <NewMessageInput />
      </Form>
    </CreateBase>
  );
};

const NewMessageInput = () => {
  const button = useRef<HTMLInputElement>(null);
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      button.current?.click();
    }
  };
  return (
    <>
      <TextInput
        multiline
        rows={4}
        source="message"
        onKeyDown={handleKeyPress}
        placeholder="Ctrl + Enter to send"
        fullWidth
      />
      <input type="submit" style={visuallyHidden} ref={button} />
    </>
  );
};
