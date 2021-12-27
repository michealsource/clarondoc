import React,{useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function RowRadioButtonsGroup({value,handleChange}) {
  return (
    <FormControl component="fieldset">
        <div style={{display:'flex', alignItems:'center'}}>
       <FormLabel component="legend" style={{fontWeight:'bold',paddingRight:10}}>Login as: </FormLabel>
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
        aria-label="type"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="Doctor" control={<Radio />} label="Doctor" />
        <FormControlLabel value="Patient" control={<Radio />} label="Patient" />
      </RadioGroup>
      </div>
    </FormControl>
  );
}