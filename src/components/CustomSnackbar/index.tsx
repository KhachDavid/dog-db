import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import {
  selectSnackbarHorizontal,
  selectSnackbarVertical,
} from "../../store/sagas/selectors";

export default function CustomSnackbar({ open, message, handleClose }) {
  const vertical = useSelector(selectSnackbarVertical);
  const horizontal = useSelector(selectSnackbarHorizontal);
  return (
    <Snackbar
      anchorOrigin={{
        vertical,
        horizontal,
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
