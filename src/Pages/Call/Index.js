import React, { useEffect, useState } from "react";
import ChannelForm from "./ChannelForm"
import VideoCall from "./VideoCall"
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

const appId = "66310665192842a28975ec67dfdd536b"; //ENTER APP ID HERE
const token = "00666310665192842a28975ec67dfdd536bIAAPVs1q7EOWpSgfGA73SnUOwd6cMQV1VFg90F59VOS22ppjTicAAAAAEADbqsx09wb9YQEAAQAgXvxh";

function Index() {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div>
      <h1 className="heading">Video call to test how Agora works</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} appId={appId} token={token} channelName={channelName} useClient={useClient} useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} appId={appId} />
      )}
    </div>
  );
}

export default Index;