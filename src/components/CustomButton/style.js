import { theme, disabledColor } from "../../styles/_styles.scss";
import { width } from "../../styles/_styles.scss";

export const ButtonSX = (disabled) => ({
  borderRadius: "1rem",
  width: width,

  "& .MuiOutlinedInput-root": {
    // normal state
    "& fieldset": {
      borderColor: disabled ? disabledColor : theme,
    },

    // hover state
    "&:hover fieldset": {
      borderColor: disabled ? disabledColor : theme,
    },

    // focused state
    "&.Mui-focused fieldset": {
      borderColor: disabled ? disabledColor : theme,
    },
  },
});
