import { type MenuItemProps } from "@mui/material";
import {
	LinkToFunctionType,
	type RaRecord,
	useGetPathForRecord,
	useRecordContext,
	useResourceContext,
} from "ra-core";
import * as React from "react";
import { Link } from "react-router-dom";
import { MenuButtonLinkItem } from "./MenuButtonLinkItem";

const MenuButtonRecordLinkItemComponent = <
  RecordType extends RaRecord = RaRecord,
>({
  label,
  link,
  ref,
  ...props
}: MenuButtonRecordLinkItemProps<RecordType> & {
  ref?: React.Ref<HTMLLIElement | HTMLAnchorElement>;
}) => {
  const record = useRecordContext<RecordType>();
  const resource = useResourceContext();
  const path = useGetPathForRecord({
    record,
    resource,
    link,
  });

  if (!path) return null;

  return (
    <MenuButtonLinkItem
      ref={ref as React.Ref<HTMLAnchorElement>}
      to={path}
      label={label}
      {...props}
    />
  );
};

export const MenuButtonRecordLinkItem = React.forwardRef(
  MenuButtonRecordLinkItemComponent,
) as <RecordType extends RaRecord = RaRecord>(
  props: MenuButtonRecordLinkItemProps<RecordType> & {
    ref?: React.Ref<HTMLAnchorElement>;
  },
) => ReturnType<typeof MenuButtonRecordLinkItemComponent>;

export interface MenuButtonRecordLinkItemProps<RecordType extends RaRecord = RaRecord>
  extends Omit<MenuItemProps<typeof Link>, 'to'> {
  label: string;
  link: string | LinkToFunctionType<RecordType>;
  record?: RecordType;
}
