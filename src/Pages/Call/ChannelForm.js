import React, {useEffect, useRef} from 'react'
import firebase from "../../firebaseConfig"

function ChannelForm(props) {
    const { setInCall, setChannelName, appId } = props;
    const callingUser = localStorage.getItem("user")

    const countt_r = useRef(0)
    countt_r.current = 0
    let callerId = callingUser.email
    let _engine
    let urgent

    useEffect(() => {

    // console.log(firebase.firestore(), "fff")

      (async()=>{
  
        // if(route.params.user == null){
        //   setInCall(true);
        // }else{
        //   setInCall(true);
        // }

        setInCall(true);
        // firebase
        firebase.firestore().collection('calls').doc(callerId).onSnapshot(async snapshot=>{
          // console.log('Docs: ', snapshot.docs.length)
          // if(snapshot.docs.length > 0){
          if(true){
              // urgent = snapshot.docs[0]
              urgent = snapshot.data().data;
              // let call = await AsyncStorage.removeItem('_call')
              // // console.log(urgent.data().channel)
  
              console.log('count:'+ countt_r.current)
  
              if(countt_r.current >= 3 ){
                  // console.log('reached')
                  // console.log(urgent.status)
                  if((urgent.status != "ended") ){
                      
                  }else{
                    console.log('reached end call'+urgent.status)
                      // try{
                      //   if(_engine != null){
                      //     await _engine.leaveChannel()
                      //   }
                      // }catch(e){
                      //   console.log('Leave error: ', e)
                      // }
                      // navigation.goBack()
                      alert("call ended")
                  }
                  
                  
              }
  
              countt_r.current+=1;
          }
      }, e => {
          console.log('Firebase Error: ', e)
      })
      })()
  
      return () => {
        if(callerId!= null){
          firebase.firestore().collection('calls').doc(callerId).set({data: {
            status: 'ended'
          }}, {merge: true})
        }
        // _engine.destroy()
        // setInCall(false);
  
        countt_r.current = 0;
      }
    }, [])
    return (
        <div>
             {/* <form className="join">
      {appId === '' && <p style={{color: 'red'}}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
      <input type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={(e) => {
        e.preventDefault();
        setInCall(true);
      }}>
        Join
      </button>
    </form> */}
        </div>
    )
}
export default ChannelForm