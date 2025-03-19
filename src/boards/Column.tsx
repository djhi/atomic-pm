import { Draggable } from "@hello-pangea/dnd";
import {
  alpha,
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
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { CardList } from "./CardList";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { EditInPlaceInput } from "../ra/EditInPlaceInput";

export const Column = ({ sx, ...props }: StackProps) => {
  const column = useRecordContext();
  const totalEstimates = column?.cards?.reduce(
    (acc: number, card: any) => acc + card.estimate,
    0,
  );
  const hasTooManyCards =
    column?.maxCards != null && (column?.cards.length || 0) > column?.maxCards;
  const hasTooManyEstimates =
    column?.maxEstimates != null && totalEstimates > column?.maxEstimates;

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
            "&.warning": {
              bgcolor: (theme) => alpha(theme.palette.warning.dark, 0.2),
            },
          }}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
          ref={provided?.innerRef}
        >
          <Stack direction="column" gap={0.5} mb={1}>
            <EditBase
              id={column?.id}
              resource="columns"
              redirect={false}
              mutationMode="optimistic"
            >
              <Form>
                <EditInPlaceInput
                  source="name"
                  renderField={(ref) => (
                    <Stack direction="row" alignItems="start" gap={1}>
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
                        />
                        <ChipWithMax
                          max={column?.maxEstimates}
                          value={totalEstimates}
                          label="pm.pointCount"
                          labelWithMax="pm.pointCountWithLimit"
                          color="info"
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
  const queryClient = useQueryClient();
  const params = useParams<"boardId">();
  const translate = useTranslate();
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
        confirmTitle={translate("ra.message.delete_title", { id: column.name })}
        mutationOptions={{
          onSuccess: () => {
            queryClient.setQueryData(
              [
                "boards",
                "getOne",
                {
                  id: params.boardId,
                  meta: { columns: ["*, documents(*), columns(*, cards(*))"] },
                },
              ],
              (board: any) => ({
                ...board,
                columns: board.columns.filter(
                  (oldColumn: any) => oldColumn.id !== column.id,
                ),
              }),
            );
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
  color = "default",
}: {
  color?: ChipProps["color"];
  value: number;
  label: string;
  max?: number;
  labelWithMax?: string;
}) => {
  const translate = useTranslate();
  const hasTooMany = max != null && value > max;
  return (
    <Tooltip
      title={translate(max != null && labelWithMax ? labelWithMax : label, {
        smart_count: max ?? value,
        value: value,
      })}
    >
      <Chip
        label={max != null ? `${value} / ${max}` : value}
        size="small"
        color={hasTooMany ? "warning" : color}
      />
    </Tooltip>
  );
};
