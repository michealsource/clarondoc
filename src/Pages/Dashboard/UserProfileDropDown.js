import  React,{useContext} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link,useNavigate } from "react-router-dom"
// import { AuthContext } from '../../Context/AuthContext';
export default function UserProfileDropDown({ handleClose, anchorEl, openAction }) {
    // const {user,dispatch} = useContext(AuthContext)
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem("email")
        localStorage.removeItem("access-token")
        localStorage.removeItem("api-key")
        localStorage.removeItem("login-expiry")
        localStorage.removeItem("user")
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
                {/* <MenuItem> <Link to="/">Logout</Link></MenuItem>     */}
                <MenuItem onClick={logOut}>Logout</MenuItem> 
            </Menu>
        </div>
    );
}