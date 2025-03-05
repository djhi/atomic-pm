import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	type MenuItemProps,
} from "@mui/material";
import clsx from "clsx";
import { humanize, singularize } from "inflection";
import {
	type RaRecord,
	useDeleteWithConfirmController,
	useRecordContext,
	useResourceContext,
	useTranslate,
	//   UseDeleteWithConfirmControllerParams,
} from "ra-core";
import type { UseDeleteWithConfirmControllerParams } from "ra-core/dist/cjs/controller/button/useDeleteWithConfirmController";
import { Confirm } from "ra-ui-materialui";
import * as React from "react";

const MenuButtonDeleteWithConfirmItemComponent = <
	RecordType extends RaRecord = RaRecord,
	MutationOptionsError = unknown,
>(
	props: MenuButtonDeleteWithConfirmItemProps<RecordType, MutationOptionsError>,
	ref,
) => {
	const {
		className,
		confirmTitle = "ra.message.delete_title",
		confirmContent = "ra.message.delete_content",
		confirmColor = "primary",
		icon,
		label = "ra.action.delete",
		mutationMode = "pessimistic",
		onClick,
		redirect = "list",
		mutationOptions,
		color = "error",
		successMessage,
		...rest
	} = props;
	const translate = useTranslate();
	const record = useRecordContext(props);
	const resource = useResourceContext(props);

	const { open, isPending, handleDialogOpen, handleDialogClose, handleDelete } =
		useDeleteWithConfirmController({
			record,
			redirect,
			mutationMode,
			onClick,
			mutationOptions,
			resource,
			successMessage,
		});

	return (
		<>
			<MenuItem
				onClick={handleDialogOpen}
				className={clsx("ra-delete-button", className)}
				key="button"
				color={color}
				ref={ref}
				{...rest}
			>
				{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
				<ListItemText>{translate(label, { _: label })}</ListItemText>
			</MenuItem>
			<Confirm
				isOpen={open}
				loading={isPending}
				title={confirmTitle}
				content={confirmContent}
				confirmColor={confirmColor}
				translateOptions={{
					name: translate(`resources.${resource}.forcedCaseName`, {
						smart_count: 1,
						_: humanize(
							translate(`resources.${resource}.name`, {
								smart_count: 1,
								_: resource ? singularize(resource) : undefined,
							}),
							true,
						),
					}),
					id: record?.id,
				}}
				onConfirm={handleDelete}
				onClose={handleDialogClose}
			/>
		</>
	);
};

export const MenuButtonDeleteWithConfirmItem = React.forwardRef(
	MenuButtonDeleteWithConfirmItemComponent,
) as <RecordType extends RaRecord = RaRecord, MutationOptionsError = unknown>(
	props: MenuButtonDeleteWithConfirmItemProps<
		RecordType,
		MutationOptionsError
	> & {
		ref?: React.Ref<HTMLLIElement>;
	},
) => ReturnType<typeof MenuButtonDeleteWithConfirmItemComponent>;

export interface MenuButtonDeleteWithConfirmItemProps<
	RecordType extends RaRecord = RaRecord,
	MutationOptionsError = unknown,
> extends Omit<MenuItemProps, "onClick">,
		UseDeleteWithConfirmControllerParams<RecordType, MutationOptionsError> {
	confirmTitle?: React.ReactNode;
	confirmContent?: React.ReactNode;
	confirmColor?: "primary" | "warning";
	icon?: React.ReactNode;
	label?: string;
}
