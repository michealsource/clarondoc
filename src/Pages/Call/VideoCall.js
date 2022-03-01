import React, {useState, useEffect} from 'react'
import {Controls} from "./Controls"
import Videos from "./Videos"
import Audio from "./Audio"
import AgoraRTC from "agora-rtc-sdk-ng";

function VideoCall(props) {
    const { setInCall, channelName, useClient, useMicrophoneAndCameraTracks, token, appId, trackType } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    // const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    let rtc
    // Create an audio track from the audio captured by a microphone
rtc.localAudioTrack = AgoraRTC.createMicrophoneAudioTrack();
// Create a video track from the video captured by a camera
rtc.localVideoTrack = AgoraRTC.createCameraVideoTrack();
// Play localStream
rtc.localVideoTrack.play("local-stream");

    
console.log(rtc,"trackstrackstracks")
    useEffect(() => {
        // function to initialise the SDK
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
            console.log("unpublished", user, type);
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
          if (tracks && trackType === "audio") {
                await tracks[1].close()
                await rtc.client.publish([tracks[0]]);
                setStart(true);
            }else if(tracks && trackType !== "audio"){
                await rtc.client.publish([tracks[0], tracks[1]]);
                setStart(true);
            }
            
        };
    
        if (ready && tracks) {
          console.log("init ready");
          init(channelName);
        }
    
      }, [channelName, ready, tracks]);

    return (
        <div className="App">
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} useClient={useClient} setInCall={setInCall} trackType={trackType} />
        )}
        {start && tracks && trackType === "audio" ? (<Audio users={users} tracks={tracks} />) : start && tracks && trackType === "video" ? (<Videos users={users} tracks={tracks} />) : null}
        {/* {start && tracks && <Videos users={users} tracks={tracks} />} */}
      </div>
    )
}

export default VideoCall
