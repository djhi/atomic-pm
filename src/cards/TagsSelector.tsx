import { ListItemText, MenuItem } from "@mui/material";
import { Translate, useCreate, useTranslate } from "react-admin";
import { useParams } from "react-router";
import {
  ListSelectorInput,
  type ListSelectorInputProps,
  useListSelectorContext,
} from "../ra/ListSelectorInput";

export const TagsSelector = (props: ListSelectorInputProps) => {
  return (
    <ListSelectorInput multiple {...props}>
      <CreateTagItem />
    </ListSelectorInput>
  );
};

const CreateTagItem = () => {
  const [create] = useCreate();
  const translate = useTranslate();
  const params = useParams<"boardId">();
  const { toggleChoice } = useListSelectorContext();
  return (
    <MenuItem
      onClick={async () => {
        const name = prompt(translate("pm.new_tag"));
        const record = await create(
          "tags",
          { data: { name, board_id: params.boardId } },
          { returnPromise: true },
        );
        toggleChoice(record);
      }}
    >
      <ListItemText>
        <Translate i18nKey="pm.new_tag" />
      </ListItemText>
    </MenuItem>
  );
};
