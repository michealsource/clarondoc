import React from 'react'
import { Link } from "react-router-dom"
import './Referral.css'
import { FaUserFriends,FaUserPlus,FaWallet } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import MainLayout from '../MainLayout';
function Referral() {
    return (
        <MainLayout>
        <div className="referral-upper-container">
            <div class="referal-actions">
                <h1>Your Referrals</h1>
                <div>
                    <Link to="/Wallet" className="referral-btn">Manage Wallet</Link>
                    <Link to="" className="referral-btn">Create Code</Link>
                </div>
            </div>

            <div class="referal-content">
                <h3>Earn Money When You Refer A Doctor Or Patient To ClaronDoc</h3>
                <p className="amount-ref">EARN UPTO GHS5.2 FOR EVERY PATIENT YOU REFER AND</p>
                <p>To Get Started, Copy The Link Below Or Your Referral Code To Start Sharing With Friends And Family</p>
            </div>


            <div class="referal-history-container">
                <div class="referral-box">
                    <FaUserFriends className="ref" />
                    <div class="ref-num">
                        <p>0</p>
                        <p>Total Referrals</p>
                    </div>
                </div>

                <div class="referral-box">
                    <FaUserPlus className="ref" />
                    <div class="ref-num">
                        <p>0</p>
                        <p>Patient Referred</p>
                    </div>
                </div>

                <div class="referral-box">
                    <FaUserPlus className="ref" />
                    <div class="ref-num">
                        <p>0</p>
                        <p>Doctor Referred</p>
                    </div>
                </div>

                <div class="referral-box">
                    <FaWallet className="ref" />
                    <div class="ref-num">
                        <p>0</p>
                        <p>Wallet Balance</p>
                    </div>
                </div>
            </div>

            <div class="referral-link-container">

                <div className="ref-code">
                    <p>Copy The Link Below To Refer Users</p>
                    <p>Ref Code: <span className="code">V5XEV6</span></p>
                </div>

                <div class="link-share-container">
                <TextField fullWidth id="outlined-size-small" defaultValue="https://clarondoc.com/signup?ref=V5XEV6" size="small"/>
                <button>Copy</button>
                </div>
                
            </div>

            <div class="patien-doc-ref-table-container">
                <div class="patient-refreed">
                    <h4>Patients Referred</h4>
                </div>

                <div class="doctor-refrred">
                <h4>Doctors Referred</h4>
                </div>
            </div>
        </div>
        </MainLayout>
    )
}

export default Referral
