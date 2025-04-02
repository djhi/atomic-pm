import {
  Box,
  Stack,
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from "@mui/material";
import { Fragment, useRef, useState } from "react";
import {
  CreateBase,
  Form,
  InputProps,
  required,
  SaveButton,
  Translate,
  useGetIdentity,
  useInput,
  useRecordContext,
} from "react-admin";
import { useParams } from "react-router";

export const NewMessage = () => {
  const card = useRecordContext();
  const { identity } = useGetIdentity();
  const params = useParams<"boardId">();
  const [key, setKey] = useState(0);
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
        <TextAreaInput
          source="message"
          validate={required()}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.ctrlKey) {
              if (!event.repeat) {
                saveButtonRef.current?.click();
              }
              event.preventDefault(); // Prevents the addition of a new line in the text field
            }
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
            <Translate i18nKey="pm.sendMessageInstructions" />
          </Typography>
        </Stack>
      </Form>
    </CreateBase>
  );
};

const TextAreaInput = (props: InputProps & TextareaAutosizeProps) => {
  const { source, validate, ...rest } = props;
  const { field } = useInput(props);
  return (
    <Box
      component={TextareaAutosize}
      minRows={4}
      sx={{ bgcolor: 'inherit', mb: 1, display: 'block', width: '100%', p: 1 }}
      {...field}
      {...rest}
    />
  );
};
