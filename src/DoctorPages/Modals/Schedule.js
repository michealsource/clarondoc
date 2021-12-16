import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import './Modals.css'

function Schedule({ open, setOpen }) {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h2>Schedule Appointment For Patient</h2>

                        <div style={{marginTop:30, width: '100%'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Select Date&Time"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <br/>
                        <Button className="submit-book-doc" variant="contained">Submit</Button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Schedule
