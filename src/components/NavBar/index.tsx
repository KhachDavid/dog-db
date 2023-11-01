import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  AppBar,
  Toolbar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../store/actions/auth.actions";
import { styled } from "@mui/material/styles";
import { theme } from "../../styles/_styles.scss";
import CustomButton from "../CustomButton";
import { selectGeoBoundingBox, selectSavedSearches, selectUser } from "../../store/sagas/selectors";
import SavedSearchContent from "../SavedSearchContent";
import {
  removeSavedSearch,
} from "../../store/actions/settings.actions";
import CustomMap from "../CustomMap";
import { searchLocationsRequest, setUserLocation } from "../../store/actions/location.actions";

interface NavbarProps {
  setCurrentPage: (pageNumber: number) => void,
}

const StyledAppBar = styled(AppBar)`
  background-color: ${theme};
  position: sticky;
  padding-right: 0 !important;
`;

const styles = {
  whiteIcon: {
    color: "white",
  },
};

const Navbar: React.FC<NavbarProps> = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const savedSearches = useSelector(selectSavedSearches);
  const geoBoundingBox = useSelector(selectGeoBoundingBox);

  const [isMapSearchOpen, setMapSearchOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isSavedSearchesDialogOpen, setSavedSearchesDialogOpen] =
    useState(false);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logoutRequest());
    setLogoutDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleSavedSearchesOpen = () => {
    setSavedSearchesDialogOpen(true);
  };

  const handleSavedSearchesClose = () => {
    setSavedSearchesDialogOpen(false);
  };

  const handleMapSearchOpen = () => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      dispatch(setUserLocation(latitude, longitude));
      setMapSearchOpen(true);
    };

    const errorCallback = (error) => {
      setMapSearchOpen(true);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const handleMapSearchClose = () => {
    setMapSearchOpen(false);
  };

  const handleMapSearch = () => {
    setCurrentPage(1);
    dispatch(searchLocationsRequest({geoBoundingBox: geoBoundingBox}));
    handleMapSearchClose();
  };


  return (
    <StyledAppBar>
      <Toolbar style={{ position: "sticky", top: 0, backgroundColor: theme, zIndex: 1000 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip placement="top" title="Home">
            <IconButton style={styles.whiteIcon} component={Link} to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          {user && (
            <Tooltip placement="top" title="Favorites">
              <IconButton
                style={styles.whiteIcon}
                component={Link}
                to="/favorites"
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          )}
          {user && (
            <Tooltip placement="top" title="Saved Searches">
              <IconButton
                style={styles.whiteIcon}
                onClick={handleSavedSearchesOpen}
              >
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
          )}
          {user && (
            <Tooltip placement="top" title="Map Search">
              <IconButton
                style={styles.whiteIcon}
                onClick={handleMapSearchOpen}
              >
                <LocationOnIcon />
              </IconButton>
            </Tooltip>
          )}
          {/* "Settings" dropdown */}
          {user && (
            <Tooltip placement="top" title="Logout">
              <IconButton style={styles.whiteIcon} onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>

      <Dialog open={isLogoutDialogOpen} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={handleCancelLogout}
            color="primary"
            label="Cancel"
          />
          <CustomButton
            onClick={handleConfirmLogout}
            color="primary"
            label="Logout"
          />
        </DialogActions>
      </Dialog>
      <Dialog
        open={isSavedSearchesDialogOpen}
        onClose={handleSavedSearchesClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Saved Searches</DialogTitle>
        <DialogContent>
          <SavedSearchContent
            savedSearches={savedSearches}
            onRemoveSearch={(id) => dispatch(removeSavedSearch(id))}
            closeModal={handleSavedSearchesClose}
          />
        </DialogContent>

        <DialogActions>
          <CustomButton
            onClick={handleSavedSearchesClose}
            color="primary"
            label="Close"
          />
        </DialogActions>
      </Dialog>
      <Dialog
        open={isMapSearchOpen}
        onClose={handleMapSearchClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Map Search</DialogTitle>
        <DialogContent sx={{ height: "80vh" }}>
          <CustomMap />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleMapSearchClose} label="Close" />
          <CustomButton onClick={handleMapSearch} label="Search This Area"/>
        </DialogActions>
      </Dialog>
    </StyledAppBar>
  );
};

export default Navbar;
