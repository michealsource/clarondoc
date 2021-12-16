import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import 'date-fns';
import {Link} from "react-router-dom"
import MultipleSelect from '../../Component/MultiSelect/MultiSelect';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { TextField, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

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
        marginBottom: '25px !important'
    },
    dateTime: {
        marginTop: 20,
        marginBottom: '20px !important'
    }
}));

function HomeCareForm() {
    const classes = useStyles();
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <div className="individual-request-container-outer">
            <div class="inner-individual-container-request">
                <h2>Home Care REQUEST</h2>
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
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-standard-label">Select Reason</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"

                                label="Age"
                            >
                                <MenuItem value={10}>ROUNTINE Doctors Consultations.</MenuItem>
                                <MenuItem value={20}>Nrse Home Visit</MenuItem>
                                <MenuItem value={30}>Rountine Medical Check-up</MenuItem>
                                <MenuItem value={40}>ALLIANZ WORLDWIDE CARE</MenuItem>
                                <MenuItem value={50}>Emergency Visit</MenuItem>
                                <MenuItem value={60}>Chronic Home Care Disease Management</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-standard-label">Select Requesting For</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"

                                label="Age"
                            >
                                <MenuItem value={10}>For Self</MenuItem>
                                <MenuItem value={20}>For Others</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date desktop"
                                value={value}
                                onChange={handleChange}
                                inputFormat="MM/dd/yyyy"
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
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
                        <TextField
                            id="outlined-basic"
                            label="Private Doctor Name (if any)"
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
                            multiline
                            label="Enter your Address"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />

                    </Grid>

                    <Grid item xs={6}>
                        <MultipleSelect name="Add Symptoms" />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            multiline
                            label="Medical History (if any)"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />

                    </Grid>

                    <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Proposed date and time"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            multiline
                            label="Basic Contact No"
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
                            multiline
                            label="Initials"
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

export default HomeCareForm
