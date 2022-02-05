
import './App.css';
import firebase from "./firebaseConfig"
import React,{useState,useEffect} from 'react'
import IndexRoutes from './Routes/index'


function App() {
  // const [token, setToken] = useState("")

  // useEffect(() => {
  //   const messaging = firebase.messaging()
  //   const token = messaging.getToken()
  //   setToken(token)
  // })

  // console.log(token)

  return (
    <IndexRoutes/>
  );
}

export default App;
