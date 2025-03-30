import * as React from "react";
import { Box, BoxProps, Popover, type PopoverProps } from "@mui/material";
import {
  CreateParams,
  FieldTitle,
  Form,
  RaRecord,
  UpdateParams,
  useEvent,
  SaveButton,
} from "react-admin";
import { visuallyHidden } from "@mui/utils";
import { UseMutationOptions } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { FormProps } from "react-router";

export const PopoverForm = (props: PopoverFormProps) => {
  const {
    ButtonProps: { sx, ...ButtonProps } = {},
    children,
    input,
    label,
    mutationOptions,
    PopoverProps,
    resource,
    source,
    ...rest
  } = props;
  return (
    // @ts-ignore
    <Box
      component={Form}
      {...rest}
      sx={{ display: "inline-flex", flexGrow: 0, flexShrink: 1 }}
    >
      <PopoverFormView
        ButtonProps={ButtonProps}
        input={input}
        label={label}
        mutationOptions={mutationOptions}
        PopoverProps={PopoverProps}
        resource={resource}
        source={source}
      >
        {children}
      </PopoverFormView>
    </Box>
  );
};

const PopoverFormView = (props: PopoverFormProps) => {
  const {
    ButtonProps: { sx, ...ButtonProps } = {},
    children,
    input,
    label,
    mutationOptions,
    PopoverProps,
    resource,
    source,
  } = props;
  const { formState } = useFormContext();
  const { isDirty } = formState;
  const [isOpen, setIsOpen] = React.useState(false);
  const anchorEl = React.useRef<HTMLButtonElement | null>(null);
  const submitButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = useEvent((event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    setIsOpen(true);
  });

  const handlePopoverClose = useEvent(() => {
    if (isDirty) {
      return submitButtonRef.current?.click();
    }
    setIsOpen(false);
  });

  const context = React.useMemo(
    () => ({ open: handleButtonClick, close: handlePopoverClose }),
    [handleButtonClick, handlePopoverClose],
  );
  return (
    <>
      <PopoverInputContext.Provider value={context}>
        <div>
          <Box
            component="button"
            {...ButtonProps}
            ref={anchorEl}
            onClick={handleButtonClick}
            sx={{ p: 0, border: "none", backgroundColor: "transparent", ...sx }}
          >
            <span style={visuallyHidden}>
              <FieldTitle label={label} source={source} resource={resource} />
            </span>
            {children}
          </Box>
        </div>
        <Popover
          open={isOpen}
          anchorEl={anchorEl.current}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          slotProps={{
            paper: { sx: { minWidth: "200px" } },
          }}
          {...PopoverProps}
        >
          {input}
        </Popover>
      </PopoverInputContext.Provider>

      <SaveButton
        ref={submitButtonRef}
        icon={<div />}
        variant="outlined"
        color="inherit"
        size="medium"
        type="button"
        mutationOptions={{
          onSuccess: (data, variables, context) => {
            mutationOptions?.onSuccess?.(data, variables, context);
            setIsOpen(false);
          },
        }}
        style={visuallyHidden}
      />
    </>
  );
};

export interface PopoverFormProps extends FormProps {
  children: React.ReactNode;
  input: React.ReactNode;
  PopoverProps?: PopoverProps;
  ButtonProps?: BoxProps<"button">;
  source: string;
  label?: string;
  mutationOptions?: UseMutationOptions<
    RaRecord,
    unknown,
    CreateParams<RaRecord> | UpdateParams<RaRecord>
  >;
  resource?: string;
}

interface PopoverInputContextValue {
  open: () => void;
  close: () => void;
}

export const PopoverInputContext = React.createContext<
  PopoverInputContextValue | undefined
>(undefined);

export const usePopoverInput = () => {
  const context = React.useContext(PopoverInputContext);
  if (context === undefined) {
    throw new Error(
      "usePopoverInput must be used within a PopoverInputContext.Provider",
    );
  }
  return context;
};
