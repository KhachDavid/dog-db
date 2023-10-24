// reducer.js
import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
  SEARCH_LOCATIONS_REQUEST,
  SEARCH_LOCATIONS_SUCCESS,
  SEARCH_LOCATIONS_FAILURE,
  RESET_ADDITIONAL_LOCATIONS,
  GET_AUTOCOMPLETE_CITIES_SUCCESS,
  REMOVE_AUTOCOMPLETE_CITIES_SUCCESS,
  RESET_ALL_LOCATIONS,
  ADD_CITY,
  ADD_STATE,
  REMOVE_CITY,
  REMOVE_STATE,
  CACHE_STATE_LOCATIONS,
} from "../actions/location.actions";
import { mapStatesToAbbr } from "../../constants/location.constants";

const initialState = {
  locations: [],
  loading: false,
  error: null,
  additionalLocations: [],
  stateCities: [],
  selectedCities: [],
  selectedCityStates: [], // same order as selectedCities - keeps track of states of selectedCities
  selectedStates: [],
  // cached state locations
  cachedStateLocations: {},
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATE:
      return {
        ...state,
        selectedStates: [...state.selectedStates, action.payload],
      };
    case REMOVE_STATE:
      try {
        const { selectedStates, selectedCities, selectedCityStates } = state;
        const removedState = action.payload;
        const stateAbbreviation = mapStatesToAbbr(removedState); // Assuming stateToAbbr is a function that converts state names to abbreviations

        // Find the indices of cities to be removed based on the stateAbbreviation
        const indicesToRemove = [];
        for (let i = 0; i < selectedCityStates.length; i++) {
          if (selectedCityStates[i] === stateAbbreviation) {
            indicesToRemove.push(i);
          }
        }

        // Remove the state from selectedStates
        const updatedSelectedStates = selectedStates.filter(
          (stateItem) => stateItem !== removedState
        );

        // Remove the corresponding cities and states from selectedCities and selectedCityStates
        const updatedSelectedCities = selectedCities.filter(
          (_, index) => !indicesToRemove.includes(index)
        );
        const updatedSelectedCityStates = selectedCityStates.filter(
          (_, index) => !indicesToRemove.includes(index)
        );

        // Define a function to filter the location objects
        const filteredAdditionalLocations = state.additionalLocations.filter(
          (location) => location.state !== stateAbbreviation
        );
        // Now you have the filtered additionalLocations

        return {
          ...state,
          selectedStates: updatedSelectedStates,
          selectedCities: updatedSelectedCities,
          selectedCityStates: updatedSelectedCityStates,
          additionalLocations: filteredAdditionalLocations,
        };
      } catch (error) {
        return state;
      }

    case ADD_CITY:
      return {
        ...state,
        selectedCities: [...state.selectedCities, action.payload.city],
        selectedCityStates: [...state.selectedCityStates, action.payload.state],
      };

    case REMOVE_CITY:
      try {
        const cityIndex = state.selectedCities.findIndex(
          (cityItem) => cityItem === action.payload
        );

        if (cityIndex !== -1) {
          // Remove the city from selectedCities
          const updatedSelectedCities = [
            ...state.selectedCities.slice(0, cityIndex),
            ...state.selectedCities.slice(cityIndex + 1),
          ];

          const stateForThisCity = state.selectedCityStates[cityIndex];

          // Remove the corresponding item from selectedCityStates
          const updatedSelectedCityStates = [
            ...state.selectedCityStates.slice(0, cityIndex),
            ...state.selectedCityStates.slice(cityIndex + 1),
          ];

          // filter additional locations
          let filteredAdditionalLocations = state.additionalLocations.filter(
            (location) => location.city !== action.payload
          );

          // handle special case here when this was the last city of this state to be removed
          if (!updatedSelectedCityStates.includes(stateForThisCity) && state.cachedStateLocations[stateForThisCity]) {
            filteredAdditionalLocations = [
              ...filteredAdditionalLocations,
              ...state.cachedStateLocations[stateForThisCity],
            ];
          }

          return {
            ...state,
            selectedCities: updatedSelectedCities,
            selectedCityStates: updatedSelectedCityStates,
            additionalLocations: filteredAdditionalLocations,
          };
        } else {
          // City not found, return the state as is
          return state;
        }
      } catch (error) {
        return state;
      }

    case FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload,
      };
    case FETCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        additionalLocations: action.payload,
      };
    case SEARCH_LOCATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_ADDITIONAL_LOCATIONS:
      return {
        ...state,
        additionalLocations: action.payload,
      };
    case GET_AUTOCOMPLETE_CITIES_SUCCESS:
      return {
        ...state,
        stateCities: action.payload,
      };
    case REMOVE_AUTOCOMPLETE_CITIES_SUCCESS:
      return {
        ...state,
        stateCities: action.payload,
      };

    case RESET_ALL_LOCATIONS:
      return {
        ...state,
        additionalLocations: [],
        stateCities: [],
        selectedCities: [],
        selectedCityStates: [],
        selectedStates: [],
      };
    case CACHE_STATE_LOCATIONS:
      const thisState = action.payload.state;
      return {
        ...state,
        cachedStateLocations: {
          ...state.cachedStateLocations,
          [thisState]: action.payload.locations,
        },
      };

    default:
      return state;
  }
};

export default locationsReducer;
