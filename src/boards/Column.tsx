import { Draggable } from "@hello-pangea/dnd";
import {
  Chip,
  ChipProps,
  Stack,
  StackProps,
  Tooltip,
} from "@mui/material";
import {
  EditBase,
  Form,
  TextField,
  Translate,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router";
import clsx from "clsx";
import { CardList } from "./CardList";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { EditInPlaceInput } from "../ra/EditInPlaceInput";
import { useUpdateBoard } from "../useUpdateBoard";

export const Column = ({ sx, ...props }: StackProps) => {
  const column = useRecordContext();
  const translate = useTranslate();
  const totalEstimates = column?.cards?.reduce(
    (acc: number, card: any) => acc + (card.estimate ?? 0),
    0,
  );
  const hasTooManyCards =
    column?.maxCards != null && (column?.cards.length || 0) > column?.maxCards;
  const hasTooManyEstimates =
    column?.maxEstimates != null && totalEstimates > column?.maxEstimates;
  const hasWarning =
    hasTooManyCards || hasTooManyEstimates;

  return (
    <Draggable
      draggableId={`column-${column!.id}`}
      index={column!.position}
      // @ts-expect-error Draggable type is not defined in @hello-pangea/dnd
      type="column"
    >
      {(provided, snapshot) => (
        <Stack
          {...props}
          className={clsx({
            warning: hasTooManyCards || hasTooManyEstimates,
          })}
          sx={{
            ...sx,
            borderRadius: (theme) => `${theme.shape.borderRadius}px`,
            bgcolor: (theme) =>
              snapshot.isDragging ? theme.palette.background.paper : "inherit",
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
            width: { xs: "100%", sm: "100%", md: "350px" },
            flexShrink: 0,
            maxHeight: "85vh",
            transition: "bgcolor 300ms ease",
            px: 2,
            py: 1,
            "&.warning": {
              bgcolor: (theme) =>
                `color-mix(in srgb, ${theme.palette.warning.dark}, transparent 20%)`,
            },
          }}
          {...provided?.draggableProps}
          ref={provided?.innerRef}
        >
          <Stack
            direction="column"
            gap={0.5}
            mb={1}
            {...provided?.dragHandleProps}
          >
            <EditBase
              id={column?.id}
              resource="columns"
              redirect={false}
              mutationMode="optimistic"
            >
              <Form>
                <EditInPlaceInput
                  source="name"
                  initiallyEditing={column?.name == ""}
                  inputProps={{
                    placeholder: translate("pm.newColumn"),
                  }}
                  renderField={(ref) => (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <TextField
                        source="name"
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{ flexGrow: 1 }}
                        ref={ref}
                      />
                      <Stack direction="row" gap={1} alignItems="center">
                        <ChipWithMax
                          max={column?.maxCards}
                          value={column?.cards?.length || 0}
                          label="pm.cardCount"
                          labelWithMax="pm.cardCountWithLimit"
                          variant={hasWarning ? "filled" : "outlined"}
                        />
                        <ChipWithMax
                          max={column?.maxEstimates}
                          value={totalEstimates}
                          label="pm.pointCount"
                          labelWithMax="pm.pointCountWithLimit"
                          color={hasWarning ? "default" : "info"}
                          variant={hasWarning ? "filled" : "outlined"}
                        />
                        <ColumnMenu />
                      </Stack>
                    </Stack>
                  )}
                />
              </Form>
            </EditBase>
          </Stack>
          <CardList />
        </Stack>
      )}
    </Draggable>
  );
};

const ColumnMenu = () => {
  const column = useRecordContext();
  const params = useParams<"boardId">();
  const { updateBoard } = useUpdateBoard();
  if (!column) return null;

  return (
    <MenuButton ButtonProps={{ label: "pm.actionList" }}>
      <MenuButton.LinkItem
        label="pm.newCard"
        to={{
          pathname: `/boards/${params.boardId}/cards/create`,
          search: `?source=${JSON.stringify({
            column_id: column?.id,
            position: column.cards?.length,
            created_at: new Date().toISOString(),
          })}`,
        }}
      />
      <MenuButton.LinkItem
        label="ra.action.edit"
        to={`/boards/${params.boardId}/columns/${column?.id}`}
      />
      <MenuButton.DeleteItem
        resource="columns"
        record={column!}
        mutationMode="pessimistic"
        confirmTitle={
          <Translate
            i18nKey="ra.message.delete_title"
            options={{ id: column.name }}
          />
        }
        mutationOptions={{
          onSuccess: () => {
            updateBoard({
              board_id: params.boardId!,
              update: (record: any) => ({
                ...record,
                columns: record.columns.filter(
                  (oldColumn: any) => oldColumn.id !== column.id,
                ),
              }),
            });
          },
        }}
      />
    </MenuButton>
  );
};

const ChipWithMax = ({
  value,
  max,
  labelWithMax,
  label,
  ...rest
}: {
  value: number;
  label: string;
  max?: number;
  labelWithMax?: string;
} & ChipProps) => {
  return (
    <Tooltip
      title={
        <Translate
          i18nKey={max != null && labelWithMax ? labelWithMax : label}
          options={{
            smart_count: max ?? value,
            value: value,
          }}
        />
      }
    >
      <Chip
        label={max != null ? `${value} / ${max}` : value}
        size="small"
        {...rest}
      />
    </Tooltip>
  );
};
