import React,{useState,useEffect} from 'react'
import './Card.css'
import {Link } from "react-router-dom"
// import images
import drug from '../../images/drug.png'
import labrequest from '../../images/labrequest.png'
import ambulance from '../../images/ambulance.png'
import homecare from '../../images/homecare.png'
import MainLayout from '../../Pages/MainLayout'
// import {userDetails} from '../../Api/Auth'
function Card({sidebar}) {
    const[user,SetUser]= useState()
    useEffect(()=>{
        (async()=>{
            let account = localStorage.getItem('user')
            SetUser(JSON.parse(account))
          })()

          console.log(user)
    },[])
    return (
        <MainLayout>
        <div className="main-area-card-container">
            <div class="notifcation-container">
                <div class="update-profile">
                    <p>Profile Update: You should update your "Blood Group, City, Gender, State, Genotype and Date Of Birth</p>
                    <Link to="/Editpatient" className="update-btn-user">
                    Update Profile
                    </Link>
                </div>

                <div className="update-subscription">
                    <p>Subscription: To book a doctor, you must have an active subscription</p>
                    <Link to="/subscribe" className="subscribe-upd-btn-user">
                        Subscribe
                    </Link>
                </div>

            </div>

            <div class="first-container">
                <div class="name-container">
                    <h4>Hi, {user?user.firstname:'Vincent'}</h4>
                    <p>Welcome Back!</p>
                </div>

                <div class="doctor-book-btn">
                    <Link to="/consultation" className="demand-booking-btn">Book a Doctor</Link>
                </div>
            </div>


            <div className="cards">
                <div class="card-container">
                    <Link to="/drugs" class="card-box">
                        <img src={drug} alt="" />
                        <h4>Drugs Order History</h4>
                        <span>No Order made yet</span>
                    </Link>

                    <Link to="/laboratory" class="card-box">
                        <img src={labrequest} alt="" />
                        <h4>Lab Request History</h4>
                        <span>No request made yet</span>
                    </Link>

                    <Link to="/ambulance" class="card-box">
                        <img src={ambulance} alt="" />
                        <h4>Ambulance Request History</h4>
                        <span>No request made yet</span>
                    </Link>

                    <Link to="/homecare" class="card-box">
                        <img src={homecare} alt="" />
                        <h4>HomeCare Request History</h4>
                        <span>No request made yet</span>
                    </Link>
                </div>
            </div>

{/* APPOINTMENT STRUCTURE */}
            <div class="over-view">
                <h1>Overview</h1>
                <div class="inner-over-view">
                    <div class="over-view-header appointment">
                        <h3>Appointments</h3>
                        <div class="prescription-conent">
                            Your appointments will be listed here
                        </div>

                    </div>

                    <div class="over-view-header">
                        <h3>Prescriptions</h3>
                        <div class="prescription-conent">
                            Your prescriptions will be listed here
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </MainLayout>
    )
}

export default Card
