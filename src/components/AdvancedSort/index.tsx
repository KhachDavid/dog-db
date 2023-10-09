import React from "react";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import {
  ArrowDownward,
  ArrowUpward,
  LocationOn,
  SortByAlpha,
  Pets,
  HelpOutline,
} from "@mui/icons-material";
import { theme } from "../../styles/_styles.scss";
import { TextFieldSX } from "../CustomTextField/style";
import "./styles.scss";

export default function AdvancedSort({ selectedSort, changeSelectedSort }) {
  const dropdownStyle = {
    borderColor: theme, // Use the primary color from the theme
    "&:hover": {
      backgroundColor: theme, // Change hover color if needed
      borderColor: theme,
    },
    "&:active": {
      borderColor: theme,
    },
  };

  const handleChange = (event) => {
    // Handle the selected option here
    const newValue = event.target.value;
    if (newValue !== "") {
      changeSelectedSort(newValue);
    }
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        sx={TextFieldSX(false)}
        style={{ width: "300px" }}
      >
        <InputLabel htmlFor="custom-dropdown">Sort By</InputLabel>
        <Select
          style={dropdownStyle}
          label="Sort By"
          onChange={handleChange}
          inputProps={{
            name: "custom-dropdown",
            id: "custom-dropdown",
          }}
          value={selectedSort}
        >
          <MenuItem
            sx={{ display: "flex", alignItems: "center" }}
            value="breed:asc"
          >
            <div className="left-side">
              <Pets /> Breed: A to Z
            </div>
          </MenuItem>
          <MenuItem
            sx={{ display: "flex", alignItems: "center" }}
            value="name:asc"
          >
            <div className="left-side">
              <SortByAlpha /> Name: A to Z
            </div>
          </MenuItem>
          <MenuItem
            sx={{ display: "flex", alignItems: "center" }}
            value="age:asc"
          >
            <div className="left-side">
              <ArrowUpward /> Age: Low to High
            </div>
          </MenuItem>
          <MenuItem
            sx={{ display: "flex", alignItems: "center" }}
            value="age:desc"
          >
            <div className="left-side">
              <ArrowDownward /> Age: High to Low
            </div>
          </MenuItem>
          <MenuItem
            sx={{ display: "flex", alignItems: "center" }}
            value="useMap"
          >
            <div className="left-side">
              <LocationOn /> Closest to Me
            </div>
            {selectedSort !== "useMap" && (
              <div className="right-side">
                <Tooltip title="Location Access Required">
                  <IconButton
                    size="small"
                    aria-label="Location Access Required"
                  >
                    <HelpOutline />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
