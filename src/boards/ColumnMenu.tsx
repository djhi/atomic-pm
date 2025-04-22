import { Translate, useRecordContext } from "react-admin";
import { useParams } from "react-router";
import { MenuButton } from "../ra/MenuButton/MenuButton";
import { useUpdateBoard } from "../useUpdateBoard";

export const ColumnMenu = () => {
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
