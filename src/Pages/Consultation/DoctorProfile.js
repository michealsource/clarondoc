import React from 'react'

import doctor from '../../images/doc-1.jpg'
import { FaTimes} from "react-icons/fa";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function DoctorProfile({openP,handleCloseProfile,selectedData}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        overFlowY: 'auto',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    // const [open, setOpen] = React.useState(false);
    // const handleOpenProfile = () => setOpen(true);
    // const handleCloseProfile = () => setOpen(false);
    return (
        // <div className="modal-background">
        //     <div class="modal-container">
        //         <FaTimes className="close-modal" onClick={()=>closeModal(false)}/>
        //         <div class="doctor-name">
        //             <img src={doctor} alt="" className="doctor"/>
        //             <h3>{doctors.firstname} {doctors.lastname}</h3>
        //         </div>
        //         <div class="doctor-title">
        //             <p>Medical Laboratory Scientist</p>
                   
        //         </div>

        //         <div class="about-doctor">
        //             <h2>About</h2>
        //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia reprehenderit excepturi soluta error eveniet repellat dicta tempore, odio ducimus repellendus?</p>
        //         </div>
        //     </div>
        // </div>
        <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={openP}
          onClose={handleCloseProfile}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div class="doc-profile-dash">
              <img src={selectedData.avatar} alt=""/>
              <h2 className="profile-name-dash">{selectedData.firstname} {selectedData.lastname}</h2>
              <span className='doc-department-dash'>{selectedData.department}</span>
              <div className='bio-container-dash'>
                <p className='doc-bio'>{selectedData.bio}</p>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    )
}

export default DoctorProfile
