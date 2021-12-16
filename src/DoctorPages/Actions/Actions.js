import React,{useState} from 'react'
import './Actions.css'
import doc from '../../images/doc-1.jpg'
import Schedule from '../Modals/Schedule'
import PatientActions from '../Modals/PatientActions'
import ConfirmModal from '../Modals/ConfirmModal'
import { FaAngleDown } from "react-icons/fa";
import {Link} from "react-router-dom"


function Actions() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openAction = Boolean(anchorEl);
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };
  
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
        <div className="actions-pat-container">
            <div class="patient-card-actions-container">
                <img src={doc} alt="" />
                <div className="p-infor-container">
                    <p>John Doe</p>
                    <p>John@gmail.com</p>
                    <p>08045698634</p>
                </div>
                <div class="all-actions-to-patient">
                    <div onClick={()=>setOpen(true)}><button className="act-btn">Schedule Appointment</button></div>
                    <div><Link to="/DocFacilityRequest" className="act-btn chat-p">Make Facility Request</Link></div>
                </div>
            </div>

        <Schedule open={open} setOpen={setOpen}/>
        <PatientActions handleClose={handleClose} handleClick={handleClick} anchorEl={anchorEl} openAction={openAction} />
        <ConfirmModal  handleCloseConfirm={handleCloseConfirm} openConfirm={openConfirm}/>
        </div>
    )
}

export default Actions
