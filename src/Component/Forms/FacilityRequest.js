import React, { useState } from 'react'
import './Request.css'
import { makeStyles } from '@mui/styles';
import { TextField,FormControl, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import MultipleSelect from '../MultiSelect/MultiSelect';
import MomentUtils from '@date-io/moment';
import {Link} from "react-router-dom"
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
        marginBottom:'25px !important'
    },
    dateTime: {
        marginTop: 20,
        marginBottom: '20px !important'
    }
}));

function FacilityRequest() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState();

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };
    return (
        <div className="individual-request-container-outer">
            <div class="inner-individual-container-request">
                <h2>MEDICAL FACILITY REQUEST</h2>
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
                            label="Enter Requesting Doctor Name"
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
                            label="Name of Facility"
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
                            label="Facility Location"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>

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
                    </Grid>
                </Grid>


                <Grid container spacing={5}>
                    {/* <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Enter Name Alias"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid> */}

                    <Grid item xs={12} className={classes.dateTime}>
                        <MultipleSelect />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Department (optional)"
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
                            label="Diagnosis"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>

                </Grid>
                <Link to ="/OrderReview" className="mobile-lab-btn">
                Submit Request
                </Link>
            </div>
        </div>
    )
}

export default FacilityRequest
