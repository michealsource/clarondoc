
import './App.css';
import React,{useState,useEffect} from 'react'
import IndexRoutes from './Routes/index'
import { requestFirebaseNotificationPermission, onMessageListener } from "./firebaseConfig"
import {ShowMessage, type} from "../src/Component/Toaster"


function App() {
  const [token, setToken] = useState("")


  requestFirebaseNotificationPermission()
  .then((firebaseToken) => {
    // eslint-disable-next-line no-console
    // console.log(firebaseToken);
    localStorage.setItem("firebaseToken", firebaseToken)
    setToken(firebaseToken)
  })
  .catch((err) => {
    return err;
  });




onMessageListener()
.then((payload) => {
  const { title, body } = payload.data;
  ShowMessage(`${title}; ${body}`)
})
.catch((err) => {
  ShowMessage(type.ERROR, JSON.stringify(err))
});

  return (
    <IndexRoutes/>
  );
}

export default App;
