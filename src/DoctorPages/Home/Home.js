import React, { useState } from 'react'
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import doc from '../../images/doc-1.jpg'
import './Home.css'
import DoctorLayout from '../../Pages/DoctorLayout';
import { Patients } from './Patients'
import { FaPhone, FaVideo, FaRocketchat } from "react-icons/fa";
function Home() {
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
            <DoctorLayout>
            <div class="patients-platform-container">
                <h2>PATIENTS</h2>
                <TextField 
                onChange={(e)=>searchPatient(e.target.value)}
                className="search-p"
                 id="outlined-basic" label="Search for Patient by name phone or email" 
                 variant="outlined" fullWidth />
                {searchInput.length> 0?
                 <div className="all-patient-container">
                    {filtered.map(patient => (
                        <div class="card-container-patient" key={patient.id}>
                            <img src={doc} alt="" />
                            <Link to={`/actions/${patient.id}`} className="pat-info-claron-docs">
                                <p className="p-name-c">{patient.name}</p>
                                <p><span className="p-title-doc">{patient.phone}</span></p>
                                <p><span className="p-title-doc">{patient.email}</span></p>

                                <div className="perform-actions-container">
                                    <Link to="/ChChatDoctorat">
                                        <FaRocketchat className="phone-doc" />
                                    </Link>
                                    <FaPhone className="phone-doc" />
                                    <FaVideo className="phone-doc" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>:<div className="all-patient-container">
                    {data.map(patient => (
                        <div className="card-container-patient" key={patient.id}>
                            <img src={doc} alt="" />
                            <Link to={`/actions/${patient.id}`} className="pat-info-claron-docs">
                                <p className="p-name-c">{patient.name}</p>
                                <p><span className="p-title-doc">{patient.phone}</span></p>
                                <p><span className="p-title-doc">{patient.email}</span></p>

                                <div className="perform-actions-container">
                                    <Link to="/ChatDoctor">
                                        <FaRocketchat className="phone-doc" />
                                    </Link>
                                    <FaPhone className="phone-doc" />
                                    <FaVideo className="phone-doc" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>}
            </div>
            </DoctorLayout>
        </>
    )
}
export default Home
