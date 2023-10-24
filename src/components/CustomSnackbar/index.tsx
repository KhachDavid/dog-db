import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function CustomSnackbar({ open, message, handleClose }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={5000} // 5000 milliseconds (5 seconds)
      onClose={handleClose}
    >
      <MuiAlert elevation={6} variant="filled" severity="info">
        {message}
      </MuiAlert>
    </Snackbar>
  );
}