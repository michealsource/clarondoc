import React,{useState,useEffect} from 'react';
import Select from 'react-select';
// import { getSymptoms } from '../../Api/homecare';
import { getLabTests } from '../../Api/lab';
let testnames = []



const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white"}),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "#fff",
        color: "black",
        cursor: "pointer"
      };
    }
  };
function Lab(props) {
  const [user, setuser] = useState()
    const [selectedvalue,setSelectedValue]= useState([])
    const [total,setTotal]=useState(0)
   const handleChange = (e) => {
    setTotal(calculateTotal(e))
    // console.log(e)
    setSelectedValue (Array.isArray(e)?e.map(x=>x.label):[])
 }

 const calculateTotal = (data)=>{
    const totalTest =[]
    data.map(p => {
      const singleTest = p.label.split('GHS')[1]
     return  totalTest.push(Number(singleTest))
    })
    // return totalTest
    const total = totalTest.reduce((v,t)=> v+t)
    props.getTests(data, total)
    return total
  }

 useEffect(() => {
    (async()=>{
        try{
            let account = localStorage.getItem('user')
            setuser(JSON.parse(account))
            let data = await getLabTests()
            data.map(s=>{
                testnames.push({value:s.name, label:`${s.name} GHS${s.charges}`})
            })
        }catch(e){
            alert('Error', e.message)
        }
    })()
    
}, [])
// console.log(selectedvalue)
  return (
    <div>
        <p>{total}</p>
        <Select
        styles={colourStyles}
        isMulti
        onChange={handleChange}
        options={testnames}
      />
    </div>
  )
 
}

export default Lab;
