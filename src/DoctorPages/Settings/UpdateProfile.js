import React from 'react';
import './Settings.css';
import docuser from '../../images/doc-1.jpg'
import { FaInfo } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
function Settings() {
    return (
        <div className="settings-doc-container">

            <div className="doc-personal-detail-container">
                <h2>Update Your Personal Details</h2>
                <div className="doc-image-container">
                    <img src={docuser} alt="" />
                </div>
                <div>

                </div>
                <div className="divider" />
                <div class="doc-name-container">
                    <p className="doc-title-pro"><TextField id="outlined-basic" label="Samuel" variant="outlined" /></p>
                    <p className="doc-title-pro"><TextField id="outlined-basic" label="Anakwa Kwaku" variant="outlined" /></p>
                </div>
                <div className="divider" />

                <div class="brief-info">
                    <FaInfo className="info" />
                    <TextField
                        fullWidth
                        id="standard-textarea"
                        placeholder="A General Nurse By Profession, Mr Anakw"
                        multiline
                        variant="standard"
                    />
                </div>

                <div class="doc-profession">

                    <TextField
                        fullWidth
                        id="standard-textarea"
                        placeholder="Telemedicine"
                        multiline
                        variant="standard"
                    />
                    {/* <span><span className="profession">Profession:</span> </span> */}
                </div>
                <Box m={2} pt={3}>
                    <Button style={{background:'#1bcc88'}} m={2} fullWidth variant="contained">Update</Button>
                </Box>
               
            </div>
        </div>
    )
}

export default Settings
