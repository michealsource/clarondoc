import React, {useState, useEffect} from 'react'
import {Controls} from "./Controls"
import Videos from "./Videos"
import Audio from "./Audio"

function VideoCall(props) {
    const { setInCall, channelName, useClient, useMicrophoneAndCameraTracks, token, appId, trackType } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    
console.log(tracks,"trackstrackstracks")
    useEffect(() => {
        // function to initialise the SDK
        let init = async (name) => {
          client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType);
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
    
          client.on("user-unpublished", (user, type) => {
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
    
          client.on("user-left", (user) => {
            console.log("leaving", user);
            setUsers((prevUsers) => {
              return prevUsers.filter((User) => User.uid !== user.uid);
            });
          });
    
          await client.join(appId, name, token, null);
          if (tracks && trackType === "audio") {
                await tracks[1].close()
                await client.publish([tracks[0]]);
                setStart(true);
            }else if(tracks && trackType !== "audio"){
                await client.publish([tracks[0], tracks[1]]);
                setStart(true);
            }
            
        };
    
        if (ready && tracks) {
          console.log("init ready");
          init(channelName);
        }
    
      }, [channelName, client, ready, tracks]);

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
