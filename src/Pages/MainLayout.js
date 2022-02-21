import React, { useEffect, useState } from 'react';
import user1 from '../images/user.png'
import { FaCalendarPlus, FaShareSquare } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaAmbulance } from "react-icons/fa";
import { FaHouzz } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa";
import { FaStaylinked } from "react-icons/fa";
import { FaTh } from "react-icons/fa";
import { FaAlignJustify, FaHeart, FaShareAlt, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import '../Pages/Dashboard/Dashboard.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import UserProfileDropDown from './Dashboard/UserProfileDropDown';
export default function MainLayout({ children }) {
   const[user,SetUser]= useState()
    useEffect(()=>{
        (async()=>{
            let account = localStorage.getItem('user')
            SetUser(JSON.parse(account))
          })()
    },[])
  const [open, setOpen] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null);
  const openAction = Boolean(anchorEl);
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <div className="static-dashboard">
        <div className="dashboard-container" >
          <div className='sidabar-container'>
            <>
              <div className="profile-container">
                <img src={user?user.avatar:''} alt="" className="user" />
              </div>
              <div className="user-detail">
                <p className="name">{user?user.firstname:''} {user?user.lastname:''}</p>
                <p className="title">Patient</p>
              </div>
            </>
            <div className="services-container">
              <Link to="/userDashboard" className="service">Dashboard<FaTh className="icon-single" /></Link>
              <Link to="/consultation" className="service">Consultation <FaCalendarPlus /></Link>
              <Link to="/laboratory" className="service"> Laboratory<FaFlask className="icon-single" /></Link>
              <Link to="/AppointmentHistory" className="service"> Appointment History<FaFlask className="icon-single" /></Link>
              <Link to="/ambulance" className="service">Ambulance<FaAmbulance className="icon-single" /></Link>
              <Link to="/homecare" className="service"> Home Care<FaHouzz className="icon-single" /></Link>
              <Link to="/drugs" className="service">Pharmacy Buy' Drugs<FaNotesMedical className="icon-single" /></Link>
              <Link to="/subscribe" className="service">Subscribe Now! <FaStaylinked className="icon-single" /></Link>
              <Link to="/referral" className="service"> Referral<FaShareAlt className="icon-single" /></Link>
            </div>

          </div>
          <div>
          <div className="content">
                    <div className="content-container">

                        <div className={sidebar?'navbar-container':'navbar-container-full'}>
                            <div className="menu-container">
                                <FaAlignJustify className="menu-icon" onClick={()=>setSidebar(!sidebar)}/>
                            </div>
                            
                            <Link to="/notification" className="notification">
                                <Badge badgeContent={4} color="success">
                                    <NotificationsIcon color="action" />
                                </Badge>
                            </Link>
                            
                            <Link to="/blog" className="blog">
                            <FaHeart className="hrt"/> 
                            <h5>Health Tips</h5>
                            </Link>

                            <button onClick={() => navigate("/call", {state: {mediaType: "audio"}})}  className="blog">
                            <FaHeart className="hrt"/> 
                            <h5>Urgent Care</h5>
                            </button>

                            <div className="main-profile-container">
                                <div className="user-profile-container">
                                    <img src={user?user.avatar:''} alt="" className="user-profile" />
                                    <p className="user-name"  onClick={handleClick}> <span className="profile-sm">Profile</span> <FaCaretDown /></p>
                                </div>
                                <UserProfileDropDown handleClose={handleClose} handleClick={handleClick} anchorEl={anchorEl} openAction={openAction}/>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
       
            <div />
            <div className='individual-content-lg'>
             {children}
            </div>
            
    
        </div>
      </div>
    </>
  );
}