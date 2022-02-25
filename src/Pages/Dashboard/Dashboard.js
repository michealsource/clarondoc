import React, { useState,useEffect } from 'react'
import './Dashboard.css'
import user from '../../images/user.png'
import { FaCalendarPlus,FaShareSquare } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { FaAmbulance } from "react-icons/fa";
import { FaHouzz } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa";
import { FaStaylinked } from "react-icons/fa";
import { FaTh } from "react-icons/fa";
import { FaAlignJustify,FaHeart ,FaShareAlt} from "react-icons/fa";
import { FiX } from "react-icons/fi";
// import { FaSignOutAlt } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom"
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
// PAGES IMPORTATION
import Ambulance from '../Ambulance/Ambulance'
import Homecare from '../Homecare/Homecare'
import Laboratory from '../Laboratory/Laboratory'
// import Pharmacy from '../Pharmacy/Pharmacy'
import Consultation from '../Consultation/Consultation'
import Subscribe from '../Subscribe/Subscribe'
import AppointmentHistory from '../Appointmenthistory/AppointmentHistory'
import Card from '../../Component/Card/Card';
import UserProfile from '../../UserDetails/Profile/Profile'
import Editpatient from '../../UserDetails/EditPatient/Editpatient';
import DemandBooking from '../../Component/DemandBookingModal/DemandBooking';
import IndividualRequest from '../../Component/Forms/IndividualRequest'
import FacilityRequest from '../../Component/Forms/FacilityRequest';
import Drugs from '../Drugs/Drugs';
import OtcDrugs from '../OtcDrugs/OtcDrugs.js'
import Prescribed from '../Prescribed/Prescribed.js'
import OrderReview from '../OrderReview/OrderReview'
import HomeCareForm from '../Homecare/HomeCareForm'
import Blog from '../Blog/Blog';
import PendingOrders from '../PendingOrders/PendingOrders'
import SavedDoctors from '../SavedDoctors/SavedDoctors'
import Referral from '../Referral/Referral'
import Wallet from '../Wallet/Wallet'
import Notification from '../Notification/Notification'
import Chat from '../Chat/Chat'
import UserProfileDropDown from './UserProfileDropDown'

function Dashboard() {
    const[user,SetUser]= useState()
    useEffect(()=>{
        (async()=>{
            let account = localStorage.getItem('user')
            SetUser(JSON.parse(account))
          })()

          console.log(user)
    },[])

    const [open, setOpen] = useState(false)
    const [sidebar, setSidebar] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const openAction = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      
    return (
        <div className="static-dashboard">
            <div className="dashboard-container">
                <div className='sidabar-container'>
                        {sidebar?(
                        <>
                            <div className="profile-container">
                            <img src= {user?user.avatar:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png'} alt="" className="user" />
                        </div>
                        <div class="user-detail">
                            <p className="name">Vincent Chibuike</p>
                            <p className="title">Patient</p>
                        </div>
                            </>
                        ):''}
                        
                    <div className="services-container">
                        <Link to="/userDashboard" className="service"> {sidebar?'Dashboard':''}  <FaTh className="icon-single" /></Link>
                        <Link to="/consultation" className="service">{sidebar?'Consultation':''} <FaCalendarPlus /></Link>
                        <Link to="/laboratory" className="service"> {sidebar?'Laboratory':''}<FaFlask className="icon-single" /></Link>
                        <Link to="/AppointmentHistory" className="service"> {sidebar?'Appointment History':''}<FaFlask className="icon-single" /></Link>
                        <Link to="/ambulance" className="service"> {sidebar?'Ambulance':''}<FaAmbulance className="icon-single" /></Link>
                        <Link to="/homecare" className="service"> {sidebar?'Home Care':''}<FaHouzz className="icon-single" /></Link>
                        <Link to="/drugs" className="service"> {sidebar?`Pharmacy Buy' Drugs`:''}<FaNotesMedical className="icon-single" /></Link>
                        <Link to="/subscribe" className="service"> {sidebar?'Subscribe Now!':''} <FaStaylinked className="icon-single" /></Link>
                        <Link to="/referral" className="service"> {sidebar?'Referral':''}<FaShareAlt className="icon-single" /></Link>
                        {/* <Link to="/pay" className="service">Pay<FaShareSquare className="icon-single" /></Link> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
