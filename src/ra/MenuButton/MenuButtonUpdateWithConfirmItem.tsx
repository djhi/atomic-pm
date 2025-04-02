import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  type MenuItemProps,
} from "@mui/material";
import type { DefaultError, UseMutationOptions } from "@tanstack/react-query";
import { humanize, inflect } from "inflection";
import {
  type MutationMode,
  type RaRecord,
  Translate,
  type UpdateParams,
  useNotify,
  useRecordContext,
  useResourceContext,
  useTranslate,
  useUpdate,
} from "ra-core";
import { Confirm } from "ra-ui-materialui";
import * as React from "react";

export const MenuButtonUpdateWithConfirmItemComponent = <
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = DefaultError,
>(
  props: MenuButtonUpdateWithConfirmItemProps<RecordType, MutationOptionsError>,
) => {
  const notify = useNotify();
  const translate = useTranslate();
  const resource = useResourceContext(props);
  const [isOpen, setOpen] = React.useState(false);
  const record = useRecordContext<RecordType>(props);

  const {
    confirmTitle = "ra.message.bulk_update_title",
    confirmContent = "ra.message.bulk_update_content",
    data,
    icon,
    label = "ra.action.update",
    mutationMode = "pessimistic",
    onClick,
    mutationOptions = {},
    ...rest
  } = props;
  const {
    meta: mutationMeta,
    onSuccess = () => {
      notify(`resources.${resource}.notifications.updated`, {
        type: "info",
        messageArgs: {
          smart_count: 1,
          _: translate("ra.notification.updated", { smart_count: 1 }),
        },
        undoable: mutationMode === "undoable",
      });
    },
    onError = (error) => {
      notify(
        typeof error === "string"
          ? error
          : (error as Error)?.message || "ra.notification.http_error",
        {
          type: "error",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : (error as Error)?.message
                  ? (error as Error).message
                  : undefined,
          },
        },
      );
    },
    onSettled = () => {
      setOpen(false);
    },
    ...otherMutationOptions
  } = mutationOptions;

  const [update, { isPending }] = useUpdate<RecordType, MutationOptionsError>(
    resource,
    { id: record?.id, data, meta: mutationMeta, previousData: record },
    {
      onSuccess,
      onError,
      onSettled,
      mutationMode,
      ...otherMutationOptions,
    },
  );

  const handleClick = (e) => {
    setOpen(true);
    e.stopPropagation();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleUpdate = (e) => {
    update(resource, {
      id: record?.id,
      data,
      meta: mutationMeta,
      previousData: record,
    });

    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <>
      <MenuItem onClick={handleClick}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText>
          <Translate i18nKey={label}>{label}</Translate>
        </ListItemText>
      </MenuItem>
      <Confirm
        isOpen={isOpen}
        loading={isPending}
        title={confirmTitle}
        content={confirmContent}
        translateOptions={{
          smart_count: 1,
          name: translate(`resources.${resource}.forcedCaseName`, {
            smart_count: 1,
            _: humanize(
              translate(`resources.${resource}.name`, {
                smart_count: 1,
                _: resource ? inflect(resource, 1) : undefined,
              }),
              true,
            ),
          }),
        }}
        onConfirm={handleUpdate}
        onClose={handleDialogClose}
      />
    </>
  );
};

export const MenuButtonUpdateWithConfirmItem = React.forwardRef(
  MenuButtonUpdateWithConfirmItemComponent,
) as <RecordType extends RaRecord = RaRecord, MutationOptionsError = unknown>(
  props: MenuButtonUpdateWithConfirmItemProps<
    RecordType,
    MutationOptionsError
  > & {
    ref?: React.Ref<HTMLLIElement>;
  },
) => ReturnType<typeof MenuButtonUpdateWithConfirmItemComponent>;

export interface MenuButtonUpdateWithConfirmItemProps<
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
> extends MenuItemProps {
  confirmContent?: React.ReactNode;
  confirmTitle?: React.ReactNode;
  icon?: React.ReactNode;
  data: RecordType;
  label?: string;
  mutationMode?: MutationMode;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    UpdateParams<RecordType>
  > & { meta?: Record<string, unknown> };
}
