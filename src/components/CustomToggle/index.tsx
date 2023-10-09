import React from "react";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { TableChart, ViewModule } from "@mui/icons-material";

interface CustomToggleProps {
  viewType: "table" | "card";
  onToggle: (viewType: "table" | "card") => void;
}

const CustomToggle: React.FC<CustomToggleProps> = ({ viewType, onToggle }) => {
  const handleChange = (_, newViewType) => {
    if (newViewType !== null) {
      onToggle(newViewType);
    }
  };

  return (
    <Box display="flex" alignItems="center" mb={2} paddingTop='1rem'>
      <ToggleButtonGroup
        value={viewType}
        exclusive
        onChange={handleChange}
        aria-label="view type"
      >
        <ToggleButton value="card" aria-label="cards">
          <ViewModule />
        </ToggleButton>
        <ToggleButton value="table" aria-label="table">
          <TableChart />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default CustomToggle;
