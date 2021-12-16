import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom"
import { FaPhone,FaVideo,FaRocketchat } from "react-icons/fa";

export default function UserDropDown({ handleClose, anchorEl, openAction }) {
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
                <MenuItem> <Link to="/Settings">Profile</Link></MenuItem>
                <MenuItem> <Link to="/UpdateProfile">Update Profile</Link></MenuItem>
                <MenuItem> <Link to="/About">About Us</Link></MenuItem>
                <MenuItem> <Link to="/Terms">Terms and conditions</Link></MenuItem>
                <MenuItem> <Link to="/">Logout</Link></MenuItem>    
            </Menu>
        </div>
    );
}