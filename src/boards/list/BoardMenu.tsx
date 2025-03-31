import { RecordRepresentation, useRecordContext } from "react-admin";
import { MenuButton } from "../../ra/MenuButton/MenuButton";
import { BoardForm } from "./BoardForm";

export const BoardMenu = () => {
  const board = useRecordContext();
  if (!board) return null;

  return (
    <MenuButton ButtonProps={{ label: "pm.actionList" }}>
      <MenuButton.RecordLinkItem label="ra.action.show" link="show" />
      <MenuButton.EditInDialog title={<RecordRepresentation />}>
        <BoardForm />
      </MenuButton.EditInDialog>
      <MenuButton.DeleteItem mutationMode="pessimistic" />
    </MenuButton>
  );
};
