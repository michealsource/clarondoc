import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import 'date-fns';
import { Link } from "react-router-dom"
import HomeCareMultiSelect from '../../Component/HomeCareMultiSelect/HomeCareMultiSelect'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MainLayout from '../MainLayout'
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

let reasons = [
    'Routine Doctors Consultation', 
    'Nurse Home Visit', 
    'Routine Medical Check-up', 
    'Emergency Visit', 
    'Chronic Home Care Disease Managment'
  ]

function HomeCareForm() {
    const classes = useStyles();
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <MainLayout>
            <div className="individual-request-container-outer">
                <div class="inner-individual-container-request">
                <h2>HOME CARE REQUEST</h2>
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
                            <InputLabel id="demo-simple-select-standard-label">Reason for service</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"

                                label="Age"
                            >
                                {reasons.map((item)=>(
                                    <MenuItem value={10}>{item}</MenuItem>
                                ))}
                               
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="demo-simple-select-standard-label">Making Request for</InputLabel>
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
                        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
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
                            label="Physical Address"
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
                            label="Phone Number"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />

                    </Grid>

                    <Grid item xs={6}>
                        <label for="">Symptoms</label>
                        <HomeCareMultiSelect/>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            multiline
                            label="Private Doctor (if none, enter none)"
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
                            label="Medical History (if none, enter none)"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                    </Grid>
                </Grid>
                </div>
            </div>
        </MainLayout>
    )
}

export default HomeCareForm
