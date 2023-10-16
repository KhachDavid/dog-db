import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { TextFieldSX } from "../CustomTextField/style";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  USstates,
  cityAutocompleteLimit,
  mapStatesToAbbr,
  stateFullNames,
} from "../../constants/location.constants";
import { getAutocompleteCities, removeAutocompleteCities } from "../../store/actions/location.actions";
import { selectStateCities } from "../../store/sagas/selectors";

interface AutocompleteSearchProps {
  dogBreeds: string[];
  selectedBreeds: string[];
  selectedStates: string[];
  selectedCities: string[];
  onBreedChange: (arg0: string[], arg1: "add" | "remove") => void;
  onStatesChange: (arg0: string[], arg1: "add" | "remove") => void;
  onCityChange: (arg0: string[], arg1: "add" | "remove") => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  dogBreeds,
  selectedBreeds,
  selectedStates,
  selectedCities,
  onBreedChange,
  onStatesChange,
  onCityChange,
}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const stateCities = useSelector(selectStateCities);

  const handleTagSelection = (event, newValue) => {
    // don't let the user select tags with the keyboard
    // to avoid rapid api calls
    if (event?.key === "Backspace") {
      return;
    }

    const newVal = newValue[newValue.length - 1];
    if (dogBreeds.includes(newVal)) {
      onBreedChange(newVal, "add");
    } else if (USstates.some((x) => x.toLowerCase() === newVal.toLowerCase())) {
      dispatch(
        getAutocompleteCities({ states: [mapStatesToAbbr(newVal)], size: cityAutocompleteLimit })
      );
      onStatesChange(newVal, "add");
    } else if (/[a-zA-Z]/.test(newVal)) {
      onCityChange(newVal, "add");
    }
  };

  const handleTagRemoved = (removedTag) => {
    if (selectedBreeds.includes(removedTag)) {
      // If a selected tag is removed, update selectedTags
      onBreedChange(removedTag, "remove");
    } else if (selectedCities.includes(removedTag)) {
      // If a location tag is removed, update locationTags
      onCityChange(removedTag, "remove");
    } else if (
      selectedStates.some((x) => x.toLowerCase() === removedTag.toLowerCase())
    ) {
      dispatch(
        removeAutocompleteCities(removedTag)
      );
      onStatesChange(removedTag, "remove");
    }
  };

  const handleInputChange = (event, newInputValue) => {
    if (event !== null) {
      setInputValue(newInputValue);
    }
  };

  const options = [...stateCities,  ...stateFullNames, ...dogBreeds ];
  const isOptionEqualToValue = (option, value) => {
    if (selectedBreeds.includes(option)) {
      return true;
    }
    return option === value;
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box mt={2}></Box>
      <Tooltip title="Select states to see cities" placement="right">
      <Autocomplete
        clearOnBlur={false} // Prevent Autocomplete from clearing input on blur
        multiple
        id="tags-search"
        options={options}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option) => option}
        onChange={handleTagSelection}
        value={selectedBreeds.concat(
          selectedCities,
          selectedStates,
        )}
        renderTags={(value, getTagProps) => {
          const numTags = value.length;
          const limitTags = 3;
          const shrunkValues = value.slice(limitTags, value.length);

          return (
            <Tooltip
              title={shrunkValues.toString()}
              placement="top"
              className="custom-tooltip"
            >
              <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                maxWidth="100%"
              >
                {value.slice(0, limitTags).map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={index}
                    label={option}
                    onDelete={() => handleTagRemoved(option)} // Call handleTagRemoved on delete
                  />
                ))}

                {numTags > limitTags && ` +${numTags - limitTags}`}
              </Box>
            </Tooltip>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search"
            placeholder="Breeds, State, City"
            sx={TextFieldSX(false)} // never in error
            style={{ width: "300px" }}
          />
        )}
        renderOption={(props, option) => {
          const belongsToDogBreeds = dogBreeds.includes(option);
          const belongsToStateFullNames = stateFullNames.includes(option);
          const belongsToStateCities = stateCities.includes(option);

          const tagColor = belongsToDogBreeds
            ? "green"
            : belongsToStateFullNames
            ? "blue"
            : belongsToStateCities
            ? "red"
            : "black"; // Default color if it doesn't belong to any array

          return (
            <li {...props}>
              <ListItemButton>
                <ListItemText primary={option} />
                <span
                  style={{
                    backgroundColor: tagColor,
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    marginLeft: "10px",
                  }}
                >
                  {belongsToDogBreeds
                    ? "Dog"
                    : belongsToStateFullNames
                    ? "State"
                    : belongsToStateCities
                    ? "City"
                    : "Other"}{" "}
                  {/* Tag text based on the array */}
                </span>
              </ListItemButton>
            </li>
          );
        }}
        disableClearable
      />
      </Tooltip>
    </Box>
  );
};

export default AutocompleteSearch;
