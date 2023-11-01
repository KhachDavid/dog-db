import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDogs,
  selectMatchedDog,
  selectLocationDetails,
} from "../../store/sagas/selectors";
import { fetchDogsRequest } from "../../store/actions/dog.actions";
import { fetchLocationsRequest } from "../../store/actions/location.actions";
import { Grid } from "@mui/material";
import "./styles.scss";
import LazyCustomCard from "../../components/CustomCard";
import Confetti from "react-dom-confetti";

const MatchPage: React.FC = () => {
  const matchedDogID = useSelector(selectMatchedDog);
  const dogs = useSelector(selectDogs);
  const locationDetails = useSelector(selectLocationDetails);
  const dispatch = useDispatch();
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    dispatch(fetchDogsRequest(matchedDogID));
  }, [matchedDogID]);

  useEffect(() => {
    dispatch(fetchLocationsRequest(dogs.map((dog) => dog.zip_code)));
  }, [dogs, dispatch]);

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 150,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#FFD700", "#FFA500", "#FF4500", "#FF69B4", "#9370DB"],
  };

  // Set confettiActive to true when LazyCustomCard is loaded
  useEffect(() => {
    setConfettiActive(true);
  }, []);

  // Turn off confetti after 3 seconds
  useEffect(() => {
    if (confettiActive) {
      const timer = setTimeout(() => {
        setConfettiActive(false);
      }, 3000); // Turn off after 3 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [confettiActive]);

  return (
    <div className="match-page-container">
      <h1 className="match-page-title">We found your match!</h1>
      <div className="grid-container">
        {dogs.map((dog, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <LazyCustomCard
              dog={dog}
              index={index}
              locationDetails={locationDetails[index]}
              noFavorite
            />
          </Grid>
        ))}
      </div>
      <Confetti active={confettiActive} config={confettiConfig} />
    </div>
  );
};

export default MatchPage;
