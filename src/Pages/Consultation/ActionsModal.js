import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FaVideo,FaPhoneSquareAlt } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import './Consultation.css'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display:'flex',
    justifyContent:'space-between',
    p: 4,
  };

function ActionsModal({call,setCall}) {
//   const [open, setOpen] = useState(true);
  const handleOpen = () => setCall(true);
  const handleClose = () => setCall(false);
    return (
        <div>
        <Modal
        open={call}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Box><FaVideo className="video"/></Box>
         <Box><FaPhoneSquareAlt className="phone-call"/></Box>
        </Box>
      </Modal>
        </div>
    )
}

export default ActionsModal
