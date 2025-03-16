import * as React from "react";
import { Box, BoxProps, Popover, type PopoverProps } from "@mui/material";
import { FieldTitle } from "ra-core";
import { visuallyHidden } from "@mui/utils";

export const PopoverInput = (props: PopoverInputProps) => {
  const {
    ButtonProps: { sx, ...ButtonProps } = {},
    children,
    input,
    label,
    PopoverProps,
    resource,
    source,
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const anchorEl = React.useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = (event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    setIsOpen(true);
  };

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  const context = React.useMemo(
    () => ({ open: handleButtonClick, close: handlePopoverClose }),
    [handleButtonClick, handlePopoverClose],
  );

  return (
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
  );
};

export interface PopoverInputProps {
  children: React.ReactNode;
  input: React.ReactNode;
  PopoverProps?: PopoverProps;
  ButtonProps?: BoxProps<"button">;
  source: string;
  label?: string;
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
