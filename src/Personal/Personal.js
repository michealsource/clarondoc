import React from 'react'
import './Personal.css'
import { FaSignInAlt, FaUser,FaArchway,FaProcedures,FaVial,FaUserMd,FaHandHoldingMedical, FaTh, FaNotesMedical, FaCogs,FaAlignJustify } from "react-icons/fa";
import doc from '../images/doctor.png'

function Personal() {
    return (
        <>
       <div class="section-1">
           <input type="checkbox" id="check"/>
           <div id="menu">
              <div className="v-icon">
                  <p><FaTh className="v-icons"/></p>
                  <p>Dashboard</p>
              </div> 

              <div className="v-icon">
                  <p><FaHandHoldingMedical className="v-icons"/></p>
                  <p>Request Lab Test</p>
              </div>

              <div className="v-icon">
                  <p><FaNotesMedical className="v-icons"/></p>
                  <p>Prescribe Drugs</p>
              </div>

              <div className="v-icon">
                  <p><FaCogs className="v-icons"/></p>
                  <p>Settings</p>
              </div>

              <div className="v-icon">
                  <p><FaUserMd className="v-icons"/></p>
                  <p>Drug Prescription History</p>
              </div>

              <div className="v-icon">
                  <p><FaVial className="v-icons"/></p>
                  <p>Lab Request History</p>
              </div>

              <div className="v-icon">
                  <p><FaProcedures className="v-icons"/></p>
                  <p>Emergency History</p>
              </div>

              <div className="v-icon">
                  <p><FaProcedures className="v-icons"/></p>
                  <p>Emergency History</p>
              </div>

              <div className="v-icon">
                  <p><FaArchway className="v-icons"/></p>
                  <p>Home Care History</p>
              </div>

              <div className="v-icon">
                  <p><FaSignInAlt className="v-icons"/></p>
                  <p>Logout</p>
              </div>
              {/* <span><FaTh className="doc-icon"/>Dashboard</span> */}
           </div>
       </div>
       </>
    )
}

export default Personal
