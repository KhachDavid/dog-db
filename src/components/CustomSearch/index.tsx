import React, { useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { theme, error, errorColor } from "../../styles/_styles.scss";
import {
  USstates,
  cityAutocompleteLimit,
  mapStatesToAbbr,
  stateFullNames,
} from "../../constants/location.constants";
import {
  getAutocompleteCities,
  removeAutocompleteCities,
  resetAllLocations,
  searchLocationsRequest,
} from "../../store/actions/location.actions";
import {
  selectStateCities,
  selectCityStates,
  selectAdditionalLocations,
  selectTagStack,
} from "../../store/sagas/selectors";
import {
  activateSnackbar,
  addSavedSearch,
} from "../../store/actions/settings.actions";
import { setTagStack } from "../../store/actions/filter.actions";

interface AutocompleteSearchProps {
  dogBreeds: string[];
  selectedBreeds: string[];
  selectedStates: string[];
  selectedCities: string[];
  onBreedChange: (arg0: string[], arg1: "add" | "remove") => void;
  onStatesChange: (arg0: string[], arg1: "add" | "remove") => void;
  onCityChange: (arg0: string[], arg1: "add" | "remove") => void;
}

/**
 * Customized MUI autocomplete search
 * This component adds 3 types of options to the search
 * Breed | City | State
 * Upon the selection of one component, it is being added as a tag
*/
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
  const selectedCityStates = useSelector(selectCityStates);
  const additionalLocations = useSelector(selectAdditionalLocations);
  const tagStack = useSelector(selectTagStack);

  const handleTagSelection = (event, newValue) => {
    // don't let the user select tags with the keyboard
    // to avoid rapid api calls
    if (event?.key === "Backspace") {
      // manually remove if backspace was hit
      const newTagStack = tagStack.shift();
      handleTagRemoved(newTagStack);
      dispatch(setTagStack(tagStack));
      return;
    } else if (
      event.target.classList &&
      event?.target?.classList?.contains("reset-search")
    ) {
      dispatch(resetAllLocations());
      return;
    }

    let newVal = newValue[newValue.length - 1];
    if (dogBreeds.includes(newVal)) {
      onBreedChange(newVal, "add");
    } else if (USstates.some((x) => x.toLowerCase() === newVal.toLowerCase())) {
      if (selectedStates.length === 5) {
        dispatch(
          activateSnackbar(
            "Cannot add more than 5 states at once",
            "left",
            "top"
          )
        );
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

      newVal = newVal.split(",")[0];
    }
    const newTagStack = [newVal, ...tagStack];
    dispatch(setTagStack(newTagStack));
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

    const removedTagIndex = tagStack.indexOf(removedTag);

    if (removedTagIndex !== -1) {
      // If the removed tag is found in tagStack, remove it
      tagStack.splice(removedTagIndex, 1);

      // Dispatch the updated tagStack array
      dispatch(setTagStack(tagStack));
    }
  };

  const handleInputChange = (event, newInputValue) => {
    if (event !== null) {
      const updatedOptions = Array.isArray(options) ? options.filter((option) =>
        option.toLowerCase().includes(newInputValue.toLowerCase())
      ) : [];

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

  const options = [
    ...(Array.isArray(dogBreeds) ? dogBreeds : []),
    ...(Array.isArray(stateFullNames) ? stateFullNames : []),
    ...(Array.isArray(stateCities) ? stateCities : []),
  ];

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

  const handleSave = () => {
    dispatch(
      addSavedSearch(
        selectedBreeds,
        selectedCities,
        selectedStates,
        selectedCityStates,
        additionalLocations,
        tagStack
      )
    );
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box mt={2}></Box>
      <Autocomplete
        clearOnBlur={false} // Prevent Autocomplete from clearing input on blur
        multiple
        classes={{
          clearIndicator: "reset-search",
        }}
        id="tags-search"
        options={options}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option) => option}
        onChange={handleTagSelection}
        value={tagStack}
        sx={{
          width: "100%",
          ".MuiInputBase-root": {
            padding: "9px !important",
          },
          "& .MuiOutlinedInput-root": {
            // normal state
            "& fieldset": {
              borderColor: error ? errorColor : theme,
            },
            // hover state
            "&:hover fieldset": {
              borderColor: error ? errorColor : theme,
            },
            // focused state
            "&.Mui-focused fieldset": {
              borderColor: error ? errorColor : theme,
            },
          },
        }}
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
          <div>
            <TextField
              {...params}
              variant="outlined"
              label="Search"
              placeholder="Breeds, State, City"
              style={{ width: "300px" }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {(selectedBreeds.length > 0 ||
                      selectedStates.length > 0 ||
                      selectedCities.length > 0) && (
                      <div style={{ position: "relative" }}>
                        <Tooltip placement="top" title="Save Current Search">
                          <IconButton onClick={() => handleSave()}>
                            <BookmarkAddIcon
                              style={{
                                borderTopLeftRadius: "4px",
                                borderBottomLeftRadius: "4px",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </>
                ),
              }}
            />
          </div>
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
    </Box>
  );
};

export default AutocompleteSearch;
