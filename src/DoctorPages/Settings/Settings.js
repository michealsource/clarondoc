import React from 'react';
import './Settings.css';
import docuser from '../../images/doc-1.jpg'
import { FaInfo } from "react-icons/fa";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
function Settings() {
    return (
        <div className="settings-doc-container">
            
            <div className="doc-personal-detail-container">
            <h2>Personal Details</h2>
                <div className="doc-image-container">
                    <img src={docuser} alt="" />
                </div>
               
                <div>
                    <div class="doc-status-container">
                    <div>
                        <span className="doc-status">Status:</span>
                    </div>
                    <div>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        
                            <FormControlLabel value="Online" control={<Radio />} label="Online" />
                            <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                            <FormControlLabel value="In Meeting" control={<Radio />} label="In Meeting" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                    </div>

                </div>
                    <div className="divider"/>
                <div class="doc-name-container">
                    <p className="doc-title-pro">First Name:<span className="doc-title-pro-name">Samuel</span></p>
                    <p className="doc-title-pro">Last Name:<span className="doc-title-pro-name">Anakwa Kwaku</span></p>
                </div>
                <div className="divider"/>

                <div class="brief-info">
                    <FaInfo className="info"/>
                    <p>A General Nurse by profession, Mr Anakw</p>
                </div>
                <div className="divider"/>

                <div class="doc-profession">
                <span><span className="profession">Profession:</span> Telemedicine</span>
                </div>
            </div>
        </div>
    )
}

export default Settings
