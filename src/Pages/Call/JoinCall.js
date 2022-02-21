import React, { useEffect, useState } from "react";
import ChannelForm from "./ChannelForm"
import VideoCall from "./VideoCall"
import axios from "axios"
import {
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import firebase from "../../firebaseConfig"

const config = { 
  mode: "rtc", codec: "vp8",
};


const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const appId = "0742c8affa02429b9622956bac0d67d0"; //ENTER APP ID HERE

function JoinCall() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const generateToken = async() => {
      let res = await axios.get('https://api.clarondoc.com/urgent/token')
      console.log(res.data, "resssssss")
      let doc = await firebase.firestore().collection('calls').doc(email_r.current).set({data: {
        time: new Date(),
        recipient: email_r.current,
        caller: email,
        status: 'started',
        channel: res.data.RTCChannel,
        token: res.data.RTCAccessToken
      }})
      setChannelName(res.data.RTCChannel)
      setToken(res.data.RTCAccessToken)
    }

    generateToken()
  }, [])
  return (
    <div>
      <h1 className="heading">Video call to test how Agora works</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} appId={appId} token={token} channelName={channelName} useClient={useClient} useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks} />
      ) : null
        // <ChannelForm setInCall={setInCall} appId={appId} />
      }
    </div>
  );
}

export default Index;