import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends ButtonProps {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...restProps }) => {
  return (
    <Button {...restProps}>
      {label}
    </Button>
  );
};

export default CustomButton;
