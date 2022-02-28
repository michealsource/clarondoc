import React, { useState, useEffect } from 'react'
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
import { Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import MainLayout from '../MainLayout';
import 'date-fns';
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


function Laboratory() {
    // HANDLES DATE STATE
    const [index, setIndex] = useState(0);
    const onTabClicked = (event, index) => {
        setIndex(index);
    };

    const classes = useStyles();

    const [bookings, setBookings] = useState([])

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {

        (async () => {

            if (!loaded) {
                try {
                    let res
                    res = await API.myLabTests('individual')
                    setBookings(res.requests)
                    console.log(bookings)
                } catch (e) {
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
                        <h2 class="ambulanc-heading">LABORATORY REQUEST OVERVIEWS</h2>

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
                                <Tab className={classes.tab} label="Individual" />
                                <Tab className={classes.tab} label="Facility" />
                            </Tabs>
                            <div class="history-content">
                                <Panel value={index} index={0}>
                                    <div className="top-history-container">
                                        <div class="row-his">
                                            <div className="column-his-1">
                                                <div class="col-container">
                                                    {bookings.length > 0 && (bookings.length ? (
                                                        <div class="his-container-cont-lab">
                                                            {bookings.map((item) => (
                                                                <>
                                                                    <div className='single-ambulance'>
                                                                        <div>
                                                                            <p style={{ color: '#2d8f88' }}>REQUESTED TESTS</p>
                                                                            {item.labTests.map(test => (
                                                                                <div className='request-test'>
                                                                                    <p>{test.labtest}</p>
                                                                                    <p>GHS {test.charge}</p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className='divider'></div>
                                                                        <div className='booked-container'>
                                                                            <p className='a-head'>Booked On:</p>
                                                                            <p>{new Date(item.createDate).toString().substring(0, 21)}</p> </div>
                                                                        <div className='booked-container'>
                                                                            <p className='a-head'>Booked For: </p>
                                                                            <p>{new Date(item.scheduledFor).toString().substring(0, 21)}</p> </div>

                                                                    </div>
                                                                </>
                                                            ))}

                                                        </div>
                                                    ) : (<img src={loading} alt="" className="loader-img" />))}
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
                                                        {bookings.lenth > 0 && (bookings.map((item) => (
                                                            <>
                                                                <div className='single-ambulance'>
                                                                    <div>
                                                                        <p style={{ color: '#2d8f88' }}>REQUESTED TESTS</p>
                                                                        {item.labTests.map(test => (
                                                                            <div className='request-test'>
                                                                                <p>{test.labtest}</p>
                                                                                <p>GHS {test.charge}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className='divider'></div>
                                                                    <div className='booked-container'>
                                                                        <p className='a-head'>Booked On:</p>
                                                                        <p>{new Date(item.createDate).toString().substring(0, 21)}</p> </div>
                                                                    <div className='booked-container'>
                                                                        <p className='a-head'>Booked For: </p>
                                                                        <p>{new Date(item.scheduledFor).toString().substring(0, 21)}</p> </div>

                                                                </div>
                                                            </>
                                                        )))}
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
