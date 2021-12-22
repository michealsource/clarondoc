import React, { useState,useEffect } from 'react'
import {FaAlignJustify,FaCartPlus} from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom"
import Badge from '@mui/material/Badge';
import { SidebarMenus } from '../Sidbar/SidebarMenu'
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../../Pages/Dashboard/Dashboard.css'
import './Dashboard.css'
// PAGES IMPORTS
import docuser from '../../images/doc-1.jpg'
import LabRequest from '../LabRequest/LabRequest'
import PrescribeDrugs from '../PrescribedDrugs/PrescribeDrugs'
import Settings from '../Settings/Settings'
import Home from '../Home/Home'
import DocDrugs from '../PrescribedDrugs/DocDrugs'
import Chat from '../Chat/Chat'
import DrugHistory from '../DrugPrescriptionHistory/DrugHistory'
import LabRequestDoctor from '../LabRequestDoctor/LabRequestDoctor'
import Actions from '../Actions/Actions'
import DocFacilityRequest from '../DocFacilityRequest/DocFacilityRequest'
import DoctorNotification from '../DoctorNotification/DoctorNotification'
import UpdateProfile from '../Settings/UpdateProfile'
import UserDropDown from './UserDropDown'
import Consultations from '../Consultations/Consultations';
import Terms from '../Terms/Terms'
import About from '../About/About'
import Switch from '../DocComponent/Switch'
import CartModal from '../Modals/CartModal'
// PAGES IMPORTATION
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
                    <div className={sidebar?'individual-conent':'individual-content-lg'}>
                    <Routes>
                    <Route exact path="/doctorDashboard" element={<Home />}></Route>
                    <Route exact path="/LabRequestUser" element={<LabRequest />}></Route>
                    <Route exact path="/PrescribeDrugsUser" element={<PrescribeDrugs />}></Route>
                    <Route exact path="/Settings" element={<Settings />}></Route>
                    <Route exact path="/DocDrugs" element={<DocDrugs />}></Route>
                    <Route exact path="/DoctorNotification" element={<DoctorNotification />}></Route>
                    <Route exact path="/Chat" element={<Chat />}></Route>
                    <Route exact path="/DrugHistoryDoctor" element={<DrugHistory />}></Route>
                    <Route exact path="/RequestHistoryDoctor" element={<LabRequestDoctor />}></Route>
                    <Route exact path="/actions/:id" element={< Actions />}></Route>
                    <Route exact path="DocFacilityRequest" element={< DocFacilityRequest />}></Route>
                    <Route exact path="/UpdateProfile" element={<UpdateProfile />}></Route>
                    <Route exact path="/Consultations" element={<Consultations />}></Route>
                    <Route exact path="/Terms" element={<Terms />}></Route>
                    <Route exact path="/About" element={<About />}></Route>
                    <Route exact path="/CartModal" element={<CartModal />}></Route>
                    
                </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
