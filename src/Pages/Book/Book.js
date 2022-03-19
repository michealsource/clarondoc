import React,{useState} from 'react'
import MainLayout from '../MainLayout';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from "react-router-dom";
import { makeBooking } from '../../Api/doctors';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import {FaTimes } from "react-icons/fa";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function Book() {
    const available =['06:00 - 07:00','07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00','12:00 - 13:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00','16:00 - 17:00','17:00 - 18:00','18:00 - 19:00','19:00 - 20:00','20:00 - 21:00'];
    // Search State
    const {state} = useLocation();
    const navigate = useNavigate()
    const { doctor } = state;
    const [date, setDate] = useState()
    const [time, setTime] = useState('')
    const [reason,setReason]= useState('')
    const [error, setError] = useState()

    const book = async()=>{
        if(reason.length === 0){
            setError('Please provide reason for the booking')
            return
        }
    
        try{
            const res = await makeBooking({
                physicianId: doctor?doctor.id:'',
                schedule: date,
                symptoms: [reason]
            })
    
            // console.log(res)
            
            if(res.success){
               swal({
                title: `${doctor.firstname}  ${doctor.lastname} has received your call booking.`,
                text: "You will be notified when they respond",
                icon: "success",
              })
              navigate("/userDashboard")
            }else{
                alert('Booking Error confirmed')
            }
    
        }catch(e){
            setError(e)
        }
    }

    const handleGoBack = () => {
        navigate(-1)
    }
  return (
      <MainLayout>
          <div className='book-container-pay-as-go'>

        
           <Box sx={style} style={{ width: 1000 }} className="modal-book-container" >
                <div class="close-avali-container">
                <h2 style={{marginBottom:20}}>{doctor ? doctor.firstname: ''} Availability</h2>
                  
                                    <FaTimes className='cloxe' onClick={() => handleGoBack()}/>

                </div>

                            <div>
                                <TextField
                                    id="date"
                                    label="Book Date"
                                    type="date"
                                    className='avilability-booking-input'
                                    defaultValue={date}
                                    fullWidth
                                    onChange={(e)=>setDate(e.target.value)}
                                    sx={{ width: 400 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                     <h4 style={{marginTop:20, marginBottom:10}}> Select Doctor Availabilty Time</h4>
                                <div className="time-availability">
                                    {available.map((t,index)=>(
                                    <div className='time-btn-contaner'>
                                    <input onChange={(e)=>setTime(e.target.value)} type="radio" className="radio-input" value={t} name="claron-radio" id={index}/>
                                    <label className='time-btn' htmlFor={index}>{t}</label>
                                    </div>
                                  
                                    ))}
                                </div>

                                 <p style={{color:'red'}}>{error? error:''}</p>     
                                <TextField value={reason} onChange={(e)=>setReason(e.target.value)}  style={{marginTop:20}} fullWidth id="standard-basic" label="Please provide reasons for the consultation" variant="standard" />
                                <Button onClick={book} style={{marginTop:20, background:'#16a085'}} variant="contained">CONFIRM BOOKING</Button>
                            </div>
                        </Box>
                        </div>
      </MainLayout>
   
  )
}

export default Book