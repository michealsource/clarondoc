
import './App.css';
import firebase from 'firebase'
import React,{useState,useEffect} from 'react'
import IndexRoutes from './Routes/index'

if (!firebase.apps.length) {
  firebase.initializeApp({
      apiKey: "AIzaSyA07_A7At-J9Mu6NMXBpoLVYcrKWR3ezy4",
      authDomain: "fcm-notify-db9b8.firebaseapp.com",
      databaseURL: "https://fcm-notify-db9b8.firebaseio.com",
      projectId: "fcm-notify-db9b8",
      storageBucket: "fcm-notify-db9b8.appspot.com",
      messagingSenderId: "77071010064",
      appId: "1:77071010064:web:e693b1fa22167a00e27d95",
      measurementId: "G-VWCS7XBQC3"
  });
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  return (
    <IndexRoutes/>

  );
}

export default App;
