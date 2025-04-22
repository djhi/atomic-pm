import { Translate, useRecordContext } from "react-admin";
import { useParams } from "react-router";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { useUpdateBoard } from "../useUpdateBoard";

export const CardMenu = () => {
  const card = useRecordContext();
  const params = useParams<"boardId">();
  const { updateColumn } = useUpdateBoard();

  if (!card) return null;

  return (
    <MenuButton
      ButtonProps={{
        label: "pm.actionList",
        className: "card-menu-button",
        sx: {
          position: "absolute",
          opacity: 0,
          transition: "opacity 300ms",
          right: 12,
          top: 12,
        },
      }}
    >
      <MenuButton.LinkItem
        label="ra.action.edit"
        to={`/boards/${params.boardId}/cards/${card?.number}`}
      />
      <MenuButton.DeleteItem
        resource="cards"
        id={`${params.boardId}-${card.id}`}
        mutationMode="pessimistic"
        confirmTitle={
          <Translate
            i18nKey="ra.message.delete_title"
            options={{ id: card.title }}
          />
        }
        mutationOptions={{
          onSuccess: () => {
            updateColumn({
              board_id: params.boardId!,
              record: { id: card.column_id },
              update: (record) => ({
                ...record,
                cards: record.cards
                  .filter((oldCard: any) => card.id !== oldCard.id)
                  .map((oldCard: any) => ({
                    ...oldCard,
                    position:
                      oldCard.position > card.position
                        ? oldCard.position - 1
                        : oldCard.position,
                  })),
              }),
            });
          },
        }}
      />
    </MenuButton>
  );
};
