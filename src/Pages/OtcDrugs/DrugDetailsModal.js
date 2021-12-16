import React from 'react'
import {Grid,Box,Dialog,DialogTitle,DialogContent,IconButton} from '@mui/material';
import { FiX } from "react-icons/fi";
import drugsone from '../../images/drug-one.jpg'

function DrugDetailsModal({openModal,setOpenModal,product}) {
    return (
        <div className="details-container">
            <Dialog open={openModal}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    Drug Details
                    <IconButton onClick={()=>setOpenModal(false)}>
                        <FiX/>
                    </IconButton>    
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <img className="drug-details-img" src={drugsone} alt=""/>
                            <div class="drug-name-and-price">
                                <h4>{product.name}</h4>
                                <p>GHS20.8</p>
                            </div>
                            <div class="qty-container">
                                <button>-</button>
                                <h5>3</h5>
                                <button>+</button>
                            </div>
                            <div class="summary-contaner">
                            <h2>Summary</h2>
                            <p>ALL PICTURES SHOWN ARE FOR ILLUSTRATION PURPOSE ONLY ACTUAL PRODUCT MAY VARY DUE TO PRODUCT ENHANCEMENT</p>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DrugDetailsModal
