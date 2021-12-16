import React,{useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ScheduleAppointment({name,changeInput}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const names = [
    'My rectum hurts',
    'I cant breathe normally',
    'i feel nauseated',
    'I cant stop passing watery bowel actions',
    'My chronic pain hurts',
    'I feel thirsty',
    'I feel fever',
    'I feel short of breath',
    'I cant stop losing hearing',
    'I cant losing hearing',
    'I feel weak',
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 250 }}>
      <p style={{paddingBottom:20, paddingTop:20}}>Add Symptoms</p>
     
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
          <MenuItem onClick={()=>changeInput()}>Others</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
