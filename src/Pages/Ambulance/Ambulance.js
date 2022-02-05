import React, { useState,useEffect } from 'react'
import './Ambulance.css'
import Modal from 'react-modal'
import { FaTimes } from "react-icons/fa";
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    Checkbox
} from '@material-ui/core';
import {Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MainLayout from '../MainLayout';
import swal from 'sweetalert';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import * as API from '../../Api/pharmacy'
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

function Ambulance() {
    // HANDLES DATE STATE
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [index, setIndex] = useState(0);
    const onTabClicked = (event, index) => {
        setIndex(index);
    };

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    // GETTING AMBULANCE HISTORY STATE
    const [cases, setSelectedCase] = useState("");
    const [bookings, setBookings] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [address, setAddress] = useState("")
    const [comment, setComment] = useState("")
    const [loading, setloading] = useState(false)

    useEffect(()=>{
        (async()=>{
    
          if(!loaded){
            try{
                let res
                res = await API.myAmbulanceRequests()
                setBookings(res.requests)
                setFiltered(res.requests.filter(request=>request.status === 'Completed'))
                console.log(filtered)
                
            }catch(e){
              console.log(e)
            }
            setLoaded(true)
          }
    
        })()
      }, [])

    //   const cases = [
    //     'Fatal Accident',
    //     'Asthma Attack',
    //     'Going into Labour',
    //     'Other'
    //   ]
    
      const submitRequest = async()=>{
        try{
          setloading(true)
          await API.requestAmbulance(address, cases, comment)
          swal({
            title: "Request Sent",
            text: "We have received your ambulance request, an ambulance will be dispatched to your address soon.",
            icon: "success",
            button: "Ok",
          });
       
          setloading(false)
        }catch(e){
          setloading(false)
          swal({
            title: "Something went wrong",
            text: "Your request could not be sent at the moment, please try again or dial 911",
            icon: "success",
            button: "Ok",
          });
         
        }
      }
    
    return (
        <MainLayout>
        <div>
            <div class="ambulance">
                <div class="heading-container">
                    <h2 class="ambulanc-heading">AMBULANCE REQUEST OVERVIEW</h2>

                    <div class="doctor-book-btn" onClick={() => setOpen(true)}>
                        <button>Book Ambulance</button>
                    </div>
                </div>

                <div class="ambulance-container">
                    <div class="appointment-container-box">
                        <div class="appointment-box one">
                            <div className="upcoming-num">{filtered.length}</div>
                            <p>Completed Bookings</p>
                        </div>

                        <div class="appointment-box two">
                            <div className="pending-num">{bookings.length}</div>
                            <p>Pending Bookings</p>
                        </div>

                        <div class="appointment-box four">
                            <div className="cancelled-num">0</div>
                            <p>Cancelled Bookings</p>
                        </div>
                    </div>

                    <Modal
                        isOpen={open}
                        onRequestClose={() => setOpen(false)}
                        closeTimeoutMS={100}
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <div class="amulance-form-row">
                            <div class="header-top">
                                <h2>Request an Ambulance</h2>
                                <FaTimes className="close-btn" onClick={() => setOpen(false)} />
                            </div>

                        <p>It is not necessary to answer the question below. You may call an ambulance right away.</p>
                            <div class="ambulance-container-form">

                            <div className="ambulance-input">
                                    <TextField
                                        multiline
                                        id="standard-basic"
                                        label="Confirm Your Address"
                                        variant="standard"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </div>
                                
                                <div className="ambulance-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">What is the emergency?</InputLabel>
                                        <Select
                                            value={cases}
                                            onChange={e => setSelectedCase(e.target.value)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="emergency"
                                        >
                                            <MenuItem value={10}>Fatal Accident</MenuItem>
                                            <MenuItem value={20}>Asthma Attack</MenuItem>
                                            <MenuItem value={30}>Going Into Labour</MenuItem>
                                            <MenuItem value={30}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="ambulance-input">
                                    <TextField
                                        multiline
                                        id="standard-basic"
                                        label="Comment"
                                        variant="standard"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </div>

                                <div className="ambulance-input">
                                   <button onClick={submitRequest}>{loading ? "Processing..." : "Call An Ambulance"}</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
               
                </div>
                <div class="amblance-history-container">
                <div>
                    <Tabs value={index} onChange={onTabClicked}>
                        <Tab className={classes.tab} label="Pending Request" />
                        <Tab className={classes.tab} label="Completed Request" />
                    </Tabs>

                    <div class="history-content">
                        <Panel value={index} index={0}>
                        <div className="top-history-container">
            <div class="row-his">
                <div className="column-his-1">
                    <div className="head-his">
                        <h4>REQUEST DETAILS</h4>
                        {/* <p>Processing</p> */}
                </div>

                <div >
             
                    <div class="his-container-cont">
                        {bookings.length? bookings.map((value)=>(
                            <>
                            <div className='single-ambulance'>
                            <div className='booked-container-ambulance'><p>Address</p> <p>{value.pickup}</p> </div>
                            <div className='booked-container-ambulance'><p>Emergency</p> <p>{value.conditions[0]}</p> </div>
                            <div className='booked-container-ambulance'><p>Comments</p> <p>{value.conditions[1]}</p> </div>
                            <div className='divider'></div>
                            <div className='booked-container-ambulance'><p className='a-head'>Requested On</p> <p>{new Date(value.createDate).toString().substring(0, 21)}</p> </div>
                            </div>
                            </>
                        )):(<img src={loading} alt="" className="loader-img"/>)}
                        
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
                    <div className="head-his">
                    <h4>REQUEST DETAILS</h4>
                    
                    </div>

                <div>
                <div class="his-container-cont">
                        {filtered.length>0?bookings.map((value)=>(
                            <>
                            <div className='single-ambulance'>
                            <div style={{display:'flex'}}><p className='a-head'>Address</p> <p>{value.pickup}</p> </div>
                            <div style={{display:'flex'}}><p className='a-head'>Emergency</p> <p>{value.conditions[0]}</p> </div>
                            <div style={{display:'flex'}}><p className='a-head'>Comments</p> <p>{value.conditions[1]}</p> </div>
                            <div className='divider'></div>
                            <div style={{display:'flex'}}><p className='a-head'>Requested On</p> <p>{new Date(value.createDate).toString().substring(0, 21)}</p> </div>
                            </div>
                            </>
                        )):'No request to show'}
                        
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
            
        </div>
        </MainLayout>
    )
}

export default Ambulance
