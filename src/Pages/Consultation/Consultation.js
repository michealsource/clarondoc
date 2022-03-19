import React, { useState,useEffect } from 'react'
import { FaInfo } from "react-icons/fa";
import { FaRegCalendarAlt, FaHeart,FaPhoneAlt } from "react-icons/fa";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'date-fns';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MainLayout from '../MainLayout';
import moment from 'moment';
import swal from 'sweetalert';
// MODAL IMPORTATION
import ScheduleAppointment from '../../Component/ScheduleAppointment/ScheduleAppointment'
import ActionsModal from './ActionsModal';
import DoctorProfile from './DoctorProfile';
import './Consultation.css'
// import PrescriptionModal from '../../Component/PrescriptionModal/PrescriptionModal'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router';
import {userDetails,downgrade} from '../../Api/Auth'
import { fetchDoctors } from '../../Api/doctors';
import { makeBooking } from '../../Api/doctors';
import doctorDefault from '../../images/doctor.png'
import loading from '../../images/loading.gif'
import {useSelector } from 'react-redux'
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
function Consultation() {
    const userData = useSelector((state)=>state.user.value)
    const [openModal, setOpenModal] = useState(false)
    const [open, setOpen] = useState(false);
    const[call, setCall] = useState(false)
    const handleOpen = (doctor) => {
        setOpen(true);
        setValue(doctor)
    }
    const handleClose = () => setOpen(false);

     const [openP, setOpenP] = React.useState(false);
     const  handleCloseProfile = () => setOpenP(false);
     const [selectedData, setSelectedData] = useState({});
    const [selectedDate, setSelectedDate] = useState();
    const [others, setOthers] = useState(false)
    const [doctors, setDoctors] = useState([])
    const [selected, setSelected]= useState({})
    const [value, setValue] = useState()
    const [date, setDate] = useState()
    const [reason,setReason]= useState('')
    const [error, setError] = useState()
    const [time, setTime] = useState('')
    const [user, setUser] = useState({})
    const [expiry, setexpiry] = useState()
    const [loaded, setloaded] = useState(false)
    const [favorites, setfavorites] = useState([])
    const [loading, setloading] = useState(false)
    const available =['06:00 - 07:00','07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00','12:00 - 13:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00','16:00 - 17:00','17:00 - 18:00','18:00 - 19:00','19:00 - 20:00','20:00 - 21:00'];
    // Search State
    const [filtered,setFiltered]= useState([]);
    const [searchInput, setSearchInput] = useState("")

    const navigate = useNavigate()

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    const changeInput = () => {
        setOthers(!others)
    }

    // HANDLING PROFILE PAGE
    const handleOpenProfile = (selectedRec) => {
        setSelectedData(selectedRec);
        setOpenP(true)
      };

    const checkSubscription = async(date)=>{

        if(date == null){
            return
        }

        const days = moment().diff(date, 'days')
        const left = moment(date).add(1, 'day').fromNow()

        if(days === 0){
            setexpiry('Your subscription ends today. Renew now to avoid losing access to services')
        }else if (days < 0 && days > -11){
            setexpiry(`Your subscription ends in ${left}. Renew now to avoid losing access to services`)
        }else if(days > 0 && days < 10){
            setexpiry(`Your subscription ended ${left}. Renew now to avoid losing access to services`)
        }else if(days > 10){
            let res = await downgrade()
            console.info(res)
            // setexpiry(`Your subscription ended ${left}. Renew now to avoid losing access to services`)
        }
    }

    // SEARCH FUNCTIONALITY FUNCTION
    const searchPatient =(searchValue)=>{
        setSearchInput(searchValue);
        if(searchInput){
            const filteredPatient = doctors.filter((doc)=>(
                Object.values(doc).join("").toLowerCase().includes(searchValue.toLowerCase())
            ))
            setFiltered(filteredPatient)  
        }else{
            setFiltered(doctors)
        }
    }


useEffect(()=>{
    (async()=>{
        let account = localStorage.getItem('user')
        let token  = localStorage.getItem('access-token')
        let key = localStorage.getItem('api-key');
        setUser(JSON.parse(account))
        let found = await fetchDoctors()
        setDoctors(found)
        console.log(favorites)
        userDetails(JSON.parse(account).email, key, token).then(data=>{
            setUser(data)
        }).catch(e=>{
            console.log('Error: ', e)
        })

        if(!loaded){
            let saved = localStorage.getItem('saved')
            if(saved == null){
                return
            }
            // console.log(saved)
            setfavorites(saved.split(','))
            setloaded(true)
        }

        try{
            checkSubscription(JSON.parse(account).subscription_end);
        }catch(e){}

        // ['Family', 'Premium'].includes(JSON.parse(account).subscription) ?
        //     setMenu(secondary) :
        // ['Basic'].includes(JSON.parse(account).subscription) ? setMenu(basic) : setMenu(main)
        
    })()

}, [])

// SCHEDULE APPOINTMENT FUNCTION
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

// ADD TO FAVOUURITE FUNCTION
const favorite = async(email)=>{
    setloading(true)
    if(favorites.includes(email)){
        setfavorites(favorites.filter(fav=>fav!=email))
        localStorage.setItem('saved', favorites.filter(fav=>fav!=email).toString())
        alert('saved already')
    }else{
        setfavorites([...favorites, ...[email]])
        localStorage.setItem('saved', [...favorites, ...[email]].toString())
        alert('saved.....')
    }
    setloading(false)
}

    return (
        <MainLayout >
        <div className="doctors">
            <div class="demand-container">
                <h1 class="heading">Talk to a Health Care <span>Professional</span></h1>
                <Link to="/demandbooking" className="demand-booking-btn">
                    On Demand Booking
                </Link>
            </div>
            <div class="doctor-input-container">
                <input type="text"
                onChange={(e)=>searchPatient(e.target.value)}
                placeholder="Search for doctor by name, department or email" />
            </div>
            {searchInput.length> 0?
            <div class="box-container">
            
                {filtered.length? filtered.map((doctor) => (
                    <div class="box" id={doctor.email}>
                        {doctor.availability === 'Online'?<div className="active-state">Active</div>:''}
                        
                        <img src={doctor.avatar} alt="" />
                        <h3 className='doc-name-consult'>{doctor.firstname} {doctor.lastname}</h3>
                        <span className="title">{doctor.department}</span>
                        <div class="share">
                       <div class="action-container"
                           onClick={()=>handleOpenProfile(doctor)}
                       >
                           <FaInfo className="doctor-icon" />
                           <span> About</span>
                       </div>
   
                       <div 
                       onClick={ ()=>userData.subscription === null || userData.subscription === 'Normal'  || userData.subscription === 'Pay As You go'? navigate('/PayAsYouGo',{ state: { name: 'Chat', price: 50,doctor} }): navigate('/chat',{state:{doctor}}) }
                       class="action-container">
                           <BsFillChatSquareTextFill className="doctor-icon" />
                           <span>Chat</span>
                       </div>
                      
                       <div onClick={ ()=>userData.subscription === null || userData.subscription === 'Normal' || userData.subscription === 'Pay As You go'? navigate('/PayAsYouGo',{ state: { name: 'Pay As You go', price: 50,doctor} }): handleOpen(doctor)} class="action-container">
                           <FaRegCalendarAlt className="doctor-icon" />
                           <span>Book</span>
                       </div>
   
                       <div onClick={()=>favorite(doctor.email)} class="action-container">
                           <FaHeart  className="doctor-icon" />
                           <span> { loading ? 'Saving...' : favorites.includes(doctor.email) ? 'Remove' : 'Save'}</span>
                           {/* <span>Favourite</span> */}
                       </div>
                       {/* <div onClick={() => setCall(!call)} class="action-container">
                           <FaPhoneAlt className="doctor-icon" />
                           <span>Call</span>
                       </div> */}
                   </div>
                    </div>
                    
                )):(<img src={loading} alt="" className="loader-img"/>)}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DateTimePicker

                                InputAdornmentProps={{ position: "end" }}
                                inputVariant="outlined"
                                label="Select Propse Date and Time"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                       {others && <TextField className="others" id="outlined-multiline-flexible" label="Others" multiline/>}
                        {others ? '' : <ScheduleAppointment changeInput={changeInput} />}

                        <button className="schedule-app-btn">Submit Request</button>
                    </Box>
                </Modal>
            </div>:
            (
                <div class="box-container">
            
                {doctors.length? doctors.map((doctor) => (
                   <div key={doctor.email} class="box" id={doctor.email}>
                   {doctor.availability === 'Online' ? <div className="active-state">Active</div> : ''}
                
                   <img src={doctor.avatar && doctor.avatar !=="undefined" ?doctor.avatar:doctorDefault} alt="avatar" />

                   <h6 className='doc-name-consult'>{doctor.firstname} {doctor.lastname}</h6>
                   <span className="title">{doctor.department}</span>
                   <div class="share">
                       <div class="action-container"
                           onClick={()=>handleOpenProfile(doctor)}
                       >
                           <FaInfo className="doctor-icon" />
                           <span> About</span>
                       </div>
   
                       <div 
                       onClick={ ()=>userData.subscription === null || userData.subscription === 'Normal'  || userData.subscription === 'Pay As You go'? navigate('/PayAsYouGo',{ state: { name: 'Chat', price: 50,doctor} }): navigate('/chat',{state:{doctor}}) }
                       class="action-container">
                           <BsFillChatSquareTextFill className="doctor-icon" />
                           <span>Chat</span>
                       </div>
                      
                       <div onClick={ ()=>userData.subscription === null || userData.subscription === 'Normal' || userData.subscription === 'Pay As You go'? navigate('/PayAsYouGo',{ state: { name: 'Pay As You go', price: 50,doctor} }): handleOpen(doctor)} class="action-container">
                           <FaRegCalendarAlt className="doctor-icon" />
                           <span>Book</span>
                       </div>
   
                       <div onClick={()=>favorite(doctor.email)} class="action-container">
                           <FaHeart  className="doctor-icon" />
                           <span> { loading ? 'Saving...' : favorites.includes(doctor.email) ? 'Remove' : 'Save'}</span>
                           {/* <span>Favourite</span> */}
                       </div>
                       {/* <div onClick={() => setCall(!call)} class="action-container">
                           <FaPhoneAlt className="doctor-icon" />
                           <span>Call</span>
                       </div> */}
                   </div>
               </div>
   
                )):(<img src={loading} alt="" className="loader-img"/>)}

                    {/* BOOK DOCTOR MODAL */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        fullWidth
                        className="modal-book-container"
                        
                    >
                        <Box sx={style} style={{ width: 1000 }} className="modal-book-container" >
                            <h2 style={{marginBottom:20}}>{value ? value.firstname: ''} Availability</h2>
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
                    </Modal>

                {/* DOCTORS DETAILS PROFILE MODAL */}
               
            </div>
            )}
            <DoctorProfile  selectedData={selectedData} openP={openP} handleCloseProfile={handleCloseProfile} />
            <ActionsModal call={call} setCall={setCall}/>
        </div>
        </MainLayout>
    )
}

export default Consultation
