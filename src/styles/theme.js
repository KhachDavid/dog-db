import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#f44336",
    },
    action: {
      disabled: "#757575",
      selected: "#3f51b5",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "normal",
    },
    body2: {
      fontSize: "0.8rem",
      fontWeight: "normal",
    },
  },
});

export default theme;
