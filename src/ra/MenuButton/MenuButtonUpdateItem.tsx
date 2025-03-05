import type { RaRecord } from "ra-core";
import * as React from "react";
import { useMenuButton } from "./useMenuButton";
import {
	MenuButtonUpdateWithConfirmItem,
	type MenuButtonUpdateWithConfirmItemProps,
} from "./MenuButtonUpdateWithConfirmItem";
import { MenuButtonUpdateWithUndoItem } from "./MenuButtonUpdateWithUndoItem";

export const MenuButtonUpdateItemComponent = <
	RecordType extends RaRecord = RaRecord,
	MutationOptionsError = unknown,
>(
	{
		mutationMode = "undoable",
		...props
	}: MenuButtonUpdateWithConfirmItemProps<RecordType, MutationOptionsError>,
	ref: React.Ref<HTMLLIElement>,
) => {
	const { closeMenu } = useMenuButton();
	if (mutationMode === "undoable") {
		return (
			<MenuButtonUpdateWithUndoItem<RecordType, MutationOptionsError>
				{...props}
				ref={ref}
				onClick={closeMenu}
			/>
		);
	}
	return (
		<MenuButtonUpdateWithConfirmItem<RecordType, MutationOptionsError>
			{...props}
			ref={ref}
			onClick={closeMenu}
			mutationMode={mutationMode}
		/>
	);
};

export const MenuButtonUpdateItem = React.forwardRef(
	MenuButtonUpdateItemComponent,
) as <RecordType extends RaRecord = RaRecord, MutationOptionsError = unknown>(
	props: MenuButtonUpdateWithConfirmItemProps<
		RecordType,
		MutationOptionsError
	> & {
		ref?: React.Ref<HTMLLIElement>;
	},
) => ReturnType<typeof MenuButtonUpdateItemComponent>;
