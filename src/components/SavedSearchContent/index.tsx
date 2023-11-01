import React from "react";
import { Link } from "react-router-dom";
import {
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CustomButton from "../CustomButton";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the trash icon
import { useDispatch } from "react-redux";
import { setSelectedBreeds } from "../../store/actions/dog.actions";
import { setLocations } from "../../store/actions/location.actions";
import { setTagStack } from "../../store/actions/filter.actions";
import _ from "lodash";

interface SearchItem {
  id: number;
  breeds: string[];
  cities: string[];
  states: string[];
  cityStates: string[];
  additionalLocations: number[];
  tagStack: string[];
}

interface SavedSearchContentProps {
  savedSearches: Record<string, SearchItem>;
  onRemoveSearch: (id: number) => void;
  closeModal: () => void;
}

const SavedSearchContent: React.FC<SavedSearchContentProps> = ({
  savedSearches,
  onRemoveSearch,
  closeModal,
}) => {
  const dispatch = useDispatch();
  return (
    <DialogContent style={{ maxHeight: "400px", overflow: "auto" }}>
      {Object.keys(savedSearches).length === 0 ? (
        <Typography>No saved searches yet</Typography>
      ) : (
        <List>
          {Object.values(savedSearches).map((search, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "10px",
              }}
            >
              <ListItem>
                <ListItemText>
                  <strong>
                    Search Date: {new Date(search.id).toLocaleString()}
                  </strong>
                  <div>
                    <span>Breeds: </span>
                    {search.breeds.length > 0 ? (
                      <span>{search.breeds.join(", ")}</span>
                    ) : (
                      <span>No Breed Data</span>
                    )}
                  </div>
                  <div>
                    <span>Cities: </span>
                    {search.cities.length > 0 ? (
                      <span>{search.cities.join(", ")}</span>
                    ) : (
                      <span>No City Data</span>
                    )}
                  </div>
                  <div>
                    <span>States: </span>
                    {search.states.length > 0 ? (
                      <span>{search.states.join(", ")}</span>
                    ) : (
                      <span>No State Data</span>
                    )}
                  </div>
                </ListItemText>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <CustomButton
                    onClick={() => handleSearchAgain(search)}
                    label="Search Again"
                    style={{ marginTop: "10px" }}
                    solidBorder
                  />
                  <IconButton onClick={() => onRemoveSearch(search.id)} component={Link} to="/">
                    <DeleteIcon />{" "}
                  </IconButton>
                </div>
              </ListItem>
            </div>
          ))}
        </List>
      )}
    </DialogContent>
  );

  function handleSearchAgain(search: SearchItem) {
    const newSearch = _.cloneDeep(search);

    dispatch(setSelectedBreeds(newSearch.breeds));
    dispatch(
      setLocations(
        newSearch.cities,
        newSearch.states,
        newSearch.cityStates,
        newSearch.additionalLocations
      )
    );
    closeModal();
    
    // in case tag stack was not tracked
    if (newSearch.tagStack.length === 0 && (
        newSearch.cities.length > 0 ||
        newSearch.states.length > 0 ||
        newSearch.breeds.length > 0
    )) {
        newSearch.tagStack = newSearch.cities.concat(newSearch.states, newSearch.breeds)
    }

    dispatch(setTagStack(newSearch.tagStack));
  }
};

export default SavedSearchContent;
