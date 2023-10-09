import React, { useState, useRef, useEffect, Suspense } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import defaultImage from "./default-image.jpeg";
import "./styles.scss"; // Import CSS for custom styles

interface CustomCardProps {
  dog: {
    img: string;
    name: string;
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
}

const CustomCard: React.FC<CustomCardProps> = ({
  dog,
  index,
  locationDetails,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const modalRef = useRef(null);

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
    </div>
  );
};

export default CustomCard;
