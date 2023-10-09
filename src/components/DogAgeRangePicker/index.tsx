import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { theme } from "../../styles/_styles.scss";

function DogAgeRangePicker({setMinAge, setMaxAge}) {
  const [ageRange, setAgeRange] = useState([0, 20]);

  const handleSliderChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  useEffect(() => {
    setMinAge(ageRange[0]);
    setMaxAge(ageRange[1])
  }, [ageRange, setMinAge, setMaxAge]);

  return (
    <div style={{ padding: '16px', minWidth: '300px' }}>
      <Typography id="range-slider" gutterBottom>
        Dog Age Range
      </Typography>
      <Slider
        value={ageRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={20}
        style={{ color: theme }}
      />
      <Typography>
        Minimum Age: {ageRange[0]} years
      </Typography>
      <Typography>
        Maximum Age: {ageRange[1]} years
      </Typography>
    </div>
  );
}

export default DogAgeRangePicker;
