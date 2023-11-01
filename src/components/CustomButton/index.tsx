import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { theme } from "../../styles/_styles.scss";

interface CustomButtonProps extends ButtonProps {
  label: string;
  solidBorder?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, solidBorder, ...restProps }) => {
  const buttonStyle = {
    border: solidBorder ? `2px solid ${theme}` : "none",
    color: theme,
  };

  return (
    <Button
      {...restProps}
      style={buttonStyle}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
