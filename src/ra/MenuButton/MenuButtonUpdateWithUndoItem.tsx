import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  type MenuItemProps,
} from "@mui/material";
import {
  type RaRecord,
  Translate,
  useNotify,
  useRecordContext,
  useRefresh,
  useResourceContext,
  useTranslate,
  useUpdate,
  UseUpdateOptions,
} from "ra-core";
import * as React from "react";

const MenuButtonUpdateWithUndoItemComponent = <
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
>(
  props: MenuButtonUpdateWithUndoItemProps<RecordType, MutationOptionsError>,
  ref: React.Ref<HTMLLIElement>,
) => {
  const record = useRecordContext<RecordType>(props);
  const notify = useNotify();
  const resource = useResourceContext(props);
  const refresh = useRefresh();
  const translate = useTranslate();

  const {
    data,
    label = "ra.action.update",
    icon,
    onClick,
    mutationOptions = {},
    ...rest
  } = props;

  const [updateMany, { isPending }] = useUpdate<
    RecordType,
    MutationOptionsError
  >();

  const {
    meta: mutationMeta,
    onSuccess = () => {
      notify(`resources.${resource}.notifications.updated`, {
        type: "info",
        messageArgs: {
          smart_count: 1,
          _: translate("ra.notification.updated", { smart_count: 1 }),
        },
        undoable: true,
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
      refresh();
    },
    ...otherMutationOptions
  } = mutationOptions;

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!record) {
      throw new Error(
        "The UpdateWithUndoButton must be used inside a RecordContext.Provider or must be passed a record prop.",
      );
    }
    updateMany(
      resource,
      { id: record.id, data, meta: mutationMeta, previousData: record },
      {
        onSuccess,
        onError,
        mutationMode: "undoable",
        ...otherMutationOptions,
      },
    );
    if (typeof onClick === "function") {
      onClick(event);
    }
    event.stopPropagation();
  };

  return (
    <MenuItem onClick={handleClick} disabled={isPending} ref={ref} {...rest}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText>
        <Translate i18nKey={label}>{label}</Translate>
      </ListItemText>
    </MenuItem>
  );
};

export const MenuButtonUpdateWithUndoItem = React.forwardRef(
  MenuButtonUpdateWithUndoItemComponent,
) as <RecordType extends RaRecord = RaRecord, MutationOptionsError = unknown>(
  props: MenuButtonUpdateWithUndoItemProps<RecordType, MutationOptionsError> & {
    ref?: React.Ref<HTMLLIElement>;
  },
) => ReturnType<typeof MenuButtonUpdateWithUndoItemComponent>;

export interface MenuButtonUpdateWithUndoItemProps<
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
> extends MenuItemProps {
  icon?: React.ReactNode;
  label?: string;
  data: RecordType;
    mutationOptions?: UseUpdateOptions<RecordType, MutationOptionsError>;
  
}
