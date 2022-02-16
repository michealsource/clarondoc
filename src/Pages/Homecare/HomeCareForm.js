import React, { useState,useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import 'date-fns';
import { useNavigate} from "react-router-dom"
import HomeCareMultiSelect from '../../Component/HomeCareMultiSelect/HomeCareMultiSelect'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MainLayout from '../MainLayout'
import { TextField, Grid, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { getSymptoms } from '../../Api/homecare';

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

let testnames = []
function HomeCareForm() {
    let navigate = useNavigate()
    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [user, setuser] = useState()
    const [time,setTime]= useState()
    const [name,setName]= useState()
    const [reason,setReason]= useState()
    const [Reqesfor,setRequestFor]= useState()
    const [sex,setSex]= useState()
    const [address,setAddress]= useState()
    const [phone,setPhone]= useState()
    const [privateDoctor,setPrivateDotor]= useState()
    const [medical,setMedical]= useState()
    const [selectedvalue,setSelectedValue]= useState()
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleTimeChange = (newTime)=>{
        setTime(newTime)
    }

    const handleChange = (e) => {
    setSelectedValue (Array.isArray(e)?e.map(x=>x.label):[])
 }

 useEffect(() => {
    (async()=>{
        try{
            let account = localStorage.getItem('user')
            setuser(JSON.parse(account))
            let data = await getSymptoms()
            data.map(s=>{
                testnames.push({value:s.id, label:s.body})
            })
        }catch(e){
            alert('Error', e.message)
        }
    })()
}, [])


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
                                onChange={(e) => setName(e.target.value)}
                                value={name}
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
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    label="Reason"
                                >
                                    {reasons.map((item) => (
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
                                    value={Reqesfor}
                                    onChange={(e) => setRequestFor(e.target.value)}
                                    label="Age"
                                >
                                    <MenuItem value="For Self">For Self</MenuItem>
                                    <MenuItem value="For Others">For Others</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                                <DesktopDatePicker
                                    label="Select Date"
                                    value={date}
                                    minDate={date}
                                    onChange={handleDateChange}
                                    inputFormat="MM/dd/yyyy"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                                <TimePicker
                                    label="Time"
                                    value={time}
                                    onChange={handleTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                >
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                                value={medical}
                                onChange={(e) => setMedical(e.target.value)}
                                label="Medical History (if none, enter none)"
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
                                value={privateDoctor}
                                onChange={(e) => setPrivateDotor(e.target.value)}
                                label="Private Doctor (if none, enter none)"
                                variant="outlined"
                                className={classes.textField}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                            />

                        </Grid>

                        <Grid item xs={6}>
                            <label for="">Symptoms</label>
                            <HomeCareMultiSelect 
                            user={user}
                            setuser={setuser}
                            selectedvalue={selectedvalue}
                            setSelectedValue={setSelectedValue}
                            handleChange={handleChange}
                            testnames={testnames}
                            />
                        </Grid>
                    </Grid>
                    <button
                      onClick={()=>navigate('/OrderReview', { state: {  item: {
                        netTotal: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? (350-(350*0.15)) : 350+5,
                        totalCost: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? 350 : 350+5,
                        totalDiscount:  ['Basic', 'Premium', 'Family'].includes(user.subscription) ? 350*0.15 : 0,
                    }, name:'micheal'} })}
                     className='home-care-form-btn'>Submit</button>
                </div>
            </div>
        </MainLayout>
    )
}

export default HomeCareForm
