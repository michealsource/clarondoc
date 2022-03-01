import React, {useState, useEffect} from 'react'
import {Controls} from "./Controls"
import Videos from "./Videos"
import Audio from "./Audio"
import AgoraRTC from "agora-rtc-sdk-ng";

function VideoCall(props) {
    const { setInCall, rtc, channelName, useClient, useMicrophoneAndCameraTracks, token, appId, trackType } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const [audioTrack, setAudioTrack] = useState(null);
    const [videoTrack, setVideoTrack] = useState(null);

    console.log(audioTrack, videoTrack, "videoTrackvideoTrackvideoTrack")
    
console.log(rtc,"trackstrackstracks")

    useEffect(() => {
        
         const getTracks = async() => {
            const audioTrack =  await AgoraRTC.createMicrophoneAudioTrack();
            const videoTrack = await AgoraRTC.createCameraVideoTrack();
            setAudioTrack(audioTrack)
            setVideoTrack(videoTrack)
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
    
          await rtc.client.join(appId, name, token);
          if (audioTrack && trackType === "audio") {
                await videoTrack.close();
                await audioTrack.setEnabled(true);
                await rtc.client.publish([audioTrack]);
                setStart(true);
            }else if(videoTrack && trackType !== "audio"){
              await audioTrack.setEnabled(true);
                await rtc.client.publish([videoTrack, audioTrack]);
                setStart(true);
            }
            
        };

        init(channelName);
    
        // if ( videoTrack && audioTrack) {
        //   console.log("init ready");
        //   init(channelName);
        // }
    
      }, []);

    return (
        <div className="App">
        { audioTrack && videoTrack && (
          <Controls  audioTrack={audioTrack} videoTrack={videoTrack} setStart={setStart} client={rtc.client} useClient={useClient} setInCall={setInCall} trackType={trackType} />
        )}
        {start && audioTrack && videoTrack && trackType === "audio" ? (<Audio users={users} audioTrack={audioTrack} />) : start && audioTrack && videoTrack && trackType === "video" ? (<Videos users={users} videoTrack={videoTrack} />) : null}
        {/* {start && tracks && <Videos users={users} tracks={tracks} />} */}
      </div>
    )
}

export default VideoCall
