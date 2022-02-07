import React, { useState } from 'react'
import './DemandBooking.css'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import 'date-fns';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import MainLayout from '../../Pages/MainLayout'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import * as API from '../../Api/doctors'
const specialistData = [
  {
    id: 1,
    title: "Dental Services"
  },
  {
    id: 2,
    title: "Fitness/Certification Services"
  },
  {
    id: 3,
    title: "Laboratory Services"
  },
  {
    id: 4,
    title: "Nursing/Private Doctor Services"
  },
  {
    id: 5,
    title: "Optometry Services"
  },
  {
    id: 6,
    title: "Vacination Services"
  },
  {
    id: 7,
    title: "Diabetic Clinic Services"
  },
  {
    id: 8,
    title: "Neurologic Clinic Services"
  },
  {
    id: 9,
    title: "Pediatric Clinc Servces"
  },
  {
    id: 10,
    title: "Obstetrics & Gynecologu Services"
  },
  {
    id: 11,
    title: "Surgical Services"
  },
  {
    id: 12,
    title: "Dermatology/Geriatric Services"
  },
  {
    id: 13,
    title: "Antenatal Clinic Services"
  },
  {
    id: 14,
    title: "Diagnstic  Services"
  },
  {
    id: 15,
    title: "Minor Procedre Service"
  },
  {
    id: 16,
    title: "Accommodation Service"
  },
]

function DemandBooking() {
  let navigate = useNavigate();
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState(new Date());
  const [time,setTime] = useState('')
  const [pay,setpay] = useState('')
  const [calloption,setCallOption] = useState('')
  const [reason,setReason] = useState('')
  const [appointment,SetAppointment] = useState()
  const[who,setWho]= useState('')
  const [success, setsuccess] = useState(false)
  const [error, seterror] = useState()
  const [loading, setloading] = useState(false)
  const [insurance, setinsurance] = useState({
    amount: 50, 
    currency: 'GHS',
    names: 'vincent', 
    policyProvider: 'Ghana', 
    policyNumber: '23453322',
    policyOption: 'card', 
    serviceId: Math.floor(Math.random() * 100), 
    service: 'On Demand Booking', 
    policyExpiryDate: new Date()
  })
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleChange = (event) => {
    setSpecialist(event.target.value);
  };

  // const onChangeValue(event) {
  //   console.log(event.target.value);
  // }

  const onChangPayment = (event)=>{
    setpay(event.target.value)

  }
  const submit = async ()=>{

    if(reason.trim().length == 0){
      return seterror('reason is required')
    }

    if(time.trim().replace(/\s/g, '').length != 5){
      return seterror('time is required')
    }

    if(!time.trim().includes(':')){
      return seterror('time not valid')
    }

    if(time.split(':').length > 2){
      return seterror(time)
    }
    date.setHours(time.split(':')[0])
    date.setMinutes(time.split(':')[1])

    try{
      let data = {
        specialist: specialist, 
        consult_medium: calloption, 
        reason: reason, 
        consult_date: date.toISOString(), 
        payment_option: pay, 
        if_insurance: insurance, 
        appointment_for: who
      }
      console.log(data)
      setloading(true)

      let booked = await API.onDemandBooking(data)

      setloading(false)

      if(booked){
        setsuccess(true)
        swal({
          title: "Booking Successful!",
          text: "We have received your request, it will be processed soon and you will be updated",
          icon: "success",
        });
        navigate('/consultation')
      }else{
        alert('Error', 'There was an error sending your booking, please try again')
      }

    }catch(e){
      setloading(false)
      alert(e.message)
    }

  }
  return (
    <MainLayout>
      <div>
        <div className="demand-booking-modal-container">
          <div class="specialist-heading">
            <p style={{color:'red'}}>{error?error:''}</p>
            <h4>Choose Services</h4>
          </div>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={specialist}
              onChange={handleChange}
              autoWidth
              label="specialist"
            >
              {specialistData.map(({ index, id, title }) => {
                return (
                  <MenuItem key={index} value={title}>
                    {title}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <div class="appoint-for-container">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">who is the appointment for ?</InputLabel>
              <Select
              onChange={(e) => setWho(e.target.value)}
                value={who}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value='Self'>Self</MenuItem>
                <MenuItem value='Self/Patient'>Self/Patient</MenuItem>
                <MenuItem value="Parent/Gurdian">Parent/Gurdian</MenuItem>
                <MenuItem value="Family">Family</MenuItem>
                <MenuItem value="Friend">Friend</MenuItem>
                <MenuItem value="Friend">Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          
          <div className="consult-medium-container">
            <FormControl component="fieldset">
              <FormLabel component="legend">Pay Option</FormLabel>
              <RadioGroup onChange={onChangPayment} value={pay} row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="E-Cash" control={<Radio />} label="E-Cash" />
                <FormControlLabel value="Insurance" control={<Radio />} label="Insurance" />
              </RadioGroup>
            </FormControl>
          </div>

          <TextField value={reason} onChange={(e) => setReason(e.target.value)}
           multiline className="app-reason" 
          id="standard-basic" label="Appointment Reason"
          variant="standard" />

          <div class="date-container">
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

            <TextField value={time} onChange={(e)=> setTime(e.target.value)} className="app-reason" id="standard-basic" label="Time (e.g 10:00)" variant="standard" />
          </div>

           {pay==="Insurance"?(
              <div class="insurance-form-contaner">
              <h3 style={{textAlign:'center'}}>Insurance Details</h3>
              <div class="insurance-form-container">
                <TextField value={insurance.names} onChange={txt=>setinsurance({...insurance, ...{names: txt}})} style={{marginTop:10}} id="outlined-basic" label="Full Name" variant="outlined" />
                <TextField value={insurance.policyNumber} onChange={txt=>setinsurance({...insurance, ...{policyNumber: txt}})} style={{marginTop:10}} id="outlined-basic" label="Policy No" variant="outlined" />
                <TextField value={insurance.policyOption} onChange={txt=>setinsurance({...insurance, ...{policyOption: txt}})} style={{marginTop:10}} id="outlined-basic" label="Policy Type" variant="outlined" />
                <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
              <DesktopDatePicker
                label="Select Date"
                minDate={date}
                value={insurance.policyExpiryDate} onChange={date=>setinsurance({...insurance, ...{policyExpiryDate: date}})}
                inputFormat="MM/dd/yyyy"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
              </div>
            </div>
           ):''}   
                     <div className="consult-medium-container">
            <FormControl component="fieldset">
              <FormLabel component="legend">Consult Medium</FormLabel>
              <RadioGroup value={calloption} onChange={(e)=>setCallOption(e.target.value)} row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="Chat" control={<Radio />} label="Chat" />
                <FormControlLabel value="Voice Call" control={<Radio />} label="Voice Call" />
                <FormControlLabel value="Video Call" control={<Radio />} label="Video Call" />
              </RadioGroup>
            </FormControl>
          </div>
         
          <button onClick={submit} className="submit-booking-btn">Submit Booking</button>
        </div>
      </div>
    </MainLayout>
  )
}

export default DemandBooking
