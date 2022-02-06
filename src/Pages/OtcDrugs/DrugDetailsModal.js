import React, {useState} from 'react'
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
                            <img className="drug-details-img" src={product.avatar} alt="drug-image"/>
                            <div class="drug-name-and-price">
                                <h4>{product.name}</h4>
                                <p>GHS{product.unitprice}</p>
                            </div>
                            <div class="summary-contaner">
                            <h2>Description</h2>
                            <p>{product.description}</p>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DrugDetailsModal
