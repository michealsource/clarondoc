import React from 'react'
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
// import './DoctorNotification.css'
import './Consultations.css'
function Consultations() {
    return (
        <>
        <h2 className="consultation-title-doc">CONSULTATIONS</h2>
        <div class="container-notification-card">
            <div className="reject-accept-container">
                <p className="user_id">Telemedicine: CO_ID43834<span className="consult-n">Consult on:</span> <span className="consult-time">30 Nov 10:00 AM</span></p>
                <div className="symptoms-container">
                    <p className="symptoms-title">Sympthoms:</p>
                    <p>Headic, Malaria, Cold,Typhod, stomatch paining me, coughing</p>
                </div>

                <div class="actions-doc-claron">
                    <p style={{fontSize:20}}>Patient:</p><span style={{fontSize:20, marginLeft: '-30px',color:'#636363'}}>Beda Ghislain Akaffou</span>
                    <div className="accept-r">Reject</div>
                    <div className="reject-a">Accept</div>
                </div>

                <div class="date-created-container">
                    <p>Created on: 01 Dec 02:58 PM</p>
                </div>
            </div>

            <div className="reject-accept-container">
                <p className="user_id">Telemedicine: CO_ID43834<span className="consult-n">Consult on:</span> <span className="consult-time">30 Nov 10:00 AM</span></p>
                <div className="symptoms-container">
                    <p className="symptoms-title">Sympthoms:</p>
                    <p>Headic, Malaria, Cold,Typhod, stomatch paining me, coughing</p>
                </div>

                <div class="actions-doc-claron">
                    <p style={{fontSize:20}}>Patient:</p><span style={{fontSize:20, marginLeft: '-30px',color:'#636363'}}>Beda Ghislain Akaffou</span>
                    <div className="accept"><FaPhoneAlt/></div>
                    <div className="reject"><FaVideo/></div>
                    <button className='cancel-btn-book'>Cancel Appointment</button>
                </div>

                <div class="date-created-container">
                    <p>Created on: 01 Dec 02:58 PM</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Consultations

