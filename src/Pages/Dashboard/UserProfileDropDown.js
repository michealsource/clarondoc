import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom"
export default function UserProfileDropDown({ handleClose, anchorEl, openAction }) {
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
                <MenuItem> <Link to="/profile">Profile</Link></MenuItem>
                <MenuItem> <Link to="/">Logout</Link></MenuItem>    
            </Menu>
        </div>
    );
}