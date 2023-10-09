import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocationDetails } from '../../store/sagas/selectors';
import { Grid } from '@mui/material';
import { fetchLocationsRequest } from '../../store/actions/location.actions';

const LazyCustomCard = React.lazy(() => import('../CustomCard'));


interface CardViewProps {
  dogs: {
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }[];
}

const CardView: React.FC<CardViewProps> = ({ dogs }) => {

  const dispatch = useDispatch();
  const locationDetails = useSelector(selectLocationDetails);

  useEffect(() => {
    dispatch(fetchLocationsRequest(dogs.map(dog => dog.zip_code)));
  }, [dogs, dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Grid container spacing={2}>
          {dogs.map((dog, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <LazyCustomCard dog={dog} index={index} locationDetails={locationDetails[index]}/>
            </Grid>
          ))}
        </Grid>
    </Suspense>
  );
};

export default CardView;
