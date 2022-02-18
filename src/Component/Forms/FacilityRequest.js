import React, { useState, useEffect } from 'react'
import './Request.css'
import { makeStyles } from '@mui/styles';
import { TextField, Checkbox, FormControl, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import { fetchDoctors } from '../../Api/doctors';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import MultiSelect from '../MultiSelect/MultiSelect';
import MomentUtils from '@date-io/moment';
import { useNavigate } from "react-router-dom"
import MainLayout from '../../Pages/MainLayout';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import Select from '@mui/material/Select';
import Lab from './Lab'
// import { Formik, Form } from 'formik';
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
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
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
    const [selectedvalue, setSelectedValue] = useState()

    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.label) : [])
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // setSelectedDate(date.toDate());
        // console.log(date.toDate());
    };

    // MAIN FRORM STATE
    let testnames = []
    
  
    const [isfacility, setisfacility] = useState(false)
 
    const [name, setName] = useState()
    const [user, setuser] = useState()
 
   
    const [labtests, setlabtests] = useState([])
    const [dob, setDob] = useState(new Date())
    const [purpose, setPurpose] = useState('')
    const [doctors, setdoctors] = useState([])
    const [value, setValue] = useState([]);
    const [doctor, setdoctor] = useState()
    const [phone, setPhone] = useState()
    const [sex, setSex] = useState('male')
    const [doc, setdoc] = useState('')
    const [total, settotal] = useState()
    const [selectedvalues, setSelectedValues] = useState([])

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
    }, [])

    const getTests = (test, total) => {
        console.log(test, total)
        setLabTests(test)
        setTotalCost(total)
    }

    // console.log(labTests,totalCost, "frm arent")
    console.log(total)
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
                                onChange={(e) => setName(e.target.value)}
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
                                        <em>Select Requesting Doctor</em>
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
                                <RadioGroup value={sex} onChange={(e) => setSex(e.target.value)} row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel name="picked" value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel name="picked" value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <div className="date">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />



                                {/* <DateTimePicker
                                    fullWidth
                                    // className={classes.dateTime}
                                    InputAdornmentProps={{ position: "end" }}
                                    inputVariant="outlined"
                                    label="Select Propse Date and Time"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                /> */}
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={5}>
                        <Grid item xs={12} className={classes.dateTime}>
                            <p className='cost-p'>Select All Tests that Apply {totalCost ? <span className='cost'>{totalCost}</span> : ''}</p>
                            <Lab getTests={(test, total) => getTests(test, total)} />
                            {/* <MultiSelect filterednames={filterednames} getTest={getTests} /> */}
                        </Grid>
                    </Grid>

                    <FormControlLabel
                        control={<Checkbox checked={isfacility} onChange={(event) => setisfacility(event.target.checked)} />}
                        label="Check this if the request is from a medical facility"
                    />

                    <button className="mobile-lab-btn"
                        onClick={() => navigate('/OrderReview',
                        {
                            state:{
                                item:{
                                    netTotal: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? (totalCost - (totalCost * 0.15)) + 5 : total + 5,
                                    totalCost: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? totalCost : totalCost + 5,
                                    totalDiscount: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? totalCost * 0.15 : 0,
                                },
                                data: isfacility ? {
                                    patientName: name,
                                    gender: sex,
                                    labTests: labTests,
                                    // address: address,
                                    signature: true,
                                    phone: phone,
                                    doctor: value,
                                    schedule: selectedDate.toISOString(),
                                    facilityName: 'facility',
                                    facilityLocation:address,
                                    dob: dob,
                                    purpose: purpose,
                                    names: name,
                                    type: 'facility',
                                    serviceId: 'facilitylabrequests'
                                } : {
                                    patientName: name,
                                    gender: sex,
                                    labTests: labTests,
                                    // address: address,
                                    signature: true,
                                    phone: phone,
                                    doctor: value,
                                    schedule: selectedDate.toISOString(),
                                    dob: dob,
                                    purpose: purpose,
                                    names: name,
                                    facilityLocation:address,
                                    facilityName:'individual',
                                    type: 'individual',
                                    serviceId: 'individuallabrequests'
                                },
                                type: 'lab',
                            }
                        }
                        ) }>Proccessed</button>
                </div>
            </div>
        </MainLayout>
    )
}

export default FacilityRequest
