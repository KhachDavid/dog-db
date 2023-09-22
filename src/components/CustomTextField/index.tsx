import React, { useState } from "react";
import { TextField } from "@mui/material";
import { CustomTextFieldVariants, CustomTextFieldTypes } from "./types";
import { TextFieldSX } from "./style";
import { useDispatch } from "react-redux";

interface CustomTextFieldProps {
  className: string;
  id: string;
  label: string;
  name: string;
  // Update the type of setValue to a function that dispatches an action
  setValue: (value: string) => void;
  value: string;
  error?: boolean;
  helperText?: string | React.ReactNode;
  isRequired?: boolean;
  type?: CustomTextFieldTypes;
  variant?: CustomTextFieldVariants;
}

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  return (
    <TextField
      className={props.className}
      label={props.label}
      error={props.error && !isFocused}
      helperText={props.error && !isFocused ? props.helperText : ""}
      id={props.id}
      InputLabelProps={{ required: props.isRequired }}
      name={props.name}
      onChange={(e) => {
        // Dispatch an action with the updated value
        dispatch(props.setValue(e.target.value));
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      sx={TextFieldSX(props.error && !isFocused)}
      type={props.type || "text"}
      value={props.value}
      variant={props.variant || "outlined"}
    />
  );
};

CustomTextField.defaultProps = {
  error: false,
  helperText: "",
  isRequired: true,
  type: "text",
};

export default CustomTextField;
