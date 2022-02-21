import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export const Controls = (props) => {
    
    const { tracks, setStart, setInCall, useClient, trackType } = props;
    const client = useClient();
    const [trackState, setTrackState] = useState({ video: true, audio: true });
    const navigate = useNavigate()

    
    const mute = async (type) => {
      if (type === "audio" ) {
        await tracks[0].setEnabled(!trackState.audio);
        setTrackState((ps) => {
          return { ...ps, audio: !ps.audio };
        });
      } else if (type === "video") {
        await tracks[1].setEnabled(!trackState.video);
        setTrackState((ps) => {
          return { ...ps, video: !ps.video };
        });
      }
    };
    
    const leaveChannel = async () => {
      await client.leave();
      client.removeAllListeners();
      tracks[0].close();
      tracks[1].close();
      setStart(false);
      setInCall(false);
      navigate(-1)
    };
  
    return (
      <div className="controls">
        <p className={trackState.audio ? "on" : ""}
          onClick={() => mute("audio")}>
          {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
        </p>
        {
            trackType === "audio" ? null : (
                <p className={trackState.video ? "on" : ""}
                onClick={() => mute("video")}>
                {trackState.video ? "MuteVideo" : "UnmuteVideo"}
                </p>
            )
        }

        {<p onClick={() => leaveChannel()}>Leave</p>}

      </div>
    );
  };
