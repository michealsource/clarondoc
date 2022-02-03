import React from 'react'

function ChannelForm(props) {
    const { setInCall, setChannelName, appId } = props;
    return (
        <div>
             <form className="join">
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
    </form>
        </div>
    )
}
export default ChannelForm