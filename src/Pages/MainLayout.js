import React, { useEffect, useState } from 'react';
import user1 from '../images/user.png'
import { FaCalendarPlus, FaShareSquare } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
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
import { useSelector, useDispatch } from 'react-redux'
import {LOGOUT} from '../features/user'
import { fetchNotifications } from '../Api/notifications';
import { NOTIFICATIONS, } from '../features/user'

export default function MainLayout({ children }) {
  const userData = useSelector((state)=>state.user.value)
   const[user,SetUser]= useState()
   const [notifications, setNotifications] = useState([])
   const dispatch = useDispatch()
    
    useEffect(()=>{
        (async()=>{
            let account = localStorage.getItem('user')
            SetUser(JSON.parse(account))
            let response = await fetchNotifications();
            // console.log(response)
            dispatch(NOTIFICATIONS(response))
            setNotifications(response)
          })()
    },[])
  const [open, setOpen] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null);
  const openAction = Boolean(anchorEl);
  const navigate = useNavigate()

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setOpen(!open)
  };
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
    <>
      <div className="static-dashboard">
        <div className="dashboard-container" >
          <div className='sidabar-container'>
            <>
              <div className="profile-container">
                <img src={userData.avatar !== "undefined"? userData.avatar:user1} alt="" className="user" />
              </div>
              <div className="user-detail">
                <p className="name">{userData?userData.firstname:''} {userData?userData.lastname:''}</p>
                <p className="title">Patient</p>
              </div>
            </>
            <div className="services-container">
              <Link to="/userDashboard" className="service"> <span>Dashboard</span><FaTh className="icon-single" /></Link>
              <Link to="/consultation" className="service"><span> Consultation</span> <FaCalendarPlus className="icon-single"/></Link>
              <Link to="/laboratory" className="service"> <span>Laboratory</span> <FaFlask className="icon-single" /></Link>
              <Link to="/AppointmentHistory" className="service"> <span>Appointment History</span> <FaFlask className="icon-single" /></Link>
              <Link to="/ambulance" className="service"> <span>Ambulance</span><FaAmbulance className="icon-single" /></Link>
              <Link to="/homecare" className="service"> <span>Home Care</span> <FaHouzz className="icon-single" /></Link>
              <Link to="/drugs" className="service"> <span>Pharmacy Buy' Drugs</span><FaNotesMedical className="icon-single" /></Link>
              <Link to="/subscribe" className="service"><span> Subscribe Now! </span><FaStaylinked className="icon-single" /></Link>
              <Link to="/referral" className="service"> <span>Referral</span> <FaShareAlt className="icon-single" /></Link>
            </div>        

          </div>
          <div>
          <div className="content">
                    <div className="content-container">
                        <div className={sidebar?'navbar-container':'navbar-container-full'}>
                            <div className="menu-container">
                                <FaAlignJustify className="menu-icon"/>
                            </div>
                            
                            <Link to="/notification" className="notification">
                                <Badge badgeContent={notifications.length} color="success">
                                    <NotificationsIcon color="action" />
                                </Badge>
                            </Link>
                            
                            <Link to="/blog" className="blog">
                            {/* <FaHeart className="hrt"/>  */}
                            <h5 className="tips">Health Tips</h5>
                            </Link>

                            <button onClick={() => userData.subscription =="Premium" || userData.subscription == "Family Plan" ? navigate("/call", {state: {mediaType: "audio"}}): navigate("/Subscribe")}  className="blog">
                            <FaPhoneAlt className="hrt"/> 
                            <h5 className='urgent'>Urgent Care</h5>
                            </button>

                            <div className="main-profile-container">
                                <div className="user-profile-container">
                                <img src={userData.avatar !== "undefined"? userData.avatar:user1} alt="" className="user-profile" />
                                   
                                    <p className="user-name"  onClick={handleClick}> <span className="profile-sm">Profile</span> <FaCaretDown /></p>
                                </div>
                                {
                                  open?<div className='hover-menu'>
                                  <Link to="/profile">Profile</Link>
                                  <Link to="/AboutClaron">About Us</Link>
                                  <Link to="/ClaronTerms">Terms and Condition</Link>
                                  <span onClick={logOut}>Logout</span>
                                  {/* <h3>Home</h3> */}
                                </div>:null
                                }
                                
                                {/* <UserProfileDropDown handleClose={handleClose} handleClick={handleClick} anchorEl={anchorEl} openAction={openAction}/> */}
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