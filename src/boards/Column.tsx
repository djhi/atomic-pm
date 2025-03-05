import { Draggable } from "@hello-pangea/dnd";
import { alpha, Stack, StackProps, Typography } from "@mui/material";
import { TextField, useRecordContext, useTranslate } from "react-admin";
import { useParams } from "react-router";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { CardList } from "./CardList";
import { MenuButton } from "../ra/MenuButton/MenuButton";

export const Column = ({ sx, ...props }: StackProps) => {
  const column = useRecordContext();
  const translate = useTranslate();
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
            opacity: snapshot?.isDragging ? 0.9 : 1,
            transform: snapshot?.isDragging ? "rotate(-2deg)" : "",
            width: { xs: "100%", sm: "100%", md: "300px" },
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                source="name"
                gutterBottom
                variant="h6"
                component="h2"
              />
              <ColumnMenu />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="body1"
                color={hasTooManyCards ? "warning" : "info"}
              >
                {translate(
                  column?.maxCards != null
                    ? "pm.cardCountWithLimit"
                    : "pm.cardCount",
                  {
                    smart_count: column?.maxCards
                      ? column?.maxCards
                      : column?.cards?.length,
                    cards: column?.cards?.length,
                  },
                )}
              </Typography>
              <Typography
                variant="body1"
                color={hasTooManyEstimates ? "warning" : "info"}
              >
                {translate(
                  column?.maxEstimates != null
                    ? "pm.pointCountWithLimit"
                    : "pm.pointCount",
                  {
                    smart_count: column?.maxEstimates
                      ? column?.maxEstimates
                      : totalEstimates,
                    points: totalEstimates,
                  },
                )}
              </Typography>
            </Stack>
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
  if (!column) return null;

  return (
    <MenuButton>
      <MenuButton.LinkItem
        label="ra.action.edit"
        to={`/boards/${params.boardId}/columns/${column?.id}`}
      />
      <MenuButton.DeleteItem
        resource="columns"
        record={column!}
        mutationMode="pessimistic"
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
