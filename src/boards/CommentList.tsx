import { Box, Stack } from "@mui/material";
import { KeyboardEvent, useRef, useState } from "react";
import { visuallyHidden } from "@mui/utils";
import {
  CreateBase,
  DateField,
  Form,
  InfiniteListBase,
  ReferenceField,
  SimpleList,
  TextField,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { useParams } from "react-router";

export const CommentList = ({ cardId }: { cardId?: number | string }) => {
  const params = useParams<"boardId">();
  return (
    <>
      <Box sx={{ p: 2 }}>
        <NewMessage cardId={cardId} />
      </Box>
      <InfiniteListBase
        filter={
          cardId
            ? { card_id: cardId, board_id: params.boardId }
            : { board_id: params.boardId }
        }
        resource="comments"
        sort={{ field: "created_at", order: "DESC" }}
        perPage={100}
      >
        <SimpleList
          resource="comments"
          primaryText={(record) => record.message}
          secondaryText={
            <Stack component="span" direction="row" gap={1}>
              <ReferenceField reference="profiles" source="user_id">
                <TextField source="email" />
              </ReferenceField>
              <DateField source="created_at" showTime />
            </Stack>
          }
        />
      </InfiniteListBase>
    </>
  );
};

const NewMessage = ({ cardId }: { cardId?: number | string }) => {
  const { identity } = useGetIdentity();
  const params = useParams<"boardId">();
  const [key, setKey] = useState(0);

  return (
    <CreateBase
      key={key}
      resource="comments"
      record={{
        card_id: cardId,
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
        source="message"
        onKeyDown={handleKeyPress}
        placeholder="Ctrl + Enter to send"
        fullWidth
      />
      <input type="submit" style={visuallyHidden} ref={button} />
    </>
  );
};
