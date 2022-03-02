import React, {useState, useEffect} from 'react'
import {Controls} from "./audioControls"
import Audio from "./Audio"
import AgoraRTC from "agora-rtc-sdk-ng";

function AudioCall(props) {
    const { setInCall, rtc, channelName, token, appId, trackType } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const [audioTrack, setAudioTrack] = useState(null);

    useEffect(() => {
        
         const getTracks = async() => {
            const audioTrack =  await AgoraRTC.createMicrophoneAudioTrack();
            setAudioTrack(audioTrack)
          }

          getTracks()
        

        let init = async (name) => {
          
          rtc.client.on("user-published", async (user, mediaType) => {
            await rtc.client.subscribe(user, mediaType);
            console.log(user, "subscribe success");
          
            if (mediaType === "video") {
              setUsers((prevUsers) => {
                return [...prevUsers, user];
              });
            }
            
            if (mediaType === "audio" ) {
                user.audioTrack?.play();
            }
          });
    
          rtc.client.on("user-unpublished", (user, type) => {
            if (type === "audio" ) {
              user.audioTrack?.stop();
            }
            if (type === "video") {
              setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
              });
            }
          });
    
          rtc.client.on("user-left", (user) => {
            console.log("leaving", user);
            setUsers((prevUsers) => {
              return prevUsers.filter((User) => User.uid !== user.uid);
            });
          });
    
          await rtc.client.join(appId, name, token, null);

          if (audioTrack && trackType === "audio") {
                await audioTrack.setEnabled(true);
                await rtc.client.publish([audioTrack]);
                setStart(true);
            }
            
        };

        init(channelName);
    
      }, []);

    return (
        <div className="App">
        { audioTrack && (
          <Controls  audioTrack={audioTrack}  setStart={setStart} client={rtc.client} setInCall={setInCall} trackType={trackType} />
        )}
        {start && audioTrack && trackType === "audio" ? (<Audio users={users} audioTrack={audioTrack} />) : null}
       
      </div>
    )
}

export default AudioCall
