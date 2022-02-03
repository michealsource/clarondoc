import React, { useState, useEffect } from 'react'
import { FaInfo } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'date-fns';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
// MODAL IMPORTATION
// import ModalProfile from '../../Component/Modal/ModalProfile';
import TextField from '@mui/material/TextField';
import './SavedDoctors.css'
import MainLayout from '../MainLayout';
import { fetchDoctors } from '../../Api/doctors';
import { makeBooking } from '../../Api/doctors';
import load from '../../images/loading.gif'

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
function SavedDoctors() {
    const [openModal, setOpenModal] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = (doc) => {
        setOpen(true);
        setValue(doc)
        console.log(value)
    }
    const handleClose = () => setOpen(false);
    const [selectedDate, setSelectedDate] = useState();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [loading, setloading] = useState(true)
    const [doctors, setDoctors] = useState([])
    const [filtered, setFiltered] = useState([])
    const [value, setValue] = useState()
    const [time, setTime] = useState('')
    const [date, setDate] = useState()
    const [reason,setReason]= useState('')
    const [error, setError] = useState()

    

    const available =['06:00 - 07:00','07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00','12:00 - 13:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00','16:00 - 17:00','17:00 - 18:00','18:00 - 19:00','19:00 - 20:00','20:00 - 21:00'];
    useEffect(() => {
        (async () => {
            let saved = localStorage.getItem('saved')
            if (saved == null) {
                return setloading(false)
            }
            saved = saved.split(',')
            let found = (await fetchDoctors()).filter(doc => saved.includes(doc.email))
            setDoctors(found)
            setFiltered(found)
            setloading(false)

        })()
    }, [])


    const book = async()=>{
        if(reason.length === 0){
            setError('Please provide reason for the booking')
            return
        }

        try{
            const res = await makeBooking({
                physicianId: value?value.id:'',
                schedule: date,
                symptoms: [reason]
            })

            // console.log(res)
            
            if(res.success){
               swal({
                title: `${value.firstname}  ${value.lastname} has received your call booking.`,
                text: "You will be notified when they respond",
                icon: "success",
              })
              setOpen(false);
            }else{
                alert('Booking Error confirmed')
            }

        }catch(e){
            setError(e)
        }
    }

    console.log(date)
    return (
        <MainLayout>
            <div className="doctors">
                <div class="demand-container">
                    <h1 class="heading-fav">List of Your Favourite<span> Doctors</span></h1>
                </div>
                <div class="saved-doc-caontainer">
                    {
                        loading ? (<img src={load} alt="" className="loader-img" />) :
                            filtered.length === 0 ? <p>You have not saved any doctor yet.</p>
                                : filtered.map(doc => (
                                    <div class="box-saved" id={doc.email}>
                                        <div class="sav-img-container">
                                            <img className='saved-doc-img' src={doc.avatar} alt="" />
                                            <div class="saved-inner-container">

                                                <div class="saved-action-share">
                                                    <BsFillChatSquareTextFill />
                                                    <p>Chat</p>
                                                </div>

                                                <div onClick={() => handleOpen(doc)} class="saved-action-share">
                                                    <FaRegCalendarAlt />
                                                    <p>Book</p>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className='saved-doc-name'>{doc.firstname} {doc.lastname}</h6>
                                        <span className="title">{doc.department}</span>
                                    </div>
                                ))
                    }

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        fullWidth
                    >
                        <Box sx={style} style={{ width: 1000 }} >
                            <h2 style={{marginBottom:20}}>{value ? value.firstname: ''} Availability</h2>
                            <div>
                                <TextField
                                    id="date"
                                    label="Book Date"
                                    type="date"
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
                    </Modal>
                </div>
                {/* {openModal && <ModalProfile closeModal={setOpenModal} />} */}
            </div>
        </MainLayout>
    )
}

export default SavedDoctors
