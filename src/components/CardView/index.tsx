import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocationDetails,
  isLoadingNewLocation,
  isLoadingDogs,
} from "../../store/sagas/selectors";
import { Grid, CircularProgress } from "@mui/material";
import { fetchLocationsRequest } from "../../store/actions/location.actions";
import "./styles.scss";
import DogAnimation from "../DogAnimation";

const LazyCustomCard = React.lazy(() => import("../CustomCard"));

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
};

interface CardViewProps {
  dogs: {
    img: string;
    name: string;
    age: number;
    id: string;
    zip_code: string;
    breed: string;
  }[];
}

const CardView: React.FC<CardViewProps> = ({ dogs }) => {
  const dispatch = useDispatch();
  const locationDetails = useSelector(selectLocationDetails);
  const isLoading = useSelector(isLoadingNewLocation);
  const isLoadingDoggies = useSelector(isLoadingDogs);

  useEffect(() => {
    dispatch(fetchLocationsRequest(dogs.map((dog) => dog.zip_code)));
  }, [dogs, dispatch]);

  return (
    <Suspense fallback={<CircularProgress />}>
      {(isLoading || isLoadingDoggies) ? (
        <div style={centerStyle} data-testid="loading-spinner">
          <DogAnimation />
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          {dogs.map((dog, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <LazyCustomCard
                dog={dog}
                index={index}
                locationDetails={locationDetails[index]}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Suspense>
  );
};

export default CardView;
