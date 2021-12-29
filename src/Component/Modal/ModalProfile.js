import React from 'react'
import './Modal.css'
import doctor from '../../images/doc-1.jpg'
import { FaTimes} from "react-icons/fa";

function ModalProfile({closeModal,doctors}) {
    return (
        <div className="modal-background">
            <div class="modal-container">
                <FaTimes className="close-modal" onClick={()=>closeModal(false)}/>
                <div class="doctor-name">
                    <img src={doctor} alt="" className="doctor"/>
                    <h3>{doctors.firstname} {doctors.lastname}</h3>
                </div>
                <div class="doctor-title">
                    <p>Medical Laboratory Scientist</p>
                   
                </div>

                <div class="about-doctor">
                    <h2>About</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia reprehenderit excepturi soluta error eveniet repellat dicta tempore, odio ducimus repellendus?</p>
                </div>
            </div>
        </div>
    )
}

export default ModalProfile
