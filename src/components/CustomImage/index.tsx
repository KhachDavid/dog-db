import React from 'react';
import { Card, CardMedia } from '@mui/material';

interface CustomImageProps {
  url: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ url }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="Custom Image"
        height="auto"
        src={url}
      />
    </Card>
  );
};

export default CustomImage;
