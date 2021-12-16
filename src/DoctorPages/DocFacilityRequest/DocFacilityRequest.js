import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { TextField,FormControl, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import ConfirmModal from '../Modals/ConfirmModal'
import Multiselect from 'multiselect-react-dropdown';
import {Link} from "react-router-dom"
import './DocFacilityRequest.css'

// MODAL IMPORTATION
import MomentUtils from '@date-io/moment';
// import MultipleSelect from '../MultiSelect/MultiSelect';
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    floatingLabelFocusStyle: {
        color: "#525252"
    },
    textField: {
        width: '100%',
        marginTop: '20px !important',
        marginBottom: '30px !important'
    },
    dateTime: {
        marginTop: '20px !important',
        // marginBottom:'20px !important'
    }
}));


function DocFacilityRequest() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState();
    const [symptoms,setSymptoms] = useState([
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ])

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    return (
        <div class="doctor-facility-request-container">
        <div className="individual-request-container-outer">
            <div class="inner-individual-container-request">
                <h2>FACILITY REQUEST ON BEHALF OF PATIENT</h2>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Enter Patient Name"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Enter Requesting Doctor Name"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                InputAdornmentProps={{ position: "end" }}
                                inputVariant="outlined"
                                label="Select Date of Birth"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Enter Name Of Facility"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Enter Patient Address"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>

                </Grid>


                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Facility Request Location"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>
{/* 
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DateTimePicker
                                className={classes.dateTime}
                                InputAdornmentProps={{ position: "end" }}
                                inputVariant="outlined"
                                label="Select Propse Date and Time"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid> */}
                </Grid>

                <button  className="mobile-lab-btn">
                Submit Request
                </button>
            </div>
        </div>
        {/* <ConfirmModal/> */}
        </div>
    )
}

export default DocFacilityRequest

