import React, { useState } from 'react'
import { FaInfo } from "react-icons/fa";
import { FaRegCalendarAlt} from "react-icons/fa";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import doc1 from '../../images/doc-1.jpg'
import doc2 from '../../images/doc-2.jpg'
import doc3 from '../../images/doc-3.jpg'
import Box from '@mui/material/Box';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'date-fns';
import Modal from '@mui/material/Modal';
// MODAL IMPORTATION
import ModalProfile from '../../Component/Modal/ModalProfile';
import ScheduleAppointment from '../../Component/ScheduleAppointment/ScheduleAppointment'
import './SavedDoctors.css'

// DUMMY DOCTORS DATA
const doctorData = [
    {
        id: 1,
        name: "Theophilus Fenuku",
        title: "Medical Laboratory Scientist",
        image: doc1
    },
    {
        id: 2,
        name: "Bless Ansah Antwi",
        title: "Laboratory Technologist",
        image: doc2
    },
    {
        id: 3,
        name: "Hackel Amoabeng Abban",
        title: "Nutritionist",
        image: doc3
    }
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function SavedDoctors() {
    const [openModal, setOpenModal] = useState(false)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    const [selectedDate, setSelectedDate] = useState();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div className="doctors">
            <div class="demand-container">
                <h1 class="heading-fav">List of Your Favourite<span> Doctors</span></h1>
            </div>
            <div class="box-container">
                {doctorData.map(({ name, title, image, id }) => (
                    <div class="box" id={id}>
                        <img src={image} alt="" />
                        <h3>{name}</h3>
                        <span className="title">{title}</span>
                        <div class="share">
                            <div class="action-container"
                                onClick={() => setOpenModal(true)}
                            >
                                <FaInfo className="doctor-icon" />
                                <span> About</span>
                            </div>

                            <div class="action-container">
                                <BsFillChatSquareTextFill className="doctor-icon" />
                                <span>Chat</span>
                            </div>

                            <div onClick={handleOpen} class="action-container">
                                <FaRegCalendarAlt className="doctor-icon" />
                                <span>Book</span>
                            </div>

                        </div>
                    </div>
                ))}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DateTimePicker
                                InputAdornmentProps={{ position: "end" }}
                                inputVariant="outlined"
                                label="Select Propse Date and Time"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                    </MuiPickersUtilsProvider>
                    <ScheduleAppointment />
                    <button className="schedule-app-btn">Submit Request</button>
                    </Box>
                </Modal>
            </div>
            {openModal && <ModalProfile closeModal={setOpenModal} />}
        </div>
    )
}

export default SavedDoctors
