import React, { useState,useEffect } from 'react'
import { FaInfo } from "react-icons/fa";
import { FaRegCalendarAlt, FaHeart,FaPhoneAlt } from "react-icons/fa";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'date-fns';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MainLayout from '../MainLayout';
import moment from 'moment';
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
import DocCard from './DocCard';

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
    const [openModal, setOpenModal] = useState(false)
    const [open, setOpen] = useState(false);
    const[call, setCall] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

     const [openP, setOpenP] = React.useState(false);
     const  handleCloseProfile = () => setOpenP(false);
     const [selectedData, setSelectedData] = useState({});

    const [selectedDate, setSelectedDate] = useState();
    const [others, setOthers] = useState(false)

    const [doctors, setDoctors] = useState([])
    const [selected, setSelected]= useState({})

    const [user, setUser] = useState({})
    const [expiry, setexpiry] = useState()
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

    // SPECIFIC DOCTOR ROUTE FUNCTION
    

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

        userDetails(JSON.parse(account).email, key, token).then(data=>{
            setUser(data)
        }).catch(e=>{
            console.log('Error: ', e)
        })

        try{
            checkSubscription(JSON.parse(account).subscription_end);
        }catch(e){}

        // ['Family', 'Premium'].includes(JSON.parse(account).subscription) ?
        //     setMenu(secondary) :
        // ['Basic'].includes(JSON.parse(account).subscription) ? setMenu(basic) : setMenu(main)
        
    })()

}, [])
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
            
                {filtered.map((doctor) => (
                    <div class="box" id={doctor.email}>
                        {doctor.availability === 'Online'?<div className="active-state">Active</div>:''}
                        
                        <img src={doctor.avatar} alt="" />
                        <h3 className='doc-name-consult'>{doctor.firstname} {doctor.lastname}</h3>
                        <span className="title">{doctor.department}</span>
                        <div class="share">
                            <div class="action-container" onClick={handleOpenProfile}
>
                                <FaInfo className="doctor-icon" />
                                <span> About</span>
                            </div>


                            <Link to="/chat" class="action-container">
                                <BsFillChatSquareTextFill className="doctor-icon" />
                                <span>Chat</span>
                            </Link>

                            <div onClick={handleOpen} class="action-container">
                                <FaRegCalendarAlt className="doctor-icon" />
                                <span>Book</span>
                            </div>

                            <div class="action-container">
                                <FaHeart className="doctor-icon" />
                                <span>Favourite</span>
                            </div>
                            <div onClick={()=>setCall(!call)} class="action-container">
                                <FaPhoneAlt className="doctor-icon" />
                                <span>Call</span>
                            </div>

                        </div>
                    </div>
                    
                ))}

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
            
                {doctors.map((doctor) => (
                   <div key={doctor.email} class="box" id={doctor.email}>
                   {doctor.availability === 'Online' ? <div className="active-state">Active</div> : ''}
   
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
   
                       <div onClick={()=>navigate('/chat',{state:doctor})}  class="action-container">
                           <BsFillChatSquareTextFill className="doctor-icon" />
                           <span>Chat</span>
                       </div>
   
                       <div onClick={handleOpen} class="action-container">
                           <FaRegCalendarAlt className="doctor-icon" />
                           <span>Book</span>
                       </div>
   
                       <div class="action-container">
                           <FaHeart className="doctor-icon" />
                           <span>Favourite</span>
                       </div>
                       <div onClick={() => setCall(!call)} class="action-container">
                           <FaPhoneAlt className="doctor-icon" />
                           <span>Call</span>
                       </div>
                   </div>
               </div>
   
                ))}

                    {/* BOOK DOCTOR MODAL */}
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

                {/* DOCTORS DETAILS PROFILE MODAL */}
               
            </div>
            )}
            <DoctorProfile selectedData={selectedData} openP={openP} handleCloseProfile={handleCloseProfile} />
            <ActionsModal call={call} setCall={setCall}/>
        </div>
        </MainLayout>
    )
}

export default Consultation
