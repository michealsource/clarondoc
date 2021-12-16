import React from 'react'
import './Homecare.css'
import { Link } from 'react-router-dom'

function HomeCareCard() {
    return (
        <div className="top-history-container">
            <div class="row-his">
                <div className="column-his-1">
                    <div className="head-his">
                        <h4>Rountine Doctors Consultations</h4>
                        <p>Processing</p>
                    </div>

                <div class="col-container">
                    <div class="his-container-title">
                        <p>Requuest ID:</p>
                        <p>Schedule Date:</p>
                        <p>Gender:</p>
                        <p>Patient Name:</p>
                        <p>Symptoms:</p>
                        <p>Phone:</p>
                        <p>Email:</p>
                        <Link to="/OrderReview" className="drug-his-btn-h">Make Payment</Link>
                    </div>

                    <div class="his-container-cont">
                        <p>hyr9jnds98-57yhdf-irydrhbd</p>
                        <p>12/01/2021 12:15 AM</p>
                        <p>Male</p>
                        <p>Gulus</p>
                        <p>N.A</p>
                        <p>0803445687347</p>
                        <p>gulus@gmail.com</p>
                    </div>
                   
                </div>

                </div>

                

            </div>

        </div>
    )
}

export default HomeCareCard
