
import React from "react"
import firebase from "firebase"

    const config = ({
        apiKey: "AIzaSyA07_A7At-J9Mu6NMXBpoLVYcrKWR3ezy4",
        authDomain: "fcm-notify-db9b8.firebaseapp.com",
        databaseURL: "https://fcm-notify-db9b8.firebaseio.com",
        projectId: "fcm-notify-db9b8",
        storageBucket: "fcm-notify-db9b8.appspot.com",
        messagingSenderId: "77071010064",
        appId: "1:77071010064:web:e693b1fa22167a00e27d95",
        measurementId: "G-VWCS7XBQC3"
    });


  firebase.initializeApp(config)

  export default firebase