import React from 'react'
import TextField from '@mui/material/TextField';
import DoctorLayout from '../../Pages/DoctorLayout';
function LabRequestDoctor() {
    return (
        <DoctorLayout>
        <div className="drug-his-doc-container">
        <h4>Lab Request History Made On Behalf of Patient</h4> 
         <TextField label="Search Patient" className="p-sarch-textfield" fullWidth/>
         <div class="d-container-h">
         <div class="doc-pre-his-container">
             <div className="title-doc-head">
                 <p>Name of Patient:</p>
                 <p>Status:</p>
                 <p>Date Requested:</p>
             </div>

             <div>
                 <p>Spunky Henry</p>
                  <p style={{color:'#1bcc88', fontWeight:'bold'}}>Completed</p>  
                 <p>28, 09, 2021</p>
             </div>
         </div>

         
         <div class="doc-pre-his-container">

             <div className="title-doc-head">
                 <p>Name of Patient:</p>
                 <p>Status:</p>
                 <p>Date Requested:</p>
             </div>

             <div>
                 <p>Spunky Henry</p>
                  <p style={{color:'yellow', fontWeight:'bold'}}>Pending</p>  
                 <p>28, 09, 2021</p>
             </div>
         </div>
         </div>
     </div>
     </DoctorLayout>
    )
}

export default LabRequestDoctor
