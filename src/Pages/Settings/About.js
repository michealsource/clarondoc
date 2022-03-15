import React from 'react'
import './Settings.css'
import doctor from '../../images/doctor-patient.jpg'
import Navbar from '../../Component/Navbar/Navbar'

function About() {
    return (
        <>
        <Navbar/>
       

            <div class="about-us-content-section">
                <div className="about-text">
               <h4>About</h4>
                Calarons is an innovative and Holistic health Maintenance rganzatn, nvolved n the delvery f medical, preventive and ccatnal health service to corporate clients n Ghana and west Afrca sub-region.
                </div>

                <div class="about-img">
                    <img src={doctor} alt="About"/>
                </div>
                
            </div>
        
        </>
    )
}

export default About
