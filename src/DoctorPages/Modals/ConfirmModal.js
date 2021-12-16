import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({handleCloseConfirm,openConfirm}) {
 
  return (
    <div>
    
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Are you sure you want to cancell the Appointment
        </DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleCloseConfirm}>Yes</Button>
          <Button variant="contained" onClick={handleCloseConfirm} autoFocus>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}