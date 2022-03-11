import React,{useEffect,useState} from 'react'
import './Profile.css'
import profile from '../../images/user.png'
import MainLayout from '../../Pages/MainLayout'

import { Link,useNavigate } from "react-router-dom"
// ICONS IMPORT
import { FaPhoneAlt,FaEye } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { useSelector } from 'react-redux'

const prices = []
prices['Basic'] = 20
prices['Premium'] = 40
prices['Family'] = 100

function Profile() {
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user.value)
    // let account = localStorage.getItem('user')
    // let user = (JSON.parse(account))
    // const[user,SetUser]= useState()
    // useEffect(()=>{
    //     (async()=>{
    //         let account = localStorage.getItem('user')
    //         SetUser(JSON.parse(account))
    //       })()
    // },[])

    const editPage=()=>{
        navigate('/Editpatient',{state:{user:user}});
          }
    return (
        <MainLayout>
        <div className="patient-profile-container">
            <h3>MY Profile</h3>
            {/* PATIENT PICX CONTAINER */}

            <div class="details-container">

                <div class="patient-details">

                    <div class="profile-card-container">
                        <div class="patient-profile-pic">
                            <img src={user.avatar !== "undefined" ? user.avatar : profile}  alt="" />
                        </div>
                    </div>

                    <div class="info-pat">
                        <h4>{user?user.firstname:''} {user?user.lastname:''}</h4>
                        <p><FaPhoneAlt className="pat-icon" />{user?user.phone:''}</p>
                        <p><FaMapMarkerAlt className="pat-icon" />Ghana</p>
                        <p> <FaEnvelope className="pat-icon" />{user?user.email:''}</p>
                    </div>

                </div>

                <div class="patient-subcribtion-details">
                    <div className="sub-status">
                        <p className="plan-title">Subscription Plan:</p>
                        <p className="sub-card"> <FaCcAmazonPay className="pat-icon" />{user?user.subscription:''}</p>
                    </div>

                    <div class="clarondoc-id">
                        <p className="plan-title">ClaronDoc Id:</p>
                        <p className="sub-card" ><FaAddressCard className="pat-icon" />CD-P-3548L5</p>
                    </div>

                    <div class="plan-profile">

                  
                    <button 
                    onClick={()=>{ user.subscription != null && user.subscription != 'Normal' ? navigate('/Sub-Summary', { state: { name: `${user.subscription} Plan`, id: '', price: prices[user.subscription] } }) : navigate("/userDashboard")}}
                    className="upgrad-btn"> {user.subscription != null && user.subscription != 'Normal' ? `Continue with ${user.subscription} Plan` : 'Try ClaronDoc free for 14 days'}</button>
               

                    <button onClick={()=>{editPage()}}>
                            <button className="edit-btn txt"> Edit Profile</button>
                    </button>

                    <div>
                    <Link to="/SavedDoctors">
                    <button className="saved-btn txt">   View Saved Doctors</button>
                    </Link>
                    </div>
                   
                    
                    <button onClick={()=>navigate('/ChangePassword')}>
                            <button className="edit-btn txt"> Update Password</button>
                    </button>

                    </div>
                </div>
            </div>

            {/* <div class="medical-history-container">
                <h3>Medical History</h3>
                <div className="straght-line"></div>

                <div class="medical-history-content-cntaner">
                    <div class="history-inner-container">

                        <div className="inner-history-1">
                            <div className="history-1">
                                <p className="history-header">Blood Group:</p>
                                <p className="sub-histort-title">unspecified</p>
                            </div>

                            <div className="history-2">
                                <p className="history-header">Disabilities:</p>
                                <p className="sub-histort-title">None</p>
                            </div>
                        </div>

                        <div className="inner-history-1">
                            <div className="history-1">
                                <p className="history-header">Diabetic:</p>
                                <p className="sub-histort-title">No</p>
                            </div>
                            <div className="history-2">
                                <p className="history-header">Allergies:</p>
                                <p className="sub-histort-title">None</p>
                            </div>
                        </div>

                        <div className="inner-history-1">
                            <div className="history-1">
                                <p className="history-header">Genotype:</p>
                                <p className="sub-histort-title">unspecified</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}
        </div>
        </MainLayout>
    )
}

export default Profile
