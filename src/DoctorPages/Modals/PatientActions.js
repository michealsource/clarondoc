import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom"
import { FaPhone,FaVideo,FaRocketchat } from "react-icons/fa";
import './Modals.css'

export default function PatientActions({ handleClose, anchorEl, openAction }) {
    return (
        <div>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openAction}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem><Link to="/Chat">Chat</Link> <FaRocketchat className="phone-doc"/></MenuItem>
                <MenuItem onClick={handleClose}>Voice Call <FaPhone className="phone-doc"/></MenuItem>
                <MenuItem onClick={handleClose}>Video Call <FaVideo className="phone-doc"/></MenuItem>

            </Menu>
        </div>
    );
}