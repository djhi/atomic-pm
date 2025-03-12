import * as React from "react";
import { Box, Stack, StackProps } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useEvent, useSaveContext, useTranslate } from "react-admin";

export const EditInPlace = (props: EditInPlaceProps) => {
  const {
    children,
    editionTrigger = "doubleClick",
    form,
    input,
    sx,
    ...rest
  } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const translate = useTranslate();
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = useEvent(() => {
    submitButtonRef.current?.click();
    setIsEditing(false);
  });

  const handleFormKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      handleCancel();
    }
    if (event.key === "Enter" && event.ctrlKey) {
      handleSubmit();
    }
  };
  const saveContext = useSaveContext();
  if (!saveContext || !saveContext.save) {
    throw new Error("EditInPlace components must be used inside a SaveContext");
  }

  const context = React.useMemo(
    () => ({ isEditing, setIsEditing, submit: handleSubmit }),
    [handleSubmit, isEditing, setIsEditing],
  );

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        width: "100%",
        ...sx,
      }}
      {...rest}
    >
      <EditInPlaceContext.Provider value={context}>
        {isEditing ? (
          form ? (
            form
          ) : (
            <Box onKeyDown={handleFormKeyDown}>
              {input}
              <button
                ref={submitButtonRef}
                type="submit"
                style={visuallyHidden}
              >
                {translate("ra.action.save")}
              </button>
            </Box>
          )
        ) : (
          <Box
            onClick={() => {
              if (editionTrigger === "click") {
                handleEdit();
              }
            }}
            onDoubleClick={() => {
              if (editionTrigger === "doubleClick") {
                handleEdit();
              }
            }}
          >
            {children}
          </Box>
        )}
      </EditInPlaceContext.Provider>
    </Stack>
  );
};

export interface EditInPlaceProps extends StackProps {
  children: React.ReactNode;
  form?: React.ReactNode;
  input: React.ReactNode;
  editionTrigger?: "click" | "doubleClick" | "none";
}

export interface EditInPlaceContextValue {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  submit: () => void;
}

const EditInPlaceContext = React.createContext<EditInPlaceContextValue | null>(
  null,
);

export const useEditInPlace = () => {
  const context = React.useContext(EditInPlaceContext);
  if (!context) {
    throw new Error(
      "useEditInPlace must be used inside a EditInPlaceContextProvider",
    );
  }
  return context;
};
