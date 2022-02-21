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

const config = { 
  mode: "rtc", codec: "vp8",
};


const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

// const appId = "66310665192842a28975ec67dfdd536b"; //ENTER APP ID HERE
const appId = "0742c8affa02429b9622956bac0d67d0"; //ENTER APP ID HERE
const token2 = "0060742c8affa02429b9622956bac0d67d0IADGZtOLnBrwHXS/vtrNXtsJDDwfjTSU6lVP4Afa1NYwfyKahLQAAAAAIgA1ELCoHocTYgQAAQAehxNiAgAehxNiAwAehxNiBAAehxNi";

function Index() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const generateToken = async() => {
      let res = await axios.get('https://api.clarondoc.com/urgent/token')
      setChannelName(res.data.RTCChannel)
      setToken(res.data.RTCAccessToken)
    }

    generateToken()
  }, [])
  return (
    <div>
      <h1 className="heading">Video call to test how Agora works</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} appId={appId} token={token2} channelName={"20d66bbd-c458-4122-a354-07f2c277b9ec"} useClient={useClient} useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks} />
      ) : (
        <ChannelForm setInCall={setInCall} appId={appId} />
      )}
    </div>
  );
}

export default Index;