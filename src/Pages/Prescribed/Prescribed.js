import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './Prescribed.css'

function Prescribed() {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return (
        <div className="prescribed-container">
            <h2>Prescription Mode</h2>
            <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard"  fullWidth>
        <InputLabel id="demo-simple-select-label">Select how do you want to proceed with the Order</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Buy Drugs</MenuItem>
          <MenuItem value={20}>Consult with Pharmacist</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </div>
    )
}

export default Prescribed
