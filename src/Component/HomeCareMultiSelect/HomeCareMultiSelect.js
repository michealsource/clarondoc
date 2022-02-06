import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import './Multi.css'
import { getSymptoms } from '../../Api/homecare';
let testnames = []

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
function HomeCareMultiSelect() {
    const [selectedvalue,setSelectedValue]= useState()
    const [user, setuser] = useState()
   const handleChange = (e) => {
    setSelectedValue (Array.isArray(e)?e.map(x=>x.label):[])
 }
 useEffect(() => {
    (async()=>{
        try{
            let account = localStorage.getItem('user')
            setuser(JSON.parse(account))
            let data = await getSymptoms()
            data.map(s=>{
                testnames.push({value:s.id, label:s.body})
            })
        }catch(e){
            alert('Error', e.message)
        }
    })()
}, [])
console.log(selectedvalue)
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
