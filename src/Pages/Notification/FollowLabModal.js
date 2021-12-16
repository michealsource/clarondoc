import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { FiX } from "react-icons/fi";
import{Link} from 'react-router-dom'
import './Notification.css'

function FollowLabModal() {
    return (
        <div>
             <Dialog open={false} fullWidth={true}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Prescribed Lab Test
                        <IconButton >
                            <FiX />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <div class="lab-container">
                        <div class="title-lab">
                            <p>Hepatitis B Screen</p>
                            <p>Recticulocyte Count</p>
                            <p>D-Dimer Quantitative</p>
                        </div>
                        <div class="title-lab-price">
                            <h4>GHS40.00</h4>
                            <h4>GHS70.00</h4>
                            <h4>GHS150.00</h4>
                        </div>
                    </div>
                    <div class="pay-drug-btn-container">
                                 <Link to ="/OrderReview" className="pay-drug-btn">Checkout</Link>
                           </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FollowLabModal
