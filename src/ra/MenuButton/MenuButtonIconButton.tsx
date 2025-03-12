import MoreIcon from "@mui/icons-material/MoreVert";
import {
	IconButtonWithTooltip,
	type IconButtonWithTooltipProps,
} from "ra-ui-materialui";
import { useMenuButton } from "./useMenuButton";

// @ts-ignore
const DefaultIcon = <MoreIcon />;

export const MenuButtonIconButton = ({
	children = DefaultIcon,
	label = "ra.action.more",
	...props
}: MenuButtonIconButtonProps) => {
	const { openMenu } = useMenuButton();

	return (
		<IconButtonWithTooltip
			onClick={(event) => {
				event.stopPropagation();
				event.preventDefault();
				openMenu(event.currentTarget);
			}}
			label={label}
			{...props}
		>
			{children}
		</IconButtonWithTooltip>
	);
};

export interface MenuButtonIconButtonProps
	extends Partial<Omit<IconButtonWithTooltipProps, "onClick">> {}
