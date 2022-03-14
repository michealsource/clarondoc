import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import './Referral.css'
import { FaUserFriends,FaUserPlus,FaWallet } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import MainLayout from '../MainLayout';
function Referral() {
    const [code, setCode] = useState("")


    useEffect(() =>{
        createCode(6)
    }, [])

    const clickToCopy = () => {
        navigator.clipboard.writeText("Hey! Join me on this awesome health care app and cut on trips to the hospital. http://onelink.to/clarondoc")
        alert("Copied")
    }
    const createCode = (length) => {

        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            let result = ' ';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            setCode(result)
            return result;
    }

   

    
    return (
        <MainLayout>
        <div className="referral-upper-container">
            <div class="referal-actions">
                <h1>Your Referrals</h1>
                <div>
                    <Link to="/Wallet" className="referral-btn">Manage Wallet</Link>
                    <button onClick={() => createCode(6)} className="referral-btn">Create Code</button>
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
                    <p>Ref Code: <span className="code">{code}</span></p>
                </div>

                <div class="link-share-container">
                <TextField fullWidth id="outlined-size-small" 
                inputProps={
					{ readOnly: true, }
				} 
                value={`https://clarondoc.com/signup?ref=${code}`} size="small"/>
                <button onClick={() => clickToCopy()}>Copy</button>
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
