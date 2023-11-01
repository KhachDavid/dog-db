import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMatchedDog,
  selectUser,
  selectIsSnackbarActive,
  selectSnackbarMessage,
} from "./store/sagas/selectors";
import "./styles/App.scss";
import CustomSnackbar from "./components/CustomSnackbar";
import { deactivateSnackbar } from "./store/actions/settings.actions";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const FavoritesPage = React.lazy(() => import("./pages/FavoritesPage"));
const MatchPage = React.lazy(() => import("./pages/MatchPage"));
const NavBar = React.lazy(() => import("./components/NavBar"));

function App() {
  // Assuming you have a way to determine if the user is authenticated
  const user = useSelector(selectUser);
  const match = useSelector(selectMatchedDog);
  const isActive = useSelector(selectIsSnackbarActive);
  const message = useSelector(selectSnackbarMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // on authenticated state change, route to the home page
  React.useEffect(() => {
    if (user) {
      if (match.length > 0) {
        navigate("/match");
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [user, match]);

  return (
    <>
      <Suspense fallback={<></>}>
        <NavBar setCurrentPage={setCurrentPage}/>
      </Suspense>
      <Routes>
        {/* Use the "element" prop only for authenticated routes */}
        {user ? (
          <>
            <Route
              path="/"
              element={
                <Suspense fallback={<></>}>
                  <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </Suspense>
              }
            />
            <Route
              path="/favorites"
              element={
                <Suspense fallback={<></>}>
                  <FavoritesPage />
                </Suspense>
              }
            />
            <Route
              path="/match"
              element={
                <Suspense fallback={<></>}>
                  <MatchPage />
                </Suspense>
              }
            />
          </>
        ) : (
          // Use the "element" prop only for unauthenticated routes
          <>
            <Route path="/" element={<Navigate to="/login" replace={true} />} />
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
      <div>
        <CustomSnackbar
          open={isActive}
          message={message}
          handleClose={() => dispatch(deactivateSnackbar())}
        />
      </div>
    </>
  );
}

export default App;
