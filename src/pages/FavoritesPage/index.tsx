import React, { useEffect, useState } from "react";
import CardView from "../../components/CardView";
import DogAnimation from "../../components/DogAnimation";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectDogs } from "../../store/sagas/selectors";
import {
  fetchDogsRequest,
  matchDogsRequest,
} from "../../store/actions/dog.actions";
import { Typography } from "@mui/material";
import CustomButton from "../../components/CustomButton";

const FavoritesPage: React.FC = () => {
  const dogID = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const dogList = useSelector(selectDogs);

  useEffect(() => {
    // Dispatch the action when the component first loads
    dispatch(fetchDogsRequest(dogID));
  }, []);

  useEffect(() => {
    dispatch(fetchDogsRequest(dogID));
  }, [dispatch, dogID]);

  return (
    <div className="dog-view-container">
      <div className="filter-container">
        <div className="left-side">
          <CustomButton
            label="Find me a Match!"
            onClick={() => dispatch(matchDogsRequest())}
            solidBorder
          />
        </div>
      </div>
      <div className="content-container">
        {dogList.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <DogAnimation />
            <Typography variant="h4">No Favorites</Typography>
          </div>
        ) : (
          <>
            <CardView dogs={dogList} />
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
