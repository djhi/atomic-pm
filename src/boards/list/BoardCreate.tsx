import { CreateInDialogButton } from "@react-admin/ra-form-layout";
import { useGetIdentity } from "react-admin";
import { useNavigate } from "react-router";
import { BoardForm } from "./BoardForm";

export const BoardCreate = () => {
  const { identity } = useGetIdentity();
  const navigate = useNavigate();

  return (
    <CreateInDialogButton
      label="pm.newBoard"
      resource="boards"
      maxWidth="md"
      fullWidth
      record={{ user_id: identity?.id, created_at: new Date().toISOString() }}
      mutationOptions={{ onSuccess: (data) => navigate(`/boards/${data.id}`) }}
    >
      <BoardForm />
    </CreateInDialogButton>
  );
};
