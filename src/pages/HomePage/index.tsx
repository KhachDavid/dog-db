import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  fetchBreedsRequest,
  fetchDogsRequest,
  manualDogSort,
  searchDogsRequest,
  setDogIds,
  setSelectedBreeds,
} from "../../store/actions/dog.actions";
import {
  selectBreeds,
  selectDogIds,
  selectDogs,
  selectDogCount,
  selectAdditionalLocations,
  selectNextDogs,
  selectPrevDogs,
  selectDogsCached,
  selectStates,
  selectCities,
  selectSelectedBreeds,
} from "../../store/sagas/selectors";
import CustomPagination from "../../components/CustomPagination";
import CustomSearch from "../../components/CustomSearch";
import DogAnimation from "../../components/DogAnimation";
import "./styles.scss";
import CardView from "../../components/CardView";
import { dogBatchCount } from "../../constants/dog.constants";
import AdvancedSort from "../../components/AdvancedSort";
import {
  addCity,
  addState,
  removeState,
  removecity,
  searchLocationsRequest,
} from "../../store/actions/location.actions";
import { INVALID_ZIP_CODE, mapStatesToAbbr } from "../../constants/location.constants";
import { Typography } from "@mui/material";
import { activateSnackbar } from "../../store/actions/settings.actions";

interface HomePageProps {
  currentPage: number,
  setCurrentPage: (newPage: number) => void,
}

/**
 *
 * @returns
 */
