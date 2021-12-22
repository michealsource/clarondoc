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
                            <img src={user} alt="" className="user" />
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

                <div className="content">
                    <div class="content-container">

                        <div class={sidebar?'navbar-container':'navbar-container-full'}>
                            <div className="menu-container">
                                <FaAlignJustify className="menu-icon" onClick={()=>setSidebar(!sidebar)}/>
                            </div>

                            <Link to="/notification" class="notification">
                                <Badge badgeContent={4} color="success">
                                    <NotificationsIcon color="action" />
                                </Badge>
                            </Link>
                            
                            <Link to="/blog" class="blog">
                            <FaHeart className="hrt"/> 
                            <h5>Health Tips</h5>
                            </Link>

                            <div class="main-profile-container">
                                <div className="user-profile-container">
                                    <img src={user} alt="" className="user-profile" />
                                    <p className="user-name"  onClick={handleClick}> <span className="profile-sm">Profile</span> <FaCaretDown /></p>
                                </div>
                                <UserProfileDropDown handleClose={handleClose} handleClick={handleClick} anchorEl={anchorEl} openAction={openAction}/>
                               
                            </div>
                        </div>

                    </div>

                    {/* =====ROUTES TO DIFFRENT PAGES */}
                    <div className={sidebar?'individual-conent':'individual-content-lg'}>
                        <Routes>
                            <Route exact path="/userDashboard" element={<Card sidebar={sidebar} />}></Route>
                            <Route exact path="ambulance" element={<Ambulance />}></Route>
                            <Route exact path="homecare" element={<Homecare />}></Route>
                            <Route exact path="laboratory" element={<Laboratory />}></Route>
                            <Route exact path="consultation" element={<Consultation />}></Route>
                            <Route exact path="Subscribe" element={<Subscribe />}></Route>
                            <Route exact path="AppointmentHistory" element={<AppointmentHistory/>}></Route>
                            <Route exact path="profile" element={<UserProfile />}></Route>
                            <Route exact path="Editpatient" element={<Editpatient />}></Route>
                            <Route exact path="/demandbooking" element={< DemandBooking />}></Route>
                            <Route exact path="/individualRequest" element={< IndividualRequest />}></Route>
                            <Route exact path="/facilityrequest" element={< FacilityRequest />}></Route>
                            <Route exact path="/drugs" element={< Drugs />}></Route>
                            <Route exact path="/otcdrugs" element={< OtcDrugs />}></Route>
                            <Route exact path="/prescribed" element={< Prescribed />}></Route>
                            <Route exact path="/OrderReview" element={< OrderReview />}></Route>
                            <Route exact path="/HomeCareForm" element={< HomeCareForm />}></Route>
                            <Route exact path="/blog" element={< Blog />}></Route>
                            <Route exact path="/pending" element={< PendingOrders />}></Route>   
                            <Route exact path="/SavedDoctors" element={< SavedDoctors />}></Route>            
                            <Route exact path="/Referral" element={< Referral />}></Route>
                            <Route exact path="/Wallet" element={< Wallet />}></Route>
                            <Route exact path="/notification" element={< Notification />}></Route>
                            <Route exact path="/chat" element={< Chat />}></Route>
                        </Routes>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard
