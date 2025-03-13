import { Stack, Typography } from "@mui/material";
import { Fragment, useRef, useState } from "react";
import {
  CreateBase,
  Form,
  required,
  SaveButton,
  TextInput,
  useGetIdentity,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router";

export const NewMessage = () => {
  const card = useRecordContext();
  const { identity } = useGetIdentity();
  const params = useParams<"boardId">();
  const [key, setKey] = useState(0);
  const translate = useTranslate();
  const saveButtonRef = useRef<HTMLButtonElement>(null);

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
          slotProps={{
            input: {
              onKeyDown: (event) => {
                if (event.key === 'Enter' && event.ctrlKey) {
                  if (!event.repeat) {
                    saveButtonRef.current?.click()
                  }
                  event.preventDefault(); // Prevents the addition of a new line in the text field
                }
              },
            },
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SaveButton
            label="pm.sendMessage"
            type="submit"
            icon={<Fragment />}
            size="small"
            variant="outlined"
            ref={saveButtonRef}
          />
          <Typography variant="caption" color="textSecondary">
            {translate("pm.sendMessageInstructions")}
          </Typography>
        </Stack>
      </Form>
    </CreateBase>
  );
};
