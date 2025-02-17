import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const RoundedTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        InputProps={{
          ...props.InputProps,
          sx: { borderRadius: 48, ...props.InputProps?.sx },
        }}
      />
    );
  }
);
RoundedTextField.displayName = "RoundedTextField";

export default RoundedTextField;
