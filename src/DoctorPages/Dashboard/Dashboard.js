import React, { useState,useEffect } from 'react'
import {FaAlignJustify,FaCartPlus} from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom"
import Badge from '@mui/material/Badge';
import { SidebarMenus } from '../Sidbar/SidebarMenu'
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoctorLayout from '../../Pages/DoctorLayout';
import './Dashboard.css'
// PAGES IMPORTS
import docuser from '../../images/doc-1.jpg'
import UserDropDown from './UserDropDown'
import Switch from '../DocComponent/Switch'

function Dashboard() {
    const [open, setOpen] = useState(false)
    const [sidebar, setSidebar] = useState(true)
    const [activeRoute, setActiveRoute] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const openAction = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(activeRoute)
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
        <>
        <DoctorLayout/>
        <div className="static-dashboard">
            <div className="dashboard-container">
                <div className={sidebar?'sidabar-container':'sidebar-container-sm'}>
                        {sidebar?(
                        <>
                            <div className="profile-container doc">
                            <img src={docuser} alt="" className="user-left" />
                        </div>
                        <div class="user-detail">
                            <p className="name">Vincent Chibuike</p>
                            <p className="title">Patients</p>
                        </div>
                            </>
                        ):''}
                        
                    <div className="services-container">
                        {SidebarMenus.map(item=>(
                           <Link
                            onClick={() => setActiveRoute(item.path)}
                            key={item.id}
                            to={item.path} 
                            className={activeRoute === item.path ? 'active service' : 'service'}
                            > {item.name} {item.icon}</Link>      
                        )
                        )}
                        {/* <Link to="/" className="service"> {sidebar?'Dashboard':''}  <FaTh className="icon-single" /></Link> */}
                    </div>
                </div>
                <div className="content">
                    <div class="content-container">
                        <div class={sidebar?'navbar-container':'navbar-container-full'}>
                            <div className="menu-container">
                                <FaAlignJustify className="menu-icon" onClick={()=>setSidebar(!sidebar)}/>
                            </div>
                      
                             {activeRoute==="/PrescribeDrugsUser" && <Link to="/CartModal" class="cat-container">
                            <h5 className="cart-items"> <FaCartPlus className="cart"/>0</h5>
                            </Link>}  
                             
                            <Link to="/DoctorNotification" class="notification">
                                <Badge badgeContent={4} color="success">
                                    <NotificationsIcon color="action" />
                                </Badge>
                            </Link>

                        <div className="doc-info">
                        <Switch/>
                        <img src={docuser} alt="" />
                        <div onClick={handleClick} className="name-prof">
                            <p className="info-name">Spunky Henry</p>
                            <p>Health Professional</p>
                        </div>
                        <UserDropDown handleClose={handleClose} handleClick={handleClick} anchorEl={anchorEl} openAction={openAction}/>
                    </div>
                        </div>

                    </div>

                    {/* =====ROUTES TO DIFFRENT PAGES */}
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
