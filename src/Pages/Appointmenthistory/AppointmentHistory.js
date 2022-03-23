import React, { useState,useEffect } from 'react'
import firebase from "../../firebaseConfig"
import './AppointmentHistory.css'
import Modal from 'react-modal'
import swal from 'sweetalert';

import {Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MainLayout from '../MainLayout';
import moment from 'moment';
import 'date-fns';
import { myBookings,DeleteBooking,respondRequest } from '../../Api/doctors';
import loading from '../../images/loading.gif'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    floatingLabelFocusStyle: {
        color: "#66cc99"
    },
    textField: {
        width: '90%',
        '.Mui-focused': {
            borderColor: 'yellow !important',
        }
    },
    tab: {
        color: "#525252",
        fontSize: '20px !important'
    },
}));

Modal.setAppElement('#root')

const Panel = (props) => (
    <div hidden={props.value !== props.index}>
        <Typography>{props.children}</Typography>
    </div>
);


function AppointmentHistory() {
    // HANDLES DATE STATE
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [index, setIndex] = useState(0);

    const onTabClicked = (event, index) => {
        setIndex(index)
        // filter(index)
    };

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const [bookings, setBookings] = useState([])
    const [filtered, setFiltered] = useState([])
    const [upcoming, setUpcoming]=useState([])
    const [loaded, setLoaded] = useState(false)
    const [loadinga, setloadinga] = useState(true);
    const [pending,setPending]= useState()

    

    useEffect(()=>{
     
        const getBookings = async()=>{
            setLoaded(true)
        
                let res = await myBookings()
                if(res){
                    setBookings(res.requests)
                    setFiltered(res.requests.filter(booking=>moment().isAfter(new Date(booking.scheduledFor))))
                    
                    setUpcoming(res.requests.filter(booking=>moment().isBefore(new Date(booking.scheduledFor))))
                    setLoaded(false)
                }
     }

        getBookings()
      },[])

      const orderedItemNames = bookings.length ? bookings.filter(b => b.status =="Pending") : []

      const cancelAppointment = async (id) =>{
        // console.log(filtered);
        try{
          setloadinga(true)
          const email = localStorage.getItem('email');
          await firebase.firestore().collection('deletedAppointment').doc(email).collection('list').add({id: id});
          swal({
            title: "Request successful",
            text: `Appointment Deleted Successfully`,
            icon: "success",
            button: "Ok",
        });  
          await respondRequest('Rejected', id);
        //   loadData();
        }catch(e){
          console.log(e)
          setloadinga(false)
        }
    
      }
    
    // console.log(orderedItemNames,'upppp')
    return (
        <MainLayout>
       
            <div class="ambulance">
                <div class="heading-container">
                    <h2 class="ambulanc-heading">APPOINTMENTS REQUEST OVERVIEWS</h2>
                   
                    <div class="laboratory-container-btn">
                    {/* <div class="individual-request">
                        <Link to="/individualRequest" className="individual-btn">INDIVIDUAL REQUEST</Link>
                    </div> */}

                    {/* <div class="medical-facility">
                        <Link to="/facilityrequest" className="facility-btn">LABORATORY REQUEST</Link>
                    </div> */}

                   
                </div>
                </div>

                <div class="ambulance-container">
                <div class="appointment-container-box">
                <div class="appointment-box one">
                    <div className="upcoming-num">{upcoming.length}</div>
                    <p>Upcoming Appointments</p>
                </div>

                <div class="appointment-box two">
                    <div className="pending-num">{orderedItemNames.length}</div>
                    <p>Pending Appointments</p>
                </div>

                {/* <div class="appointment-box three">
                    <div className="completed-num">0</div>
                    <p>Completed Appointments</p>
                </div> */}

                <div class="appointment-box four">
                    <div className="cancelled-num">0</div>
                    <p>Cancelled Appointments</p>
                </div>
            </div>
                </div>
                <div class="amblance-history-container">
                <div>
                    <Tabs value={index} onChange={onTabClicked}>
                        <Tab className={classes.tab} label="Upcoming" />
                        <Tab className={classes.tab} label="Past" />
                    </Tabs>
                    <div class="history-content">
                        <Panel value={index} index={0}>
                        <div className="top-history-container">
            <div class="row-his">
                <div className="column-his-1">
                <div class="col-container">
                    
                             <div class="his-container-cont-lab">
                             {!upcoming.length  && loaded ? (<img src={loading} alt="" className="loader-img"/>) : upcoming.length ? upcoming.map((item)=>(
                                 <>
                                 <div className='single-ambulance'>
                                  <div>
                                  <p style={{color:'#2d8f88'}}>{item.physician.fullName}</p>
                                     
                                          <div className='request-test'>
                                          <p> schedules for</p>
                                          <p>{new Date(item.scheduledFor).toString().substring(0, 21)}</p>
                                          </div>
                                     
                                 </div>  
                                 <div className='divider'></div> 
                                 <div className='booked-container'>
                                     <p onClick={()=>cancelAppointment(item.id)} className='cancel-booking-btn'>Cancel Booking</p>
                                      </div>
                                 </div>
                                 </>
                             )): 'No appointments to show'}
                             
                         </div>
                  
                </div>

                </div>

            </div>

        </div>
                        </Panel>
                        <Panel value={index} index={1}>
                        <div className="top-history-container">
            <div class="row-his">
                <div className="column-his-1">
                <div class="col-container">
                <div class="his-container-cont-lab">
                        {!filtered.length  && loaded ? (<img src={loading} alt="" className="loader-img"/>) : filtered.length ? filtered.map((item)=>(
                            <>
                            <div className='single-ambulance'>
                             <div>
                             <p style={{color:'#2d8f88'}}>{item.physician.fullName}</p>
                                     <div className='request-test'>
                                     <p>Was on</p>
                                     <p>{new Date(item.scheduledFor).toString().substring(0, 21)}</p>
                                     </div>
                                
                            </div>  
                            </div>
                            </>
                        )):"No pending appointments"}
                    </div>
                </div>

                </div>

            </div>

        </div>
                        </Panel>
                    </div>
                </div>
            </div>
                
            </div>
        
        </MainLayout>
    )
}

export default AppointmentHistory
