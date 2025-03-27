import { FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent } from "react";
import { useEvent, useListContext, useTranslate } from "react-admin";

export const HideHistoryButton = () => {
  const listContext = useListContext();
  const { filterValues, setFilters } = listContext;
  const isSelected = filterValues?.type == undefined;
  const translate = useTranslate();

  const handleClick = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilters({ ...filterValues, type: undefined });
    } else {
      setFilters({ ...filterValues, type: "comment" });
    }
  });

  return (
    <FormControlLabel
      control={<Switch checked={isSelected} onChange={handleClick} size="small" />}
      label={translate('pm.show_history')}
      sx={{ pl: 1 }}
    />
  );
};