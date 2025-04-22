import type { RaRecord } from "ra-core";
import * as React from "react";
import { useMenuButton } from "./useMenuButton";
import {
  MenuButtonDeleteWithConfirmItem,
  type MenuButtonDeleteWithConfirmItemProps,
} from "./MenuButtonDeleteWithConfirmItem";
import { MenuButtonDeleteWithUndoItem } from "./MenuButtonDeleteWithUndoItem";

const MenuButtonDeleteItemComponent = <
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
>(
  {
    mutationMode = "undoable",
    ...props
  }: MenuButtonDeleteWithConfirmItemProps<RecordType, MutationOptionsError>,
  ref: React.Ref<HTMLLIElement>,
) => {
  const { closeMenu } = useMenuButton();

  if (mutationMode === "undoable") {
    return (
      <MenuButtonDeleteWithUndoItem<RecordType, MutationOptionsError>
        {...props}
        ref={ref}
        onClick={closeMenu}
      />
    );
  }
  return (
    <MenuButtonDeleteWithConfirmItem<RecordType, MutationOptionsError>
      {...props}
      ref={ref}
      onClick={closeMenu}
      mutationMode={mutationMode}
    />
  );
};

export const MenuButtonDeleteItem = React.forwardRef(
  MenuButtonDeleteItemComponent,
) as <RecordType extends RaRecord = RaRecord, MutationOptionsError = unknown>(
  props: MenuButtonDeleteWithConfirmItemProps<RecordType, MutationOptionsError>,
) => ReturnType<typeof MenuButtonDeleteItemComponent>;
