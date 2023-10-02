import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginRequest, logoutRequest } from "../../store/actions/auth.actions";
import { styled } from "@mui/material/styles";
import DogAnimation from "../DogAnimation";
import { theme } from "../../styles/_styles.scss";

const StyledAppBar = styled(AppBar)`
  background-color: ${theme};
  position: static;
`;

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Dispatch the login action when the user clicks the login button
    dispatch(loginRequest());
  };

  const handleLogout = () => {
    // Dispatch the logout action when the user clicks the logout button
    dispatch(logoutRequest());
  };

  return (
    <StyledAppBar>
      <Toolbar>
        <DogAnimation/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dog Database
        </Typography>
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
