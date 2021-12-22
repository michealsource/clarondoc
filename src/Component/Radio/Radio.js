import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
  return (
    <FormControl component="fieldset">
        <div style={{display:'flex', alignItems:'center'}}>
      <FormLabel component="legend" style={{fontWeight:'bold',paddingRight:10}}>Login as: </FormLabel>
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="male" control={<Radio />} label="Doctor" />
        <FormControlLabel value="other" control={<Radio />} label="Patient" />
      </RadioGroup>
      </div>
    </FormControl>
  );
}