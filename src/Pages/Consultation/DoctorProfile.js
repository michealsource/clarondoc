import React,{useState,useEffect} from 'react'
// import doctor from '../../images/doc-1.jpg'
// import { FaTimes} from "react-icons/fa";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaRegCommentDots,FaCalendarAlt,FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router';
import doctorDefault from '../../images/doctor.png'
import {useSelector } from 'react-redux'
function DoctorProfile({openP,handleCloseProfile,selectedData}) {
  const doctor =selectedData;
  const userData = useSelector((state)=>state.user.value)
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
      const navigate = useNavigate()
      const favorite = async()=>{

          setloading(true)
          if(favorites.includes(doctor.email)){
              setfavorites(favorites.filter(fav=>fav!=doctor.email))
              localStorage.setItem('saved', favorites.filter(fav=>fav!=doctor.email).toString())
              console.log(favorites)
          }else{
              setfavorites([...favorites, ...[doctor.email]])
              localStorage.setItem('saved', [...favorites, ...[doctor.email]].toString())
          }
          setloading(false)
      }
  
      useEffect(()=>{
        (async()=>{
            if(!loaded){
                let saved = localStorage.getItem('saved')
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
            <img src={doctor.avatar && doctor.avatar !=="undefined" ?doctor.avatar:doctorDefault} alt="avatar" />
              <h2 className="profile-name-dash">{doctor.firstname} {doctor.lastname}</h2>
              <span className='doc-department-dash'>{doctor.department}</span>
              <div className='bio-container-dash'>
                <p className='doc-bio'>{doctor.bio}</p>
              </div>

              <div class="claron-doc-online-actions">
                <div class="item-doc" disabled={loading} onClick={favorite}>
                  <FaHeart/>
                     <p>
                     { loading ? 'Saving...' : favorites.includes(doctor.email) ? 'Remove from Account' : 'Save to Account'}
                   </p>
                   </div>
                <div
                onClick={ ()=>userData.subscription === null || userData.subscription === 'Normal' || userData.subscription === 'Pay As You go'? navigate('/PayAsYouGo',{ state: { name: 'Pay As You go', price: 50,doctor} }): navigate('/Book',{state:{doctor}})}
                class="item-doc">
                  <FaCalendarAlt/>
                  <p>Check Availability</p>
                  </div>
                <div
                onClick={ ()=>userData.subscription === null || userData.subscription === 'Normal' || userData.subscription === 'Pay As You go'? navigate('/PayAsYouGo',{ state: { name: 'Pay As You go', price: 50,doctor} }): navigate('/chat',{state:{doctor}})}
                class="item-doc">
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
