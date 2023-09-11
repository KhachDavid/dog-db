import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

function App() {
  // Assuming you have a way to determine if the user is authenticated
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);

  const navigate = useNavigate();
  // on authenticated state change, route to the home page
  React.useEffect(() => {
    if (authenticated) {
      // Navigate to the home page
      // You can use the `Navigate` component here
      // Or you can use the `useNavigate` hook here
      if (authenticated) {
        navigate("/");
      }
    }
  }, [authenticated, navigate]);

  return (
    <BrowserRouter> {/* Wrap your App component in BrowserRouter */}
      <ThemeProvider theme={theme}>
        <Routes>
          {/* Use the "element" prop only for authenticated routes */}
          {authenticated ? (
            <>
              <Route path="/" element={<HomePage />} />
            </>
          ) : (
            // Redirect to the login page if not authenticated
            <Route path="*" element={<Navigate to="/login" />} />
          )}

          {/* Route for the login page */}
          <Route
            path="/login"
            element={<LoginPage setAuthenticated={setAuthenticated} />}
          />

          {/* 404 route */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
