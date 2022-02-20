import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Drugs.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import drug from '../../images/drug.png'
import labrequest from '../../images/labrequest.png'
import pharmacist from '../../images/pharmacist.png'
import MainLayout from '../MainLayout';
import * as API from '../../Api/pharmacy'
import loading from '../../images/loading.gif'
import swal from 'sweetalert';
// import {S3} from 'aws-sdk'
// import { uploadFile } from 'react-s3';
import S3FileUpload from 'react-s3';
import S3 from 'react-aws-s3';
import firebase from '../../firebaseConfig';

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

  const [bookings, setBookings] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [file, setFile] = useState(null)
  const [prescription, setPrescription] = useState()
  const [loadinga, setloadinga] = useState(false)
  const [prescriptiona, setprescriptiona] = useState(false)
  const [progress , setProgress] = useState(0);

  useEffect(()=>{
    (async()=>{

      if(!loaded){
        try{
            let res
            res = await API.myPharmacyOrders()
            setBookings(res.orders)
            setFiltered(res.orders)
            console.log(bookings)
        }catch(e){
          console.log(e)
        }
        setLoaded(true)
      }

    })()
  }, [])



  const prescriptionUpload = async(e)=>{
    setloadinga(true)
    if(file){

        await firebase.storage().ref('prescriptions/' + file.name).put(file);
        let url = await firebase.storage().ref(`prescriptions`).child(file.name).getDownloadURL()
        
         if(url){
            setloadinga(false)
            setPrescription(url)
            setprescriptiona(false)
            localStorage.setItem('prescription', JSON.stringify(url))
            handleClose()
            
            swal({
                title: "Prescription Upload",
                text: "uploaded prescription to server",
                icon: "success",
                button: "Ok",
              });
         }
    }
    
  }

  return (
    <MainLayout>
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
              <div className="his-container-cont-drug">
               
                  <>
                {bookings.length? bookings.map((item)=>(
                            <>
                            <div className='single-drug-history'>
                            <h6>PHARMACY ORDER</h6>  
                            <div className='order-contain'>
                             {item.drugsOrdered.map(drug=>(
                               <div className='booked-container'>
                               <p className='drug-n'>{drug.drugName}</p>
                               <p className='qty'>{drug.quantity}</p>
                               </div>
                             ))}
                              
                            </div>
                            <div className='booked-container'>
                              <p className='a-head'>Ordered On:</p> 
                              <p>{new Date(item.createDate).toString().substring(0, 21)}</p>
                            </div>
                            {/* <div className='booked-container'>
                              <p className='a-head'>Order Status: </p> 
                              <p className={item.status=='Pending'?'pending':item.status == 'Cancelled'?'danger':item.status == 'Completed' ? 'success' : 'info'}>{item.status}</p> 
                            </div> */}
                            <div className='booked-container'>
                              <p className='a-head'>Ordered Type:</p> 
                              <p>{item.deliveryOption}</p> 
                              </div>
                            {/* <div className='divider'></div> */}
                            {/* { item.status === 'Pending' ?<div><Link to="/OrderReview" className="drug-his-btn">Make Payment</Link></div>:''} */}
                            
                            </div>
                            </>
                        )):(<img src={loading} alt="" className="loader-img"/>)}
                  </>
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
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
          <br />
          <button className="upload-prescr-btn" onClick={() => prescriptionUpload()}>{loadinga ? "Uploading..." : "Upload Prescription"}</button>
        </Box>
      </Modal>
      <div>
      </div>
    </div>
    </MainLayout>
  )
}

export default Drugs
