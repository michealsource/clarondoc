import React,{useState, useEffect} from 'react'
import './OtcDrugs.css'
import { FaShareAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import drugsone from '../../images/drug-one.jpg'
import {Link } from "react-router-dom"
import MainLayout from "../MainLayout"
import DrugDetailsModal from './DrugDetailsModal';
import {fetchDrugs} from "../../Api/pharmacy"
import loading from '../../images/loading.gif'

function OtcDrugs() {

    const[openModal, setOpenModal] = useState(false)
    const[product, setProduct]= useState({})
    const [drugs, setDrugs] = useState([])

   useEffect(() => {
        const getAllDrugs = async () => {
           const drug = await fetchDrugs(false)
           console.log(drug)
           setDrugs(drug)
        }
        getAllDrugs()
   }, [])

    return (
        <MainLayout>
        <div className="pharmacy-container">
            
            {drugs.length ? drugs.map((data) => (
                <Link to="" class="drugs-container-out" key={data.id} onClick={()=>{setOpenModal(true); setProduct(data)}}>
                    <div class="drugs-icons">
                        <FaShareAlt className="drug-icon" />
                        <FaHeart className="drug-icon" />
                    </div>
                    <img className="drug-img" src={data.avatar} alt="drug-image" />
                    <p className="drug-title">{data.name}</p>
                    <p class="price">Price</p>
                    <h2 className="price">GHS{data.unitprice}</h2>

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
            )): (<img src={loading} alt="" className="loader-img"/>)}

            <DrugDetailsModal openModal={openModal} setOpenModal={setOpenModal} product={product}/>
        </div>
        </MainLayout>
    )
}
export default OtcDrugs
