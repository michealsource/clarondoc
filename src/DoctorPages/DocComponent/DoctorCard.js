import React from 'react'
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"
function DoctorCard() {
    return (
        <div>
            <div class="patients-platform-container">
                <h2>PATIENTS</h2>
                <TextField className="search-p" id="outlined-basic" label="Search for Patient by name phone or email" variant="outlined" fullWidth/>

                <div className="all-patient-container">

           
                      <div class="card-container-patient">
                      <img src="" alt=""/>
                      <Link to=""  className="pat-info-claron-docs">
                          <p className="p-name-c">John Doe</p>
                          <p>Phone: <span>09045679457</span></p>
                          <p>Email: <span>john@gmail.com</span></p>
                      </Link>
              </div>
                </div>
             
            </div>
        </div>
    )
}

export default DoctorCard
