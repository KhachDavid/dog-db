import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TextFieldSX } from "../CustomTextField/style";
import { Tooltip } from "@mui/material";
import "./styles.scss";

interface AutocompleteSearchProps {
  dogBreeds: string[];
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  dogBreeds,
  onChange,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelection = (event, newValue) => {
    setSelectedTags(newValue);
  };

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box mt={2}></Box>
      <Autocomplete
        multiple
        id="tags-search"
        options={dogBreeds}
        getOptionLabel={(option) => option}
        onChange={handleTagSelection}
        value={selectedTags}
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
            placeholder="Breeds, Location, ZIP"
            sx={TextFieldSX(false)} // never in error
            style={{ width: "300px" }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <ListItemButton>
              <ListItemText primary={option} />
            </ListItemButton>
          </li>
        )}
      />
    </Box>
  );
};

export default AutocompleteSearch;
