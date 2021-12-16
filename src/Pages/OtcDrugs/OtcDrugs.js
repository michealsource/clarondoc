import React,{useState} from 'react'
import './OtcDrugs.css'
import { FaShareAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import drugsone from '../../images/drug-one.jpg'
import {Link } from "react-router-dom"

import DrugDetailsModal from './DrugDetailsModal';
const data = [
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
function OtcDrugs() {

    const[openModal, setOpenModal] = useState(false)
    const[product, setProduct]= useState({})
    return (
        <div className="pharmacy-container">
            {data.map((data) => (
                <Link to="" class="drugs-container-out" key={data.id} onClick={()=>{setOpenModal(true); setProduct(data)}}>
                    <div class="drugs-icons">
                        <FaShareAlt className="drug-icon" />
                        <FaHeart className="drug-icon" />
                    </div>
                    <img className="drug-img" src={drugsone} alt="" />
                    <p className="drug-title">{data.name}</p>
                    <p class="price">Price</p>
                    <h2 className="price">{data.price}</h2>

                    <div class="drugs-button-actions">
                        <div class="buy">
                            Buy
                        </div>
                        <div class="add-to-cart">
                            <FaShoppingCart className="card" />
                            Add to Cart
                        </div>
                    </div>
                </Link>
            ))}

            <DrugDetailsModal openModal={openModal} setOpenModal={setOpenModal} product={product}/>
        </div>
    )
}
export default OtcDrugs
