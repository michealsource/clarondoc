import React from 'react'
import './IndividualModal.css'

function IndividualModal() {
    return (
        <div className="IndividualModal">
            <div class="indiviualModal-wrapper">
                <input type="text" placeholder="Patient Name" />
                <input type="date" placeholder="Date of birth" />
            </div>

            <div class="consult-medium-container">
        
                <label for="">Gender</label>

                <label>
                    <input type="radio" class="option-input radio" name="example" />
                    Male
                </label>
                <label>
                    <input type="radio" class="option-input radio" name="example" />
                    Female
                </label>
            </div>
        </div>
    )
}

export default IndividualModal
