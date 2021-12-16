import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { FiX } from "react-icons/fi";
import TextField from '@mui/material/TextField';
import './Wallet.css'

function DrugDetailsModal({ openModal, setOpenModal }) {
    return (
        <div className="details-container">
            <Dialog open={openModal}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Enter Your Bank Information
                        <IconButton onClick={() => setOpenModal(false)}>
                            <FiX />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <div class="pay-wallet-container">
                        <TextField fullWidth id="outlined-basic" label="Enter Amount" variant="outlined" />
                    </div>

                    <div class="pay-wallet-container">
                        <TextField fullWidth id="outlined-basic" label="Enter Bank Name" variant="outlined" />
                    </div>

                    <div class="pay-wallet-container">
                        <TextField fullWidth id="outlined-basic" label="Enter Account Name" variant="outlined" />
                    </div>

                    <div class="pay-wallet-container">
                        <TextField fullWidth id="outlined-basic" label="Enter Account Number" variant="outlined" />
                    </div>

                    <div class="pay-wallet-container">
                        <TextField multiline fullWidth id="outlined-basic" label="comment" variant="outlined" />
                    </div>

                    <div class="pay-wallet-container">
                       <button>Send Request</button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}
export default DrugDetailsModal
