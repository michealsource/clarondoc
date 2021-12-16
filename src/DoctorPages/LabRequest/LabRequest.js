import React,{useState} from 'react'
import './LabRequest.css'
import docuser from '../../images/doc-1.jpg'
import TextField from '@mui/material/TextField';
import {Patients} from '../LabRequest/Patient'
import {Box,Dialog,DialogTitle,DialogContent,IconButton} from '@mui/material';
import { FiX } from "react-icons/fi";
import LabTests from '../LabRequest/LabTests'
import doc from '../../images/doc-1.jpg'
function LabRequest() {
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
        <>
        <div class="patients-platform-container">
        <h2>PATIENTS</h2>
        <TextField 
        onChange={(e)=>searchPatient(e.target.value)}
        className="search-p" id="outlined-basic" 
        label="Search for Patient by name phone or email" 
        variant="outlined" fullWidth/>
        {searchInput.length> 0? <div className="all-patient-container-d">
         {filtered.map(patient=>(
              <div class="card-container-patient">
              <img src={doc} alt=""/>
              <div className="pat-info-claron-docs">
                  <p className="p-name-c">{patient.name}</p>
                  <p className="p-title-doc"><span>{patient.phone}</span></p>
                  <p className="p-title-doc"><span>{patient.email}</span></p>
                  
                  <button className="add-lab-test-btn" onClick={()=>setOpenModal(true)}>Add Lab Test</button>
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
                  
                  <button className="add-lab-test-btn" onClick={()=>setOpenModal(true)}>Add Lab Test</button>
              </div>
      </div>
         ))}   
        </div>}
    </div>
            <Dialog open={openModal} fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    Add Lab Test For Patient
                    <IconButton onClick={()=>setOpenModal(false)}>
                        <FiX/>
                    </IconButton>    
                    </Box>
                </DialogTitle>
                <DialogContent>
                   <LabTests/>
                   <button className="doc-submit-test">Submit</button>
                </DialogContent>
            </Dialog>
            
            </>
    )
}

export default LabRequest
