import {
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { FieldTitle, InputHelperText, InputProps, useInput } from "react-admin";

const Choices = [0, 0.5, 1, 2, 3, 5, 8, 13];

export const EstimateInput = ({
  hideLabel,
  ...props
}: InputProps & { hideLabel?: boolean }) => {
  const { field, fieldState, isRequired } = useInput(props);
  const { error, invalid } = fieldState;
  const renderHelperText = props.helperText !== false || invalid;

  return (
    <FormControl
      sx={{
        width: "100%",
        minWidth: "50%",
        mt: 0.5,
      }}
    >
      {props.label !== false && !hideLabel ? (
        <FormLabel
          component="legend"
          sx={{
            transform: "translate(0, 5px) scale(0.75)",
            transformOrigin: (theme) =>
              `top ${theme.direction === "ltr" ? "left" : "right"}`,
          }}
        >
          <FieldTitle
            label={props.label}
            source={props.source}
            resource={props.resource}
            isRequired={isRequired}
          />
        </FormLabel>
      ) : null}
      <ToggleButtonGroup
        value={field.value}
        onChange={(_, value) => field.onChange(value)}
        exclusive
        sx={{
          mt: 0.5,
          display: "flex",
          flexDirection: "row",
          "& button": { flexBasis: 0, flexGrow: 1, minWidth: 0 },
        }}
        size="small"
      >
        {Choices.map((choice) => (
          <ToggleButton key={choice} value={choice}>
            {choice}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {renderHelperText ? (
        <FormHelperText>
          <InputHelperText
            error={error?.message}
            helperText={props.helperText}
          />
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
