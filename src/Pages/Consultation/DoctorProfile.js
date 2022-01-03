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

    return (
     
        <div>

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
