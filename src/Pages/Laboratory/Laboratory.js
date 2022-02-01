import React, { useState } from 'react'
import './Laboratory.css'
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
import {Link} from 'react-router-dom'
import MainLayout from '../MainLayout';

import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

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


function Laboratory() {
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
    return (
        <MainLayout>
        <div>
            <div class="ambulance">
                <div class="heading-container">
                    <h2 class="ambulanc-heading">LABORATORY REQUEST OVERVIEW</h2>
                   
                    <div class="laboratory-container-btn">
                    {/* <div class="individual-request">
                        <Link to="/individualRequest" className="individual-btn">INDIVIDUAL REQUEST</Link>
                    </div> */}

                    <div class="medical-facility">
                        <Link to="/facilityrequest" className="facility-btn">LABORATORY REQUEST</Link>
                    </div>
                </div>
                </div>

                <div class="ambulance-container">
                <div class="appointment-container-box">
                <div class="appointment-box one">
                    <div className="upcoming-num">0</div>
                    <p>Upcoming Request</p>
                </div>

                <div class="appointment-box two">
                    <div className="pending-num">0</div>
                    <p>Pending Request</p>
                </div>

                <div class="appointment-box three">
                    <div className="completed-num">0</div>
                    <p>Completed Request</p>
                </div>

                <div class="appointment-box four">
                    <div className="cancelled-num">0</div>
                    <p>Cancelled Request</p>
                </div>
            </div>
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
                        <h4>Rountine Doctors Consultations</h4>
                        <p>Processing</p>
                    </div>

                <div class="col-container">
                    <div class="his-container-title">
                        <p>Requuest ID:</p>
                        <p>Schedule Date:</p>
                        <p>Gender:</p>
                        <p>Patient Name:</p>
                        <p>Symptoms:</p>
                        <p>Phone:</p>
                        <p>Email:</p>
                        <p>Lab Test</p>
                        
                    </div>

                    <div class="his-container-cont">
                        <p>hyr9jnds98-57yhdf-irydrhbd</p>
                        <p>12/01/2021 12:15 AM</p>
                        <p>Male</p>
                        <p>Gulus</p>
                        <p>N.A</p>
                        <p>0803445687347</p>
                        <p>gulus@gmail.com</p>
                        <p>fasting,Blood Sugar</p>
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
                        <h4>Rountine Doctors Consultations</h4>
                        <p>Completed</p>
                    </div>

                <div class="col-container">
                    <div class="his-container-title">
                        <p>Requuest ID:</p>
                        <p>Schedule Date:</p>
                        <p>Gender:</p>
                        <p>Patient Name:</p>
                        <p>Symptoms:</p>
                        <p>Phone:</p>
                        <p>Email:</p>
                        <p>Lab Test</p>
                        {/* <Link to="/OrderReview" className="drug-his-btn-h">Make Payment</Link> */}
                    </div>

                    <div class="his-container-cont">
                        <p>hyr9jnds98-57yhdf-irydrhbd</p>
                        <p>12/01/2021 12:15 AM</p>
                        <p>Male</p>
                        <p>Gulus</p>
                        <p>N.A</p>
                        <p>0803445687347</p>
                        <p>gulus@gmail.com</p>
                        <p>fasting,Blood Sugar</p>
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

export default Laboratory
