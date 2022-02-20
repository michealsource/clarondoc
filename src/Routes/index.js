
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
import AboutClaron from '../Pages/AboutClaron/AboutClaron'
import ClaronTerms from '../Pages/ClaronTerms/ClaronTerms'
import SubscriptionSummary from '../Pages/Subscribe/SubscriptionSummary'
// import UserProfileDropDown from '../Pages/Dashboard/UserProfileDropDown'

// DOCTORS PAGE IMPORT
import Home from '../DoctorPages/Home/Home'
import LabRequest from '../DoctorPages/LabRequest/LabRequest'
import PrescribeDrugs from '../DoctorPages/PrescribedDrugs/PrescribeDrugs'
import Settings from '../DoctorPages/Settings/Settings'
import DocDrugs from '../DoctorPages/PrescribedDrugs/DocDrugs'
import DoctorNotification from '../DoctorPages/DoctorNotification/DoctorNotification'
import ChatD from '../DoctorPages/Chat/Chat'
import DrugHistory from '../DoctorPages/DrugPrescriptionHistory/DrugHistory'
import LabRequestDoctor from '../DoctorPages/LabRequestDoctor/LabRequestDoctor'
import Actions from '../DoctorPages/Actions/Actions'
import DocFacilityRequest from '../DoctorPages/DocFacilityRequest/DocFacilityRequest'
import UpdateProfile from '../DoctorPages/Settings/UpdateProfile'
import Consultations from '../DoctorPages/Consultations/Consultations';
import TermsD from '../DoctorPages/Terms/Terms'
import AboutD from '../DoctorPages/About/About'
import CartModal from '../DoctorPages/Modals/CartModal'
// import Call from '../Pages/Call/Index'
// PUBLIC PAGES
import SignUp from '../Pages/signup/Signup'
import SignIn from '../Pages/SignIn/SignIn'
import About from '../Pages/Settings/About'
import LandingPage from '../Pages/landingPage.js/LandingPage'
import TermsandCondition from '../Pages/Settings/TermsandCondition'
// import Navbar from '../Component/Navbar/Navbar'
function index() {
    return (
        <div>
            <Routes>
                {/* PATIENT ROUTES */}
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
                <Route exact path="/AboutClaron" element={< AboutClaron />} />
                <Route exact path="/ClaronTerms" element={< ClaronTerms />} />
                <Route exact path="/Sub-Summary" element={< SubscriptionSummary />} />
                

                {/* <Route exact path="/call" element={< Call />} /> */}
                {/* DOCTOR ROUTES */}
                <Route exact path="/doctorDashboard" element={<Home />}></Route>
                    <Route exact path="/LabRequestUser" element={<LabRequest />}></Route>
                    <Route exact path="/PrescribeDrugsUser" element={<PrescribeDrugs />}></Route>
                    <Route exact path="/Settings" element={<Settings />}></Route>
                    <Route exact path="/DocDrugs" element={<DocDrugs />}></Route>s
                    <Route exact path="/DoctorNotification" element={<DoctorNotification />}></Route>
                    <Route exact path="/ChatDoctor" element={<ChatD />}></Route>
                    <Route exact path="/DrugHistoryDoctor" element={<DrugHistory />}></Route>
                    <Route exact path="/RequestHistoryDoctor" element={<LabRequestDoctor />}></Route>
                    <Route exact path="/actions/:id" element={< Actions />}></Route>
                    <Route exact path="DocFacilityRequest" element={< DocFacilityRequest />}></Route>
                    <Route exact path="/UpdateProfile" element={<UpdateProfile />}></Route>
                    <Route exact path="/Consultations" element={<Consultations />}></Route>
                    <Route exact path="/Terms" element={<TermsD/>}></Route>
                    <Route exact path="/About" element={<AboutD />}></Route>
                    <Route exact path="/CartModal" element={<CartModal />}></Route>

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
