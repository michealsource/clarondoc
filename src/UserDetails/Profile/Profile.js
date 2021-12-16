import React from 'react'
import './Profile.css'
import profile from '../../images/user.png'

import { Link } from "react-router-dom"

// ICONS IMPORT
import { FaPhoneAlt,FaEye } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";



function Profile() {
    return (
        <div className="patient-profile-container">
            <h3>MY Profile</h3>
            {/* PATIENT PICX CONTAINER */}

            <div class="details-container">

                <div class="patient-details">

                    <div class="profile-card-container">
                        <div class="patient-profile-pic">
                            <img src={profile} alt="" />
                        </div>
                    </div>

                    <div class="info-pat">
                        <h4>Alex Shaibu</h4>
                        <p><FaPhoneAlt className="pat-icon" /> 09034567890</p>
                        <p><FaMapMarkerAlt className="pat-icon" />NIGERIA</p>
                        <p> <FaEnvelope className="pat-icon" /> kelvinmicheal208@gmail.com</p>
                    </div>

                </div>

                <div class="patient-subcribtion-details">
                    <div className="sub-status">
                        <p className="plan-title">Subscription Plan:</p>
                        <p className="sub-card"> <FaCcAmazonPay className="pat-icon" /> Not yet subscribed</p>
                    </div>

                    <div class="clarondoc-id">
                        <p className="plan-title">ClaronDoc Id:</p>
                        <p className="sub-card" ><FaAddressCard className="pat-icon" />CD-P-3548L5</p>
                    </div>

                    <div class="plan-profile">

                    <Link to="/subscribe">
                    <button className="upgrad-btn"> <FaEye/> Upgrade Plan</button>
                    </Link>

                    <Link to="/Editpatient">
                            <button className="edit-btn"> <FaEye/> Edit Profile</button>
                    </Link>

                    <Link to="/SavedDoctors">
                   
                    <button className="saved-btn">  <FaEye/> View Saved Doctors</button>
                    </Link>

                    </div>
                </div>
            </div>

            <div class="medical-history-container">
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
            </div>
        </div>
    )
}

export default Profile
