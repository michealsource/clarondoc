import React,{useState,useEffect} from 'react'
// import doctor from '../../images/doc-1.jpg'
// import { FaTimes} from "react-icons/fa";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaRegCommentDots,FaCalendarAlt,FaHeart } from "react-icons/fa";
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

      const [loading, setloading] = useState(false)
      const [favorites, setfavorites] = useState([])
      const [loaded, setloaded] = useState(false)
  
      const favorite = async()=>{
  
          setloading(true)
          if(favorites.includes(selectedData.email)){
              setfavorites(favorites.filter(fav=>fav!=selectedData.email))
              await localStorage.setItem('saved', favorites.filter(fav=>fav!=selectedData.email).toString())
          }else{
              setfavorites([...favorites, ...[selectedData.email]])
              await localStorage.setItem('saved', [...favorites, ...[selectedData.email]].toString())
          }
          setloading(false)
      }
  
      useEffect(()=>{
        (async()=>{
            if(!loaded){
                let saved = await localStorage.getItem('saved')
                if(saved == null){
                    return
                }
                console.log(saved)
                setfavorites(saved.split(','))
                setloaded(true)
            }

        })()
        
    }, [])

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

              <div class="claron-doc-online-actions">
                <div class="item-doc" disabled={loading} onClick={favorite}>
                  <FaHeart/>
                     <p>
                     { loading ? 'Saving...' : favorites.includes(selectedData.email) ? 'Remove from Account' : 'Save to Account'}
                   </p>
                   </div>
                <div class="item-doc">
                  <FaCalendarAlt/>
                  <p>Check Availability</p>
                  </div>
                <div class="item-doc">
                  <FaRegCommentDots/>
                  <p>Chat</p>
                  </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    )
}

export default DoctorProfile
