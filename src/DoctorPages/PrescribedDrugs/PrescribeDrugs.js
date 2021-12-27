import React,{useState} from 'react'
import './PrescribeDrugs.css'
import TextField from '@mui/material/TextField';
import {Patients} from '../LabRequest/Patient'
import doc from '../../images/doc-1.jpg'
import { Link } from "react-router-dom"
import DoctorLayout from '../../Pages/DoctorLayout';

function PrescribeDrugs() {
    const[openModal, setOpenModal]= useState(false)
    const [data, setData]= useState(Patients)
    const [filtered,setFiltered]= useState([]);
    const [searchInput, setSearchInput] = useState("")
    
    const searchPatient =(searchValue)=>{
        setSearchInput(searchValue);
        if(searchInput){
            const filteredPatient = data.filter((person)=>(
                Object.values(person).join("").toLowerCase().includes(searchValue.toLowerCase())
            ))
            setFiltered(filteredPatient)  
        }else{
            setFiltered(data)
        }
    }
    return (
        <DoctorLayout>
        <div class="patients-platform-container">
        <h2>PATIENTS</h2>
        <TextField
        onChange={(e)=>searchPatient(e.target.value)}
         className="search-p"
        id="outlined-basic" 
        label="Search for Patient by name phone or email" variant="outlined" fullWidth/>
       {searchInput.length> 0? <div className="all-patient-container-d">
         {filtered.map(patient=>(
              <div class="card-container-patient">
              <img src={doc} alt=""/>
              <div className="pat-info-claron-docs">
                  <p className="p-name-c">{patient.name}</p>
                  <p className="p-title-doc"><span>{patient.phone}</span></p>
                  <p className="p-title-doc"><span>{patient.email}</span></p>
                  <Link className="dg-btn" to="/DocDrugs">Add Drug for Patient</Link>
              </div>
      </div>
         ))}   
        </div>:<div className="all-patient-container-d">
         {data.map(patient=>(
              <div class="card-container-patient">
              <img src={doc} alt=""/>
              <div className="pat-info-claron-docs">
                  <p className="p-name-c">{patient.name}</p>
                  <p className="p-title-doc"><span>{patient.phone}</span></p>
                  <p className="p-title-doc"><span>{patient.email}</span></p>
                  <Link className="dg-btn" to="/DocDrugs">Add Drug for Patient</Link>
              </div>
      </div>
         ))}   
        </div>}
    </div>
    </DoctorLayout>
    )
}

export default PrescribeDrugs
