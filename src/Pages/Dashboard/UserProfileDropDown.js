import  React,{useContext} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link,useNavigate } from "react-router-dom"
import {LOGOUT} from '../../features/user'
import { useDispatch} from 'react-redux'
export default function UserProfileDropDown({ handleClose, anchorEl, openAction }) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logOut = ()=>{
        localStorage.removeItem("email")
        localStorage.removeItem("access-token")
        localStorage.removeItem("api-key")
        localStorage.removeItem("login-expiry")
        localStorage.removeItem("user")
        dispatch(LOGOUT())
        navigate("/")
    }
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
                <MenuItem> <Link to="/AboutClaron">About Us</Link></MenuItem>
                <MenuItem> <Link to="/ClaronTerms">Terms and Condition</Link></MenuItem>
                {/* <MenuItem> <Link to="/">Logout</Link></MenuItem>     */}
                <MenuItem onClick={logOut}>Logout</MenuItem> 
            </Menu>
        </div>
    );
}