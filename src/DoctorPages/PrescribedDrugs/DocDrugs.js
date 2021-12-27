import React from 'react'
import TextField from '@mui/material/TextField';
import drug4 from '../../images/drug-4.jpg'
import DoctorLayout from '../../Pages/DoctorLayout';
const drugs = [
    {
        id: 1,
        name: "VITANIN B DENK",
        price: "GHS1.79"
    },
    {
        id: 2,
        name: "ZINCOFER CAPSULES",
        price: "GHS1.79"
    },
    {
        id: 3,
        name: "ZINC TABLET- 20MG",
        price: "GHS1.79"
    },
    {
        id: 4,
        name: "VITANIN B DENK",
        price: "GHS1.79"
    },
    {
        id: 5,
        name: "VITANIN B DENK",
        price: "GHS1.79"
    }, {
        id: 6,
        name: "VITANIN B DENK",
        price: "GHS1.79"
    },
    {
        id: 7,
        name: "VITANIN B DENK",
        price: "GHS1.79"
    },
    {
        id: 8,
        name: "VITANIN B DENK",
        price: "GHS1.79"
    },
    {
        id: 9,
        name: "VITANIN B DENK",
        price: "GHS1.79"
    }
]

function DocDrugs() {
    return (
        <DoctorLayout>
        <div>
            <div className="doc-prescribe-drugs-container">
                <h2>Select Drugs for Patient</h2>
                    <TextField label="Search For Drugs" className="drug-sarch-textfield"/> 
                <div class="doc-drugs-prscribe-container">

                    {drugs.map((drug) => {
                        return (
                            <>
                                <div className="doc-drug-col">
                                    <img src={drug4} alt="" />
                                    <p className="doc-drug-name">{drug.name}</p>
                                    <p><span className="discount">{drug.price}</span> <span className="f-price">{drug.price}</span></p>
                                    <div class="increase-doc-decrease-btn-contaner">
                                        <button>+</button>
                                        <span>0</span>
                                        <button>-</button>
                                    </div>
                                    <button className="doc-add-to-cart">Add to Cart</button>
                                </div>
                            </>
                        )
                    })}

                </div>

            </div>
        </div>
        </DoctorLayout>
    )
}

export default DocDrugs
