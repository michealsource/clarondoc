import React from 'react'
import './DrugHistory.css'
import TextField from '@mui/material/TextField';

function DrugHistory() {
    return (
        <div className="drug-his-doc-container">
           <h4>DRUGS PRESCRIPTION HISTORY FOR PATIENTS</h4> 
            <TextField label="Search Patient" className="p-sarch-textfield" fullWidth/>

            <div class="d-container-h">

            <div class="doc-pre-his-container">

                <div className="title-doc-head">
                    <p>Name of Patient:</p>
                    <p>Name of Drugs:</p>
                    <p>Date Prescribed:</p>
                </div>

                <div>
                    <p>Spunky Henry</p>
                    <p>Xvitamin D, Vitamin C</p>
                    <p>28, 09, 2021</p>
                </div>
            </div>

            <div class="doc-pre-his-container">

                <div className="title-doc-head">
                    <p>Name of Patient:</p>
                    <p>Name of Drugs:</p>
                    <p>Date Prescribed:</p>
                </div>

                <div>
                    <p>Spunky Henry</p>
                    <p>Xvitamin D, Vitamin C</p>
                    <p>28, 09, 2021</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default DrugHistory
