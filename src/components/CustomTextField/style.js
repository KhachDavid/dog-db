import {
    theme,
    errorColor,
  } from "../../styles/_styles.scss"
  import { width } from "../../styles/_styles.scss";

export const TextFieldSX = (error) => ({
    borderRadius: "1rem",
    width: width,
  
    "& .MuiOutlinedInput-root": {
      // normal state
      "& fieldset": {
        borderColor: error ? errorColor : theme,
      },
  
      // hover state
      "&:hover fieldset": {
        borderColor: error ? errorColor : theme,
      },
  
      // focused state
      "&.Mui-focused fieldset": {
        borderColor: error ? errorColor : theme,
      },
    },
  });