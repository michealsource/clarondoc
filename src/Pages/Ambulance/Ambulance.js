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

import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import * as API from '../../Api/pharmacy'


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
    const [bookings, setBookings] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loaded, setLoaded] = useState(false)

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
      })
    
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

                            <div class="ambulance-container-form">

                                <div className="ambulance-input">
                                    <TextField
                                        id="standard-basic"
                                        label="Enter patient name"
                                        variant="standard"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </div>

                                <div class="ambulance-input">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div class="ambulance-input">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            id="time-picker"
                                            label="Select Date and Time"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                                <div class="ambulance-input">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                InputLabelProps={{
                                                    className: classes.floatingLabelFocusStyle,
                                                }}
                                                id="outlined-textarea"
                                                label="Age"
                                                placeholder="Enter Your Age"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                InputLabelProps={{
                                                    className: classes.floatingLabelFocusStyle,
                                                }}
                                                id="outlined-multiline-static"
                                                label="Emergency Contact"
                                                placeholder="Emergency Contact"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>

                                <div className="ambulance-input">
                                    <TextField
                                        multiline
                                        id="standard-basic"
                                        label="Enter Pick Up Address"
                                        variant="standard"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </div>

                                <div className="ambulance-input">
                                    <TextField
                                        id="standard-basic"
                                        label="Enter Request Name"
                                        variant="standard"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </div>

                                <div className="ambulance-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Age"
                                        >
                                            <MenuItem value={10}>Self/Patient</MenuItem>
                                            <MenuItem value={20}>Parent/Gurdian</MenuItem>
                                            <MenuItem value={30}>Family</MenuItem>
                                            <MenuItem value={30}>Friend</MenuItem>
                                            <MenuItem value={30}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="ambulance-input">
                                    <TextField
                                        id="standard-basic"
                                        label="Initials (0/5)"
                                        variant="standard"
                                        inputProps={{ maxLength: 5 }} 
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </div>

                                <div className="ambulance-input">
                                   <h4>Medical Condition</h4>
                                </div>

                                <div className="ambulance-input">
                                 <label for="">Medical</label>   
                                <Checkbox label="Medical"  />
                                <label for="">Surgical</label> 
                                <Checkbox label="Surgical"/>
                                <label for="">Trauma</label> 
                                <Checkbox label="Trauma"/>
                                <label for="">Maternal/Gynacology</label> 
                                <Checkbox label="Maternal/Gynacology"/>

                                <label for="">Neonatal</label> 
                                <Checkbox label="Neonatal"/>

                                <label for="">Psychatrics</label> 
                                <Checkbox label="Maternal/Gynacology"/>

                                <label for="">Paediatric</label> 
                                <Checkbox label="Paediatric"/>
                                
                                <label for=""> Other's</label> 
                                <Checkbox label="Paediatric"/>
                                </div>

                                <div className="ambulance-input">
                                   <button>Submit Request</button>
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
                        {bookings.map((value)=>(
                            <>
                            <div className='single-ambulance'>
                            <div style={{display:'flex'}}><p className='a-head'>Address</p> <p>{value.pickup}</p> </div>
                            <div style={{display:'flex'}}><p className='a-head'>Emergency</p> <p>{value.conditions[0]}</p> </div>
                            <div style={{display:'flex'}}><p className='a-head'>Comments</p> <p>{value.conditions[1]}</p> </div>
                            <div className='divider'></div>
                            <div style={{display:'flex'}}><p className='a-head'>Requested On</p> <p>{new Date(value.createDate).toString().substring(0, 21)}</p> </div>
                            </div>
                            </>
                        ))}
                        
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
