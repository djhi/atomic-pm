import { Box, Typography } from "@mui/material";
import Inbox from "@mui/icons-material/Inbox";
import {
  EmptyClasses,
  EmptyProps,
  Translate,
  useGetResourceLabel,
  useResourceContext,
  useResourceDefinition,
  useTranslate,
} from "react-admin";
import { BoardCreate } from "./BoardCreate";

export const BoardEmpty = (props: EmptyProps) => {
  const { className } = props;
  const { hasCreate } = useResourceDefinition(props);
  const resource = useResourceContext(props);
  const translate = useTranslate();
  const getResourceLabel = useGetResourceLabel();
  const resourceName = translate(`resources.${resource}.forcedCaseName`, {
    smart_count: 0,
    _: resource ? getResourceLabel(resource, 0) : undefined,
  });

  const emptyMessage = translate("ra.page.empty", { name: resourceName });
  const inviteMessage = translate("ra.page.invite");

  return (
    <Box
      sx={{
        flex: 1,
        [`& .${EmptyClasses.message}`]: {
          textAlign: "center",
          opacity: (theme) => (theme.palette.mode === "light" ? 0.5 : 0.8),
          margin: "0 1em",
          color: (theme) =>
            theme.palette.mode === "light"
              ? "inherit"
              : theme.palette.text.primary,
        },

        [`& .${EmptyClasses.icon}`]: {
          width: "9em",
          height: "9em",
        },

        [`& .${EmptyClasses.toolbar}`]: {
          textAlign: "center",
          marginTop: "2em",
        },
      }}
      className={className}
    >
      <div className={EmptyClasses.message}>
        <Inbox className={EmptyClasses.icon} />
        <Typography variant="h4" paragraph>
          <Translate
            i18nKey={`resources.${resource}.empty`}
            options={{
              _: emptyMessage,
            }}
          />
        </Typography>
        {hasCreate && (
          <Typography variant="body1">
            <Translate
              i18nKey={`resources.${resource}.invite`}
              options={{
                _: inviteMessage,
              }}
            />
          </Typography>
        )}
      </div>
      <div className={EmptyClasses.toolbar}>
        <BoardCreate />
      </div>
    </Box>
  );
};