const HomePage: React.FC<HomePageProps> = ({currentPage, setCurrentPage}) => {
  const dispatch = useDispatch();
  const dogBreeds = useSelector(selectBreeds);

  const dogID = useSelector(selectDogIds);
  const dogList = useSelector(selectDogs);
  const totalDogCount = useSelector(selectDogCount);
  const additionalLocations = useSelector(selectAdditionalLocations);
  const nextDogs = useSelector(selectNextDogs);
  const prevDogs = useSelector(selectPrevDogs);
  const cachedDogs = useSelector(selectDogsCached);
  const selectedCities = useSelector(selectCities);
  const selectedStates = useSelector(selectStates);
  const selectedBreeds = useSelector(selectSelectedBreeds);

  const [selectedSort, setSelectedSort] = useState<string>("breed:asc");
  const [rerenderKey, setRerenderKey] = useState(0); // Initialize a state variable for triggering a re-render

  // Create refs to store the previous values of dependencies
  const prevSelectedSort = useRef(selectedSort);
  const prevAdditionalLocations = useRef(selectAdditionalLocations);
  const prevSelectedBreeds = useRef(selectedBreeds);

  /**
   *
   */
  useEffect(() => {
    // Dispatch the action when the component first loads
    dispatch(fetchBreedsRequest());
    dispatch(searchDogsRequest({}));
  }, [dispatch]);

  /**
   * This function handles all the dog updates
   * The first condition does manual sort if dogs are already cached
   */
  useEffect(() => {
    // this is because nextDogs is not already cached
    if (selectedSort !== prevSelectedSort.current && cachedDogs) {
      dispatch(manualDogSort(selectedSort));
      setRerenderKey((prevKey) => prevKey + 1);
    } else if (
      !cachedDogs ||
      selectedBreeds.length !== prevSelectedBreeds.current.length ||
      additionalLocations.length !== prevAdditionalLocations.current.length
    ) {

      const extraLocations =
        additionalLocations.length > 0
          ? additionalLocations.map((resultObj) => resultObj.zip_code)
          : [];

      if (additionalLocations.length > 0 && additionalLocations[0] === INVALID_ZIP_CODE) {
        dispatch(activateSnackbar("No Dogs in this area"));
        return;
      }
      
      dispatch(
        searchDogsRequest({
          from: (currentPage - 1) * dogBatchCount,
          breeds: selectedBreeds,
          sort: selectedSort,
          zipCodes: extraLocations,
        })
      );
    }

    if (selectedSort !== prevSelectedSort.current) {
      prevSelectedSort.current = selectedSort;
    }

    if (selectedBreeds.length !== prevSelectedBreeds.current.length) {
      prevSelectedBreeds.current = selectedBreeds;
    }

    if (additionalLocations.length !== prevAdditionalLocations.current.length) {
      prevAdditionalLocations.current = additionalLocations;
    }
  }, [
    currentPage,
    dispatch,
    selectedBreeds,
    selectedSort,
    additionalLocations,
    nextDogs,
    cachedDogs,
  ]);

  /**
   * When ID's are updated, go look for dog details
   */
  useEffect(() => {
    dispatch(fetchDogsRequest(dogID));
  }, [dispatch, dogID]);

  /**
   * Reset dogs when the user adds a new breed in the search
   * @param newBreed
   * @param action
   */
  const handleBreedChange = (newBreed, action) => {
    switch (action) {
      case "add":
        dispatch(setSelectedBreeds([...selectedBreeds, newBreed]));
        break;
      case "remove":
        setCurrentPage(1);
        let newBreeds = selectedBreeds.filter((item) => item !== newBreed);
        dispatch(setSelectedBreeds(newBreeds));
        break;

      default:
        break;
    }
  };

  /**
   * Reset dogs when the user adds a new city in the search
   * @param newCity
   * @param action
   * @returns
   */
  const handleCityChange = (newCity, action) => {
    setCurrentPage(1);

    const cityDetails = newCity.split(",");
    const city = cityDetails[0];
    const state = cityDetails[1]?.replace(/\s+/g, "");
    switch (action) {
      case "add":
        setCurrentPage(1);
        dispatch(addCity(city, state));
        dispatch(
          searchLocationsRequest({
            city: city,
            states: [state],
          })
        );
        break;
      case "remove":
        setCurrentPage(1);
        dispatch(removecity(newCity));
        break;

      default:
        break;
    }
  };

  /**
   * Reset dogs when the user adds a new state in the search
   * @param newState
   * @param action
   */
  const handleStateChange = (newState, action) => {
    const newStateMap = mapStatesToAbbr(newState);
    setCurrentPage(1);
    switch (action) {
      case "add":
        dispatch(addState(newState));
        dispatch(
          searchLocationsRequest({
            states: [newStateMap],
          })
        );
        break;
      case "remove":
        dispatch(removeState(newState));
        setCurrentPage(1);
        break;
      default:
        break;
    }
  };

  /**
   * Either update the page
   * If we have cached dogs
   * Loop over the cached dogs linked list and find the according page
   * @param page is the number of the page to display 
   */
  const handlePageClick = (page) => {
    if (!cachedDogs) {
      setCurrentPage(page);
    } else {
      // check if there is cached data for this page
      let _nextDogs = nextDogs;
      let _prevDogs = prevDogs;
      let prevPage = currentPage;
      let resultIds = dogID;

      // Find the initial data corresponding to currentPage
      if (page > prevPage) {
        const diff = page - prevPage;
        for (let i = 0; i < diff; i++) {
          resultIds = _nextDogs.resultIds;
          _prevDogs = _nextDogs.prev;
          _nextDogs = _nextDogs.next;
        }
      } else if (page < prevPage) {
        const diff = prevPage - page;
        for (let i = 0; i < diff; i++) {
          resultIds = _prevDogs.resultIds;
          _nextDogs = _prevDogs.next;
          _prevDogs = _prevDogs.prev;
        }
      }

      setCurrentPage(page);
      dispatch(setDogIds(resultIds, _nextDogs, _prevDogs));
    }
  };

  return (
    <div className="dog-view-container">
      <div className="filter-container">
        <div className="left-side">
          <CustomSearch
            dogBreeds={dogBreeds}
            onBreedChange={handleBreedChange}
            onCityChange={handleCityChange}
            onStatesChange={handleStateChange}
            selectedBreeds={selectedBreeds}
            selectedCities={selectedCities}
            selectedStates={selectedStates}
          />
        </div>
        <div className="right-side">
          <AdvancedSort
            selectedSort={selectedSort}
            changeSelectedSort={setSelectedSort}
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
            {selectedBreeds.length > 0 ||
            selectedCities.length > 0 ||
            selectedStates.length > 0 ? (
              <Typography variant="h4">No Results</Typography>
            ) : (
              <Typography variant="h4">Loading...</Typography>
            )}
          </div>
        ) : (
          <>
            <CardView dogs={dogList} />
            <div className="pagination-container">
              <CustomPagination
                page={currentPage}
                totalPages={Math.ceil(totalDogCount / dogBatchCount)}
                onChangePage={handlePageClick}
                rowsPerPage={10}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
