import React, {useState, useEffect} from 'react'
import {Controls} from "./Controls"
import Videos from "./Videos"

function VideoCall(props) {
    const { setInCall, channelName, useClient, useMicrophoneAndCameraTracks, token, appId } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        // function to initialise the SDK
        let init = async (name) => {
          client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            console.log("subscribe success");
            if (mediaType === "video") {
              setUsers((prevUsers) => {
                return [...prevUsers, user];
              });
            }
            if (mediaType === "audio") {
              user.audioTrack?.play();
            }
          });
    
          client.on("user-unpublished", (user, type) => {
            console.log("unpublished", user, type);
            if (type === "audio") {
              user.audioTrack?.stop();
            }
            if (type === "video") {
              setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
              });
            }
          });
    
          client.on("user-left", (user) => {
            console.log("leaving", user);
            setUsers((prevUsers) => {
              return prevUsers.filter((User) => User.uid !== user.uid);
            });
          });
    
          await client.join(appId, name, token, null);
          if (tracks) await client.publish([tracks[0], tracks[1]]);
          setStart(true);
    
        };
    
        if (ready && tracks) {
          console.log("init ready");
          init(channelName);
        }
    
      }, [channelName, client, ready, tracks]);

    return (
        <div className="App">
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} useClient={useClient} setInCall={setInCall} />
        )}
        {start && tracks && <Videos users={users} tracks={tracks} />}
      </div>
    )
}

export default VideoCall