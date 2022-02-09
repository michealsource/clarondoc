import React from 'react';
import Select from 'react-select';
import './Multi.css'
const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white"}),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "black",
        color: "#FFF",
        cursor: "pointer"
      };
    }
  };
function HomeCareMultiSelect(props) {
  const { testnames, handleChange} = props
  return (
    <div>
        <Select
        styles={colourStyles}
        isMulti
        onChange={handleChange}
        options={testnames}
      />
    </div>
  )
 
}

export default HomeCareMultiSelect;
