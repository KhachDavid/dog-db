import React, { useState, useRef, useEffect, Suspense } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import defaultImage from "./default-image.jpeg";
import FavoriteFilled from "@mui/icons-material/Favorite";
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../store/sagas/selectors";
import {
  addFavoritesRequest,
  removeFavoritesSuccess,
} from "../../store/actions/dog.actions";
import CustomButton from "../CustomButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface CustomCardProps {
  dog: {
    img: string;
    name: string;
    id: string;
    age: number;
    zip_code: string;
    breed: string;
  };
  index: number;
  locationDetails: {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
  };
  noFavorite?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  dog,
  index,
  locationDetails,
  noFavorite,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const favorites = useSelector(selectFavorites);
  const modalRef = useRef(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [dogToRemove, setDogToRemove] = useState(null);

  const handleOpenRemoveDialog = (dog) => {
    setDogToRemove(dog);
    setIsRemoveDialogOpen(true);
  };

  const handleCloseRemoveDialog = () => {
    setDogToRemove(null);
    setIsRemoveDialogOpen(false);
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        modalRef.current.innerHTML === event.target.innerHTML
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Check if the current dogId is in the favorites array
  const isFavorite = favorites ? favorites.includes(dog.id) : false;
  const dispatch = useDispatch();

  return (
    <div>
      <Card
        className={`custom-card ${isHovered ? "hovered" : ""}`}
        onClick={handleCardClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          tabIndex={index}
          role="image"
          aria-label={dog.name}
          component="img"
          alt={dog.name}
          height="200"
          image={dog.img || defaultImage}
          className={`card-media ${isModalOpen ? "expanded" : ""}`}
          loading="lazy"
        />
        <CardContent>
          <Typography variant="h6">{dog.name}</Typography>
          <Typography variant="body2">Breed: {dog.breed}</Typography>
          <Typography variant="body2">Age: {dog.age}</Typography>
          {locationDetails?.city && locationDetails?.state ? (
            <Suspense fallback={<></>}>
              <Typography variant="body2">
                Location: {locationDetails?.city}, {locationDetails?.state}
              </Typography>
            </Suspense>
          ) : (
            <Typography variant="body2">Location: Unavailable</Typography>
          )}
          <Typography variant="body2">Zip Code: {dog.zip_code}</Typography>
          {
            /* Heart icon */
            !noFavorite ? (
              <Tooltip
                title={
                  isFavorite ? "Remove from Favorites" : "Add to Favorites"
                }
                placement="top"
              >
                <IconButton
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event from propagating
                    isFavorite
                      ? handleOpenRemoveDialog(dog)
                      : dispatch(addFavoritesRequest(dog.id));
                  }}
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    color: isFavorite ? "red" : "inherit", // Set color to red if it's a favorite
                  }}
                >
                  {isFavorite ? <FavoriteFilled/> : <FavoriteIcon/>}
                </IconButton>
              </Tooltip>
            ) : null
          }
        </CardContent>
      </Card>
      {isModalOpen && (
        <div className="modal-dog" ref={modalRef}>
          <img
            src={dog.img || defaultImage}
            alt={dog.name}
            className="modal-dog-image"
            loading="lazy"
          />
        </div>
      )}
      <Dialog open={isRemoveDialogOpen} onClose={handleCloseRemoveDialog}>
        <DialogTitle>Remove from Favorites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {dog && dog.name} from your
            favorites?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={handleCloseRemoveDialog}
            color="primary"
            label="Cancel"
          />
          <CustomButton
            color="primary"
            onClick={() => {
              dispatch(removeFavoritesSuccess(dog.id));
              handleCloseRemoveDialog();
            }}
            label="Remove"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomCard;
