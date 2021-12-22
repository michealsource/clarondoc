
import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import PatientRoute from './PatientRoute'
// PAGES
import Card from '../Component/Card/Card'
import Consultation from '../Pages/Consultation/Consultation'
import Subscribe from '../Pages/Subscribe/Subscribe'
import Homecare from '../Pages/Homecare/Homecare'
import Ambulance from '../Pages/Ambulance/Ambulance'
import Laboratory from '../Pages/Laboratory/Laboratory'
import AppointmentHistory from '../Pages/Appointmenthistory/AppointmentHistory'
// import UserProfile from '../UserDetails/Profile'
import UserProfile from '../UserDetails/Profile/Profile'
import Editpatient from '../UserDetails/EditPatient/Editpatient'
import DemandBooking from '../Component/DemandBookingModal/DemandBooking'
import IndividualRequest from '../Component/Forms/IndividualRequest'
import FacilityRequest from '../Component/Forms/FacilityRequest'
import Drugs from '../Pages/Drugs/Drugs'
import OtcDrugs from '../Pages/OtcDrugs/OtcDrugs'
import Prescribed from '../Pages/Prescribed/Prescribed'
import OrderReview from '../Pages/OrderReview/OrderReview'
import HomeCareForm from '../Pages/Homecare/HomeCareForm'
import Blog from '../Pages/Blog/Blog'
import PendingOrders from '../Pages/PendingOrders/PendingOrders'
import SavedDoctors from '../Pages/SavedDoctors/SavedDoctors'
import Referral from '../Pages/Referral/Referral'
import Wallet from '../Pages/Wallet/Wallet'
import Notification from '../Pages/Notification/Notification'
import Chat from '../Pages/Chat/Chat'
// import UserProfileDropDown from '../Pages/Dashboard/UserProfileDropDown'

// PUBLIC PAGES
import SignUp from '../Pages/signup/Signup'
import SignIn from '../Pages/SignIn/SignIn'
import About from '../Pages/Settings/About'
import LandingPage from '../Pages/landingPage.js/LandingPage'
import TermsandCondition from '../Pages/Settings/TermsandCondition'

import Navbar from '../Component/Navbar/Navbar'

function index() {
    return (
        <div>
            {/* <Navbar/> */}
            <Routes>
                {/* DOCTORS ROUTES */}
                <Route exact path="/userDashboard" element={<Card/>} />
                <Route exact path="/ambulance" element={<Ambulance />} />
                <Route exact path="/homecare" element={<Homecare />} />
                <Route exact path="/laboratory" element={<Laboratory />} />
                <Route exact path="/consultation" element={<Consultation />} />
                <Route exact path="/Subscribe" element={<Subscribe />} />
                <Route exact path="/AppointmentHistory" element={<AppointmentHistory/>} />
                <Route exact path="/profile" element={<UserProfile />} />
                <Route exact path="/Editpatient" element={<Editpatient />} />
                <Route exact path="/demandbooking"  element={< DemandBooking />} />
                <Route exact path="/individualRequest" element={< IndividualRequest />}/>
                <Route exact path="/facilityrequest" element={< FacilityRequest />} />
                <Route exact path="/drugs" element={< Drugs />}/>
                <Route exact path="/otcdrugs" element={< OtcDrugs />} />
                <Route exact path="/prescribed" element={< Prescribed />} />
                <Route  exact path="/OrderReview" element={< OrderReview />} />
                <Route exact path="/HomeCareForm" element={< HomeCareForm />} />
                <Route exact path="/blog"  element={< Blog />}/>
                <Route exact path="/pending" element={< PendingOrders />} />
                <Route exact path="/SavedDoctors" element={< SavedDoctors />} />
                <Route exact path="/Referral" element={< Referral />} />
                <Route exact path="/Wallet" element={< Wallet />} />
                <Route exact path="/notification" element={< Notification />} />
                <Route exact path="/chat" element={< Chat />} />

                {/* PUBLIC PAGES */}
                
                <Route exact path="/" element={<LandingPage />}></Route>
                <Route exact path="/SignIn" element={<SignIn/>}></Route>
                <Route exact path="/SignUp" element={<SignUp />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/privacy" element={<TermsandCondition />}></Route>
           </Routes>
        </div>
    )
}

export default index
