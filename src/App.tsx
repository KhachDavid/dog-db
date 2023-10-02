import React, { Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./store/sagas/selectors";
import "./styles/App.scss";

import DogAnimation from "./components/DogAnimation";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const NavBar = React.lazy(() => import("./components/NavBar"));

function App() {
  // Assuming you have a way to determine if the user is authenticated
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // on authenticated state change, route to the home page
  React.useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
        <Suspense fallback={<></>}>
          <NavBar />
        </Suspense>
        <Routes>
          {/* Use the "element" prop only for authenticated routes */}
          {user ? (
            <>
              <Route
                path="/"
                element={
                  <Suspense fallback={<></>}>
                    <HomePage />
                  </Suspense>
                }
              />
            </>
          ) : (
            // Use the "element" prop only for unauthenticated routes
            <>
              <Route
                path="/"
                element={<Navigate to="/login" replace={true} />}
              />
            </>
          )}
          <Route
            path="/login"
            element={
              <Suspense fallback={<></>}>
                <LoginPage />
              </Suspense>
            }
          />
          {/* 404 route */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </>
  );
}

export default App;
