import React, { useState } from 'react'
import "./cart.css"
import { Grid, Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { FiX } from "react-icons/fi";
import drugsone from '../../images/drug-one.jpg'
import Badge from '@mui/material/Badge';
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"


function DrugDetailsModal({ openModal, setOpenModal, cartItem }) {

    const [ttotal, setTotal] = useState(0)

    const navigate = useNavigate()


    const totalBill = () => {
        let total =0
        for(let i = 0;i< cartItem.length; i++){
            const subtotal = cartItem[i].drug.unitprice * cartItem[i].quantity 
            total =  total + subtotal
        }
        return parseFloat((total).toFixed(2))
    }

    return (
        <div className="details-container">
            <Link to="" className="notification" onClick={() => setOpenModal(true)}>
                <Badge badgeContent={cartItem.length} color="success">
                    <FaShoppingCart className="card" />
                </Badge>
            </Link>
            <Dialog open={openModal}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        My Items
                        <IconButton onClick={() => setOpenModal(false)}>
                            <FiX />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {
                        cartItem.map(product => (

                            <div className="cart-container">
                                <div className="cart-item_view">
                                    <img className="cart-drug-img" src={product.drug.avatar} alt="drug-image" />
                                    <div class="cart-drug-name-and-price">
                                        <h4>{product.drug.name}</h4>
                                        <h5>{product.quantity}</h5>
                                        <p>GHS{parseFloat((product.drug.unitprice * product.quantity).toFixed(2))}</p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    <hr />


                    <div class="total_view">
                        <h2>Total:</h2>
                        <p>{totalBill()}</p>
                    </div>
                   
                   <div class="cart-checkout" onClick={() => navigate("/OrderReview", {state:{
                       totalCost: totalBill(),
                       type: "Pharmacy",
                       discount: 0,
                       netTotal: totalBill()
                   }})} >
                        <p>CHECKOUT</p>
                    </div>
                   
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DrugDetailsModal
