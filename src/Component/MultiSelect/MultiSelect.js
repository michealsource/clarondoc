import {useState,useEffect}from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
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


export default function MultiSelect({filterednames, getTest}) {
  const theme = useTheme();
  const [testName, setTestName] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [total, setTotal] = useState(0);
  const [names,setNames]= useState(filterednames)

  
  const handleChange = (event) => {
    console.log(event)
    const {
      target: { value },
    } = event;
    setTestName(value)
    getTest(savedData, total)
    setTotal(calculateTotal(value))
  };



  const calculateTotal = (data)=>{
    const totalTest =[]
    data.map(p => {
      const singleTest = p.split('GHS')[1]
     return  totalTest.push(Number(singleTest))
    })
    return totalTest.reduce((v,t)=> v+t) 
  }


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={testName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              { setSavedData(selected)}
              {
              selected.map((value) => (
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
              style={getStyles(name, testName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
