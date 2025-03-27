import * as React from "react";
import { Box, Stack, useForkRef, useTheme } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import {
  InputProps,
  useInput,
  useSaveContext,
  useTranslate,
} from "react-admin";

export const EditInPlaceInput = (props: EditInPlaceInputProps) => {
  const {
    editionTrigger = "doubleClick",
    initiallyEditing = false,
    inputProps,
    renderField,
  } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const translate = useTranslate();
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);
  const { field, formState } = useInput(props);
  const initialValue = React.useRef(field.value);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const fieldRef = React.useRef<HTMLElement>(null);
  const fieldStyles = React.useRef<string | null>(null);
  const fieldBoundingBox = React.useRef<DOMRect | null>(null);

  const handleCancel = () => {
    if (initiallyEditing) return;
    setIsEditing(false);
  };

  const saveContext = useSaveContext();
  const { submitCount, isSubmitSuccessful } = formState;
  React.useEffect(() => {
    if (initiallyEditing) {
      setTimeout(() => {
        handleEdit();
      }, 100);
    }
  }, [initiallyEditing]);
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEditing(false);
      initialValue.current = field.value;
    }
  }, [submitCount, isSubmitSuccessful, field.value]);

  if (!saveContext || !saveContext.save) {
    throw new Error("EditInPlace components must be used inside a SaveContext");
  }

  const handleFormKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      handleCancel();
    }
  };

  const handleEdit = () => {
    if (!fieldRef.current) return;
    const field = fieldRef.current;
    if (initiallyEditing) {
      field.innerText = "@@temporary";
    }
    fieldBoundingBox.current = field.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(field);
    fieldStyles.current = getCssText(computedStyle, { width: '100%' });
    setIsEditing(true);
  };

  const theme = useTheme();
  React.useEffect(() => {
    const handleSubmit = (event: MouseEvent) => {
      if (event.target === inputRef.current) return;
      if (event.target === submitButtonRef.current) return;
      event.preventDefault();
      const currentValue = inputRef.current?.value;
      if (!inputRef.current || currentValue == initialValue.current) {
        handleCancel();
      }
      submitButtonRef.current?.click();
    };

    if (isEditing) {
      if (
        !inputRef.current ||
        !fieldBoundingBox.current ||
        !fieldStyles.current
      )
        return;
      const input = inputRef.current;
      // copy styles from the first input to the second one
      input.style.cssText = fieldStyles.current;
      // input.style.letterSpacing = "0.00938em"; // FIXME: letterSpacing isn't properly copied with getComputedStyle
      // position the second input on top of the first one
      input.style.top = `${fieldBoundingBox.current.top - 2}px`;
      input.style.left = `${fieldBoundingBox.current.left}px`;
      input.style.backgroundColor = theme.palette.action.focus;
      input.select();

      window.addEventListener("click", handleSubmit);
    }

    return () => {
      window.removeEventListener("click", handleSubmit);
    };
  }, [isEditing, theme]);

  const finalInputRef = useForkRef(inputRef, field.ref);
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: isEditing ? "block" : "none",
          flexDirection: "column",
        }}
        onKeyDown={handleFormKeyDown}
      >
        <input {...field} ref={finalInputRef} {...inputProps} />
        <button
          ref={submitButtonRef}
          type="submit"
          style={visuallyHidden}
          onClick={(event) => {
            const form = event.currentTarget.form;
            if (form == null) {
              event.preventDefault();
              handleCancel();
              return;
            }
            const currentValue = form[props.source].value;
            if (currentValue == initialValue.current) {
              event.preventDefault();
              handleCancel();
            }
          }}
        >
          {translate("ra.action.save")}
        </button>
      </Box>
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
        sx={{ display: isEditing ? "none" : "flex", flexDirection: "column" }}
      >
        {renderField(fieldRef)}
      </Box>
    </Stack>
  );
};

export interface EditInPlaceInputProps extends InputProps {
  renderField: (ref: React.Ref<HTMLElement>) => React.ReactNode;
  editionTrigger?: "click" | "doubleClick" | "flex";
  initiallyEditing?: boolean;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

/**
 * Convert the output of window.getComputedStyle() to a CSS string
 * @returns {string}
 */
const getCssText = (cssStyleDeclaration: CSSStyleDeclaration, override: Record<string, unknown> = {}) => {
  const nbProperties = cssStyleDeclaration.length;
  let css = "";
  for (let i = 0; i < nbProperties; i++) {
    const propertyName = cssStyleDeclaration.item(i);
    const propertyValue = cssStyleDeclaration.getPropertyValue(propertyName);
    if (propertyValue !== "") {
      css += `${propertyName}:${override[propertyName] ?? propertyValue}; `;
    }
  }
  return css;
};
