import React from 'react'
import './Settings.css'
import doctor from '../../images/doctor-patient.jpg'
import Navbar from '../../Component/Navbar/Navbar'

function About() {
    return (
        <>
        <Navbar/>
        <div className="about-us-container">
            <h2>Health is wealth</h2>
            <p>We combine modern health strategies and technological expertise to create digital experiences that addresses the challenges of accessing medical health.We do this by offering low cost medical services from online to door-step outreach.</p>

            <div class="about-us-content-section">
                <div className="about-text">
               <h4>About Us</h4>
                Calaron is an innovative and Holistic health Maintenance rganzatn, nvolved n the delvery f medical, preventive and ccatnal health service to corporate clients n Ghana and west Afrca sub-region.
                </div>

                <div class="about-img">
                    <img src={doctor} alt="About"/>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default About
