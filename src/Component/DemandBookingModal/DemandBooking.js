import React, { useState } from 'react'
import './DemandBooking.css'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import 'date-fns';
import MomentUtils from '@date-io/moment';

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
  const [specialist, setSpecialist] = useState('');
  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setSpecialist(event.target.value);
  };
  return (
    <div>
      <div className="demand-booking-modal-container">
        <div class="specialist-heading">
          <h4>Choose Specialist</h4>
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

        <div className="consult-medium-container">
          <h4>Consult Medium</h4>
          <label>
            <input type="radio" class="option-input radio" name="example" />
            Chat
          </label>
          <label>
            <input type="radio" class="option-input radio" name="example" />
            Voice Call
          </label>
          <label>
            <input type="radio" class="option-input radio" name="example" />
            Video Call
          </label>
        </div>

        <TextField multiline className="app-reason" id="standard-basic" label="Appointment Reason" variant="standard" />

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            className="dateTime"
            InputAdornmentProps={{ position: "end" }}
            inputVariant="outlined"
            label="Consult Date and Time"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>

        <div className="consult-medium-container">
          <h4>Pay Option</h4>
          <label>
            <input type="radio" class="option-input radio" name="opption" />
            E-Cash
          </label>
          <label>
            <input type="radio" class="option-input radio" name="opption" />
            Insrance
          </label>
        </div>

        <div class="appoint-for-container">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Appointment For for?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value={10}>Self/Patient</MenuItem>
              <MenuItem value={20}>Parent/Gurdian</MenuItem>
              <MenuItem value={30}>Family</MenuItem>
              <MenuItem value={30}>Friend</MenuItem>
            </Select>
          </FormControl>
        </div>

        <button className="submit-booking-btn">Submit Booking</button>
      </div>
    </div>
  )
}

export default DemandBooking
