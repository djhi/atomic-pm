import { Chip, ChipProps, Tooltip } from "@mui/material";
import { Translate } from "react-admin";

export const ChipWithMax = ({
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
