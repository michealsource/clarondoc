import React, { useState, useEffect } from 'react'
import './Request.css'
import { makeStyles } from '@mui/styles';
import { TextField, FormControl, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import { fetchDoctors } from '../../Api/doctors';

import MultiSelect from '../MultiSelect/MultiSelect';
import MomentUtils from '@date-io/moment';
import { useNavigate } from "react-router-dom"
import MainLayout from '../../Pages/MainLayout';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Select from '@mui/material/Select';
import Lab from './Lab'
import { Formik, Form } from 'formik';
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

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white"}),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "black",
        color: "#FFF",
        cursor: "pointer"
      };
    }
  };

function FacilityRequest({ testName }) {
    const navigate = useNavigate()
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState();
    const [selectedvalue,setSelectedValue]= useState()
    const handleChange = (e) => {
     setSelectedValue (Array.isArray(e)?e.map(x=>x.label):[])
  }

    const handleDateChange = (date) => {
        setSelectedDate(date.toDate());
        console.log(date.toDate());
    };

    // MAIN FRORM STATE
    let testnames = []
    const [tests, settests] = useState([])
    const [labtestnames, setlabtestnames] = useState([])
    const [filterednames, setfilterednames] = useState(testnames)
    const [isfacility, setisfacility] = useState(false)
    const [facilitymodal, setfacilitymodal] = useState(false)
    const [name, setName] = useState()
    const [user, setuser] = useState()
    const [pendingtime, setpendingtime] = useState(false)
    const [labs, setLabs] = useState([])
    const [labtests, setlabtests] = useState([])
    const [dob, setDob] = useState(new Date())
    const [purpose, setPurpose] = useState('')
    const [doctors, setdoctors] = useState([])
    const [value, setValue] = useState([]);
    const [doctor, setdoctor] = useState()
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState(0)
    const [doc, setdoc] = useState('')
    const [facility, setfacility] = useState({
        name: '',
        location: '',
        department: '',
        diagnosis: ''
    })
    const [address, setAddress] = useState('')
    const [labTests, setLabTests] = useState([])
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {

        (async () => {
            try {
                let account = localStorage.getItem('user')
                setuser(JSON.parse(account))
                let found = await fetchDoctors()
                setdoctors(found)
                setdoc(found[0].firstname + ' ' + found[0].lastname)
            } catch (e) {
                alert('Error', e.message)
            }
        })()

        console.log(testnames)
    }, [])

    const getTests = (test, total) => {
        console.log(test, total, "frm arent")
        setLabTests(test)
        setTotalCost(total)
    }

    // console.log(labTests,totalCost, "frm arent")
    return (
        <MainLayout >
            <div className="individual-request-container-outer">
                <div class="inner-individual-container-request">
                    <h2>LABORATORY</h2>


                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Enter Patient Name"
                                variant="outlined"
                                value={name}
                                onChangeText={(e) => setName(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>

                            <FormControl sx={{ minWidth: 150 }} fullWidth>
                                <Select
                                    onChange={(e) => {
                                        const selectedDoctor = e.target.value;
                                        setValue(selectedDoctor)
                                    }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem selected value="">
                                        <em disa>Select Requesting Doctor</em>
                                    </MenuItem>
                                    {doctors.map(doc => <MenuItem key={doc.email} value={doc.firstname}>{doc.firstname + ' ' + doc.lastname}</MenuItem>)}
                                </Select>

                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel name="picked" value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel name="picked" value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <div className="date">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        fullWidth
                                        label="Date of Birth"
                                        value={dob}
                                        onChange={(newValue) => {
                                            setDob(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>

                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                            <TextField
                                value={address}
                                onChange={e => { setAddress(e.target.value) }}
                                id="outlined-basic"
                                label="Physical Address"
                                variant="outlined"
                                className={classes.textField}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={phone}
                                onChange={e => { setPhone(e.target.value) }}
                                id="outlined-basic"
                                label="Phone Number"
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
                                value={purpose}
                                onChange={e => { setPurpose(e.target.value) }}
                                id="outlined-basic"
                                label="Purpose of Test"
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
                                    fullWidth
                                    // className={classes.dateTime}
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
                        <Grid item xs={12} className={classes.dateTime}>
                            <p className='cost-p'>Select All Tests that Apply {totalCost ? <span className='cost'>{totalCost}</span> : ''}</p>
                            <Lab/>
                            {/* <MultiSelect filterednames={filterednames} getTest={getTests} /> */}
                        </Grid>
                    </Grid>

                    <button className="mobile-lab-btn"
                        onClick={() => navigate('/OrderReview',
                            { state: { totalCost: totalCost, name: name, value: value, sex: sex, dob: dob, address: address, phone: phone, purpose: purpose, selectedDate: selectedDate, labTests: labTests } })}>Proccessed</button>

                </div>
            </div>
        </MainLayout>
    )
}

export default FacilityRequest
