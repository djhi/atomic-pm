import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  type MenuItemProps,
} from "@mui/material";
import clsx from "clsx";
import {
  type RaRecord,
  Translate,
  useDeleteWithUndoController,
  useRecordContext,
  useResourceContext,
} from "ra-core";
import type { UseDeleteWithUndoControllerParams } from "ra-core/dist/cjs/controller/button/useDeleteWithUndoController";
import * as React from "react";

export const MenuButtonDeleteWithUndoItemComponent = <
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
>(
  props: MenuButtonDeleteWithUndoItemProps<RecordType, MutationOptionsError>,
  ref: React.Ref<HTMLLIElement>,
) => {
  const {
    label = "ra.action.delete",
    className,
    icon,
    onClick,
    redirect = "list",
    mutationOptions,
    color = "error",
    successMessage,
    ...rest
  } = props;

  const record = useRecordContext(props);
  const resource = useResourceContext(props);
  const { isPending, handleDelete } = useDeleteWithUndoController({
    record,
    resource,
    redirect,
    onClick,
    mutationOptions,
    successMessage,
  });

  return (
    <MenuItem
      onClick={handleDelete}
      disabled={isPending}
      className={clsx("ra-delete-button", className)}
      key="button"
      color={color}
      ref={ref}
      {...rest}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText>
        <Translate i18nKey={label}>{label}</Translate>
      </ListItemText>
    </MenuItem>
  );
};

export const MenuButtonDeleteWithUndoItem = React.forwardRef(
  MenuButtonDeleteWithUndoItemComponent,
) as <RecordType extends RaRecord = RaRecord, MutationOptionsError = unknown>(
  props: MenuButtonDeleteWithUndoItemProps<RecordType, MutationOptionsError>,
) => ReturnType<typeof MenuButtonDeleteWithUndoItemComponent>;

export interface MenuButtonDeleteWithUndoItemProps<
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
> extends Omit<MenuItemProps, "onClick">,
    UseDeleteWithUndoControllerParams<RecordType, MutationOptionsError> {
  icon?: React.ReactNode;
  label?: string;
}
