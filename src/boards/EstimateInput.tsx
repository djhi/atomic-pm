import { InputProps, RadioButtonGroupInput } from "react-admin";

export const EstimateInput = (props: InputProps) => {
    return (
      <RadioButtonGroupInput
        {...props}
        choices={[
          { id: 0, name: "0" },
          { id: 0.5, name: "0.5" },
          { id: 1, name: "1" },
          { id: 2, name: "2" },
          { id: 3, name: "3" },
          { id: 5, name: "5" },
          { id: 8, name: "8" },
          { id: 13, name: "13" },
        ]}
      />
    );
}