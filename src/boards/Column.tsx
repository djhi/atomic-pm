import { Draggable } from "@hello-pangea/dnd";
import { Stack, StackProps } from "@mui/material";
import {
  EditBase,
  Form,
  TextField,
  useRecordContext,
  useTranslate,
} from "react-admin";
import clsx from "clsx";
import { EditInPlaceInput } from "../ra/EditInPlaceInput";
import { CardList } from "./CardList";
import { ColumnMenu } from "./ColumnMenu";
import { ChipWithMax } from "./ChipWithMax";

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
  const hasWarning = hasTooManyCards || hasTooManyEstimates;

  return (
    <Draggable
      draggableId={`column-${column!.id}`}
      index={column!.position}
      // @ts-expect-error Draggable type is not defined in @hello-pangea/dnd
      type="column"
    >
      {(provided, snapshot) => (
        <ColumnRoot
          {...props}
          className={clsx({
            warning: hasTooManyCards || hasTooManyEstimates,
          })}
          isDragging={snapshot.isDragging}
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
        </ColumnRoot>
      )}
    </Draggable>
  );
};

const ColumnRoot = ({ isDragging, sx, ...rest }: StackProps & { isDragging: boolean }) => (
  <Stack
    sx={{
      ...sx,
      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
      bgcolor: (theme) =>
        isDragging ? theme.palette.background.paper : "inherit",
      transform: isDragging ? "rotate(-2deg)" : "",
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
    {...rest}
  />
)