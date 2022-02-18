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
import {S3} from 'aws-sdk'
import { uploadFile } from 'react-s3';
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






  

  const fileUpload = async(file)=>{
    setloadinga(true)
    console.log(file, "prescription")
    const options = {
      keyPrefix: '/', // Ex. myuploads/ arn:aws:s3:::imageuploads01
      bucket: 'imageuploads01', // Ex. aboutreact
      region: 'us-east-2', // Ex. ap-south-1
      accessKey: 'AKIA24CPCGBT22ID7H5V',
      // Ex. AKIH73GS7S7C53M46OQ
      secretKey: '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',
      // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
      successActionStatus: 201,
    }

    
    try {
      console.log(options)
      
      // const resp = await S3.put({
      //   // `uri` can also be a file system path (i.e. file://)
      //   // uri: prescription.uri,
      //   name: file.name,
      //   type: file.type,
      // }, options)

      
        const resp = await uploadFile(file, options)
    

      console.log(resp, "ddddddd")
      const response = resp;

      if (response.status !== 201){
        alert('Failed to upload image to S3');
        return setloadinga(false)
      }
          
        console.log(response.body);
        // setFilePath('');
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;

        setPrescription(location)
        setprescriptiona(false)
        alert('uploaded prescription to server');
    } catch (error) {
      
    }

    setloadinga(false)
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
                            <div className='booked-container'>
                              <p className='a-head'>Order Status: </p> 
                              <p className={item.status=='Pending'?'pending':item.status == 'Cancelled'?'danger':item.status == 'Completed' ? 'success' : 'info'}>{item.status}</p> </div>
                            <div className='booked-container'>
                              <p className='a-head'>Ordered Type:</p> 
                              <p>{item.deliveryOption}</p> 
                              </div>
                            <div className='divider'></div>
                            { item.status === 'Pending' ?<div><Link to="/OrderReview" className="drug-his-btn">Make Payment</Link></div>:''}
                            
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
          <input type="file" onChange={(e) => {
            fileUpload(e.target.files[0])
          }}/>
          <br />
          <button className="upload-prescr-btn" onClick={() => fileUpload()}>{loadinga ? progress : "Upload Prescription"}</button>
        </Box>
      </Modal>
      <div>
      </div>
    </div>
    </MainLayout>
  )
}

export default Drugs
