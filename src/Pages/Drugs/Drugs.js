import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Drugs.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import drug from '../../images/drug.png'
import labrequest from '../../images/labrequest.png'
import pharmacist from '../../images/pharmacist.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Drugs() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="drugs-container">
      <div className="cards">
        <div class="card-container">
          <Link to="/otcdrugs" class="card-box">
            <img src={drug} alt="" />
            <h4>Get OTC Drugsy</h4>
          </Link>

          <div onClick={handleOpen} class="card-box">
            <img src={labrequest} alt="" />
            <h4>Get Prescribed Drugs</h4>
          </div>

          <Link to="/consultation" class="card-box">
            <img src={pharmacist} alt="" />
            <h4>Consult with Pharmacist</h4>
          </Link>
        </div>
      </div>

      <div class="drugs-order-history">
        <h2>Drugs Order History</h2>

        <section class="two-column">
        <div class="histry-box">
          <div class="drugs-hisory-container">
              <div className="drug-histor-title">
                <p>Status: <span className="drugs-status">Pending</span></p>
                <p>Order Id:</p>
                <p>Order Date:</p>
                <p>Delivery Type:</p>
                <p>Prescription:</p>
                <p>Drug Name:</p>
                <p>Total:</p>
              </div>

              <div className="drug-history-values">
                <p></p>
                <p></p>
                <p>69cf33ffbe-6013-4cf-ab6e-151200110c7d2</p>
                <p>09/11/2021 12:25 AM</p>
                <p>Not stated</p>
                <p>not required</p>
                <p>ZINCVIT SYRUP</p>
                <p className="price-drugs">GHS 26.66</p>
                <Link to="/OrderReview" className="drug-his-btn">Make Payment</Link>
              </div>

            </div>

          </div>

          <div class="histry-box">
          <div class="drugs-hisory-container">
              <div className="drug-histor-title">
                <p>Status: <span className="drugs-status">Pending</span></p>
                <p>Order Id:</p>
                <p>Order Date:</p>
                <p>Delivery Type:</p>
                <p>Prescription:</p>
                <p>Drug Name:</p>
                <p>Total:</p>
              </div>

              <div className="drug-history-values">
                <p></p>
                <p></p>
                <p>69cf33ffbe-6013-4cf-ab6e-151200110c7d2</p>
                <p>09/11/2021 12:25 AM</p>
                <p>Not stated</p>
                <p>not required</p>
                <p>ZINCVIT SYRUP</p>
                <p className="price-drugs">GHS 26.66</p>
                <Link to="/OrderReview" className="drug-his-btn">Make Payment</Link>
              </div>

            </div>

          </div>
        </section>




      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="upload-prescribe">Please upload images of valid Prescription from your doctor.</p>
          <input type="file" />
          <br />
          <button className="upload-prescr-btn">Upload Prescription</button>
        </Box>
      </Modal>
      <div>
      </div>
    </div>
  )
}

export default Drugs
