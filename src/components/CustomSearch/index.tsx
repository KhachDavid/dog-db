import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { TextFieldSX } from "../CustomTextField/style";
import CustomSnackbar from "../CustomSnackbar";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  USstates,
  cityAutocompleteLimit,
  mapStatesToAbbr,
  stateFullNames,
} from "../../constants/location.constants";
import {
  getAutocompleteCities,
  removeAutocompleteCities,
  searchLocationsRequest,
} from "../../store/actions/location.actions";
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

const tagStack = [];

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

  // Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleTagSelection = (event, newValue) => {
    // don't let the user select tags with the keyboard
    // to avoid rapid api calls
    if (event?.key === "Backspace") {
      alert("Back")
      return;
    }

    const newVal = newValue[newValue.length - 1];
    if (dogBreeds.includes(newVal)) {
      onBreedChange(newVal, "add");
    } else if (USstates.some((x) => x.toLowerCase() === newVal.toLowerCase())) {
      if (selectedStates.length === 5) {
        setMessage("Cannot select more than 5 states");
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          setMessage("");
        }, 5000);
        return;
      }
      dispatch(
        getAutocompleteCities({
          states: [mapStatesToAbbr(newVal)],
          size: cityAutocompleteLimit,
        })
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
      dispatch(removeAutocompleteCities(removedTag));
      onStatesChange(removedTag, "remove");
    }
  };

  const handleInputChange = (event, newInputValue) => {
    if (event !== null) {
      const updatedOptions = options.filter((option) =>
        option.toLowerCase().includes(newInputValue.toLowerCase())
      );

      // if we have less than 5 options start searching the input as a city
      if (updatedOptions.length < 5) {
        dispatch(
          searchLocationsRequest({
            city: newInputValue,
          })
        );
      }

      setInputValue(newInputValue);
    }
  };

  const value = selectedBreeds.concat(selectedCities, selectedStates);
  const options = [...dogBreeds, ...stateCities, ...stateFullNames];

  const renderNoOptions = () => {
    if (inputValue.length === 0) {
      // Do something when the input is empty
      return "Start typing to see options";
    } else {
      return "Looking for more options...";
    }
  };

  const isOptionEqualToValue = (option, value) => {
    if (
      selectedBreeds.includes(option) ||
      selectedStates.includes(option) ||
      selectedCities.includes(option)
    ) {
      return true;
    }
    return option === value;
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box mt={2}></Box>
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
        value={value}
        renderTags={(value, getTagProps) => {
          const numTags = value.length;
          const limitTags = 5;
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
        noOptionsText={renderNoOptions()}
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
        
      />
      <div>
        <CustomSnackbar
          open={open}
          message={message}
          handleClose={() => setOpen(false)}
        />
      </div>
    </Box>
  );
};

export default AutocompleteSearch;
