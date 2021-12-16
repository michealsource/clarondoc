import React, { useState } from 'react'
import './Request.css'
import { makeStyles } from '@mui/styles';
import { TextField,FormControl, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import Multiselect from 'multiselect-react-dropdown';
import {Link} from "react-router-dom"

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


function IndividualRequest() {
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
        <div className="individual-request-container-outer">
            <div class="inner-individual-container-request">
                <h2>INDIVIDUAL REQUEST</h2>
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
                            label="Enter Your Address"
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
                            label="Enter Purpose of Test"
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
                    <Grid item xs={5}>
                        <TextField
                            id="outlined-basic"
                            label="Enter Name Alias"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>

                    <Grid item xs={5} className={classes.dateTime}>
                        {/* <MultipleSelect /> */}
                        <Multiselect
                        className="multi-symptoms"
                        isObject={false}
                        onRemove={(event)=>{console.log(event)}}
                        onSelect={(event)=>{console.log(event)}}
                        options={symptoms}
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

export default IndividualRequest
