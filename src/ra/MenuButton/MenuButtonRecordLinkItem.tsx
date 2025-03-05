import { MenuItem, type MenuItemProps } from "@mui/material";
import {
	type LinkToType,
	type RaRecord,
	useGetPathForRecord,
	useRecordContext,
	useResourceContext,
	useTranslate,
} from "ra-core";
import * as React from "react";
import type { LinkProps } from "react-router-dom";
import { MenuButtonLinkItem } from "./MenuButtonLinkItem";

const MenuButtonRecordLinkItemComponent = <
	RecordType extends RaRecord = RaRecord,
>(
	{ label, link, ...props },
	ref,
) => {
	const record = useRecordContext<RecordType>();
	const resource = useResourceContext();
	const path = useGetPathForRecord({
		record,
		resource,
		link,
	});
	const translate = useTranslate();

	if (!path) {
		return (
			<MenuItem ref={ref} disabled {...props}>
				{translate(label, { _: label })}
			</MenuItem>
		);
	}
	return <MenuButtonLinkItem ref={ref} to={path} label={label} {...props} />;
};

export const MenuButtonRecordLinkItem = React.forwardRef(
	MenuButtonRecordLinkItemComponent,
) as <RecordType extends RaRecord = RaRecord>(
	props: MenuButtonRecordLinkItemProps<RecordType> & {
		ref?: React.Ref<HTMLLIElement>;
	},
) => ReturnType<typeof MenuButtonRecordLinkItemComponent>;

export interface MenuButtonRecordLinkItemProps<
	RecordType extends RaRecord = RaRecord,
> extends MenuItemProps,
		Pick<
			LinkProps,
			| "reloadDocument"
			| "replace"
			| "state"
			| "preventScrollReset"
			| "relative"
			| "viewTransition"
		> {
	label: string;
	link: LinkToType<RecordType>;
	record?: RecordType;
}
