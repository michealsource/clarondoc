import React, { useEffect, useState, useRef } from "react";
import ChannelForm from "./ChannelForm"
import AudioCall from "./audioCall"
import VideoCall from "./VideoCall"
import axios from "axios"
import './calls.css'

import { FaPhone } from "react-icons/fa";
import {
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import {createClient} from "agora-rtc-sdk-ng";
import { useLocation, useNavigate } from "react-router-dom";
import firebase from "../../firebaseConfig"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const config = { 
  mode: "rtc", codec: "vp8",
};

 const rtc = {
  // For the local client
  client: createClient(config),
};

const useClient = createClient(config);
// const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const appId = "0742c8affa02429b9622956bac0d67d0"; //ENTER APP ID HERE

let _engine
let call_id
let urgent
let countt = 0
let email = 'samuel.anakwa@claronhealth.com';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Index() {
  const navigate  = useNavigate()
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState("");
  const [recp, setrecp] = useState(email)
  const [picked, setpicked] = useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [trackType, setTrackType] = useState()
  const location = useLocation()

  let countt_r = useRef(0)
  countt_r.current = 0;
  const email_r = useRef('')

  const doctors = [
    {
      text: "Line For Dr. Seth",
      email: 'krebscycle07@yahoo.com',
      style: "default",
    },
    {
      text: "Line For Dr. Joseph",
      email: 'oppongjoseph69@gmail.com',
      style: "default",
    },
    {
      text: "Line For Dr. Samuel",
      email: 'samuel.anakwa@claronhealth.com',
      style: "default",
    },
  ]

  useEffect(() => {
    const type = location.state.mediaType
    setTrackType(type)
   setOpen(true)
  }, [])

  let user = localStorage.getItem('user')
  const userDetail = JSON.parse(user)


  const startUrgent = async()=>{
    try{
      
      
      let res = await axios.get('https://api.clarondoc.com/urgent/token')
     
      setChannelName(res.data.RTCChannel)
      setToken(res.data.RTCAccessToken)
   
      let doc = await firebase.firestore().collection('calls').doc(recp).set({data: {
        time: new Date(),
        recipient: recp,
        caller: userDetail.email,
        status: 'started',
        channel: res.data.RTCChannel,
        token: res.data.RTCAccessToken
      }})
      call_id = (recp)

      console.log('started')

    }catch(e){
      console.log(e)
      alert('Unable to start call', e.message)
      setTimeout(()=>{
        navigate(-1)
      }, 3000)
    }
  }


  const start_now = async(email)=>{
    // start
    setrecp(email)
    email_r.current = email;
    
    await startUrgent();

      firebase.firestore().collection('calls').doc(email).onSnapshot(async snapshot=>{
         
            try {
              if(true){
                urgent = snapshot.data().data;
  
                console.log('count:'+ countt_r.current)
  
                if(urgent.status == 'ongoing'){
                  setpicked(true);
                  console.log('picked')
                }
  
               
                if(false){
  
                    
                    if((urgent.status != "ended" && urgent.status != "ongoing") ){
                        
                    }else{
                      console.log('reached end call'+urgent.status)
                        try{
                          if(_engine !=null){
                            // await _engine.leaveChannel()
                          }
                        }catch(e){
                          console.log('Leave error: ', e)
                        }
                        // navigation.goBack()
                    } 
                }
  
                countt_r.current+=1;
                setOpen(false)
                setInCall(true)

            }              
            } catch (error) {
              
            }
          
      }, e => {
          console.log('Firebase Error: ', e)
      })
    // stop
  }



  return (
    <div>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="stand-by">Stand-By Line for emergency call</p>

          {
            doctors.map((doc) => {
              return (
                <div className="doc-call-container">
                  <p className="doc-btn" key={doc.email} onClick={() => start_now(doc.email)}>{doc.text} <FaPhone className="call-em"/></p>
                </div>
                
              )
            })
          }
         
        </Box>
      </Modal>
      {inCall ? (
        <AudioCall setInCall={setInCall} rtc={rtc} appId={appId} trackType={trackType} token={token} channelName={channelName}   />
      ) : null
      }
    </div>
  );
}

export default Index;