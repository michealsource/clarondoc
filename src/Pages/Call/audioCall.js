// import React, {useState, useEffect} from 'react'
// import {Controls} from "./audioControls"
// import Audio from "./Audio"
// import AgoraRTC from "agora-rtc-sdk-ng";

// function AudioCall(props) {
//     const { setInCall, rtc, channelName, token, appId, trackType } = props;
//     const [users, setUsers] = useState([]);
//     const [start, setStart] = useState(false);
//     const [audioTrack, setAudioTrack] = useState(null);

//     console.log(rtc, "cccccccc")

//     useEffect(() => {
        
//          const getTracks = async() => {
//             const audioTrack =  await AgoraRTC.createMicrophoneAudioTrack();
//             setAudioTrack(audioTrack)
//           }

//           getTracks()
        

//         let init = async (name) => {
          
//           rtc.client.on("user-published", async (user, mediaType) => {
//             console.log(mediaType, "mediaType");
//             await rtc.client.subscribe(user, mediaType);
//             console.log(user, "subscribe success");
          
//             if (mediaType === "video") {
//               setUsers((prevUsers) => {
//                 return [...prevUsers, user];
//               });
//             }
            
//             if (mediaType === "audio" ) {
//                 user.audioTrack.play();
//             }
//           });
    
//           rtc.client.on("user-unpublished", (user, type) => {
//             if (type === "audio" ) {
//               user.audioTrack?.stop();
//             }
//             if (type === "video") {
//               setUsers((prevUsers) => {
//                 return prevUsers.filter((User) => User.uid !== user.uid);
//               });
//             }
//           });
    
//           rtc.client.on("user-left", (user) => {
//             console.log("leaving", user);
//             setUsers((prevUsers) => {
//               return prevUsers.filter((User) => User.uid !== user.uid);
//             });
//           });
    
//           await rtc.client.join(appId, name, token, null, () => {
//             if (audioTrack && trackType === "audio") {
//               audioTrack.setEnabled(true);
//               rtc.client.publish([audioTrack]);
//               setStart(true);
//           }
//           });

         
            
//         };

//         init(channelName);
    
//       }, [rtc]);

//     return (
//         <div className="App">
//         { audioTrack && (
//           <Controls  audioTrack={audioTrack}  setStart={setStart} client={rtc.client} setInCall={setInCall} trackType={trackType} />
//         )}
//         {start && audioTrack && trackType === "audio" ? (<Audio users={users} audioTrack={audioTrack} />) : null}
       
//       </div>
//     )
// }

// export default AudioCall


import React, { useState, useEffect } from "react";
// import "./styles.css";
import Agora from "agora-rtc-sdk";
export default function AudioCall(props) {
  const { setInCall,  channelName, token, appId, trackType } = props;
  const [client, setClient] = useState(null);
  const [clientInstance, setClientInstance] = useState(null);
  const [uid, setUid] = useState(null);
  const [localStream, setLocalStream] = useState(null);


useEffect(()=> {
  const getClienInstance = async() => {
    let clientInstance = await Agora.createClient({ mode: "rtc", codec: "vp8" });

    console.log(clientInstance, "clientInstance")

    setClient(clientInstance);
    setClientInstance(clientInstance)
  }
  getClienInstance()
}, [])

console.log(client, "ddddddd")
console.log(clientInstance, "eeeeeee")

  const join = async() => {

    if(client){
    clientInstance.init(appId, () => {
      clientInstance.join(token, channelName, null, (uid) => {
        let localStreamInstance = Agora.createStream({
          streamID: uid,
          audio: true,
          video: false,
          screen: false
        });
        setLocalStream(localStreamInstance);
        localStreamInstance.init(() => {
          clientInstance.publish(localStreamInstance);
          localStreamInstance.play("local_stream");
        });

        clientInstance.on("stream-added", (evt) => {
          let remoteStream = evt.stream;
          const id = remoteStream.getId();
          client.subscribe(remoteStream);
        });

        clientInstance.on("stream-subscribed", (evt) => {
          let remoteStream = evt.stream;
          remoteStream.play("remote_stream");
        });
      });
    });
  }
    // setClient(clientInstance);
  };
  return (
    <div className="App">
      <button onClick={join}>JOIN CALL</button>
      <div id="local_stream"></div>
      <div id="remote_stream"></div>
    </div>
  );
}