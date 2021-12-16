import React from 'react'
import { Link } from "react-router-dom"
import './Homecare.css'
import HomeCareCard from './HomeCareCard'
function Homecare() {
    return (
        <div className="home-care-container-1">
            <div class="homecare-inner-container-2">
                <h2>HOME CARE OVERVIEW</h2>
                <div class="laboratory-container-btn">
                    <div class="individual-request">
                        <Link to="/HomeCareForm" className="individual-btn">Request Home Care</Link>
                    </div>
                </div>
            </div>

            <div class="appointment-container-box">
                <div class="appointment-box one">
                    <div className="upcoming-num">0</div>
                    <p>Upcoming Request</p>
                </div>

                <div class="appointment-box two">
                    <div className="pending-num">0</div>
                    <p>Pending Request</p>
                </div>

                <div class="appointment-box three">
                    <div className="completed-num">0</div>
                    <p>Completed Request</p>
                </div>

                <div class="appointment-box four">
                    <div className="cancelled-num">0</div>
                    <p>Cancelled Request</p>
                </div>
            </div>

            <HomeCareCard/>

        </div>
    )
}

export default Homecare
