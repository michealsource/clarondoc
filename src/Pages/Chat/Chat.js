import React,{useState,useEffect,useRef} from 'react'
import './Chat.css'
import { FaTelegramPlane,FaRegArrowAltCircleUp } from "react-icons/fa";
import MainLayout from '../MainLayout';
import {useLocation} from 'react-router-dom'
import {sendMessage} from '../../Api/chats';
import {userDetails} from '../../Api/Auth'
import firebase from 'firebase'
import {formatRelative} from 'date-fns'
let interval
    
function Chat() {
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
     }else {
        firebase.app(); // if already initialized, use that one
     }


    const {state} = useLocation();
    const [email, setemail] = useState('')
    const [user, setUser] = useState({})
    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(true)
    const [conversation, setconversation] = useState([])
    const [attachment, setattachment] = useState()
    const [attachments, setattachments] = useState([])
    const [attachmenttype, setattachmenttype] = useState()
    const [attachmentsize, setattachmentsize] = useState()
    const [error, seterror] = useState()
    const [selected, setSelected] = useState()
    const [sendingNow, setsendingNow] = useState(false)
    const [sendingNowAA, setsendingNowAA] = useState(false)
    const [loadingChat, setloadingChat] = useState(false)
    const emailR = useRef(null);
    
    //FUNCTION TO UPLOAD ATTACHEMENT

    // console.log(user.email)
    // console.log(state.email)
    const chat_code = (patient, doctor)=>{
        return patient+'-'+doctor;
    }
    // FUNCTION FOR SENDING MESSAGE
    const send = async () => {
        let url = ''; let type = '';
        var messag = message;
        if(message.length === 0){
            messag = 'Media Attachment';
        }
        setsendingNow(true)

        if(attachment){
            type = attachment.type

            // adding
            // console.log(attachment)
            // var path = getPlatformPath(attachment).value;
            // var name = getFileName(attachment.name, path);
            // console.log(name+'--'+path);
            // return false;
            try{
                // var blob = await uriToBlob(attachment.uri);
                // let attached = await firebase.storage().ref(`new-attaches/${name}`).put(blob, {contentType: type})
                // url = await firebase.storage().ref(`new-attaches`).child(name).getDownloadURL()
                // console.log(url)
                // setsendingNow(false)
                // return false;
            }catch(e){
                console.log('*****')
                console.log(e)
            }
        }

        try{

            // let email = localStorage.getItem('email')
            let sen = {
                message: messag.trim(),
                recipient: state.email,
                attachment: 'https://www.manchestereveningnews.co.uk/sport/football/football-news/man-city-tuchel-chelsea-liverpool-22624756',
                file_type: type,
                sender: user.email,
                symptoms: [],
                createDate: (new Date()).toLocaleString(),
                timeStamp: Date.now()
            };

            sendMessage(sen)

            await firebase.firestore().collection('newSMessages').doc(chat_code(user.email,state.email)).collection('messages').add(sen);

            if(true){
                setmessage('')
                setattachment(null)
                alert('messege sent successfully')
                // setloading(true)
                // startStream()
            }else{
                seterror('There was an error sending your message')
            }

        }catch(e){
            console.log('message sending failed: ', e)
        }

        setsendingNow(false)

    }

    // LOAD FIREBASE CHAT FUNCTION
    const loadfirebasechat = async()=>{
       
        console.log(chat_code(user.email, state.email))
        firebase.firestore().collection('newSMessages').doc(chat_code(user.email, state.email)).collection('messages').orderBy('timeStamp', 'desc').onSnapshot(snapshot=>{
            var r = snapshot.docs.map(doc =>{
                return (doc.data())
            });
            console.log(r)
            setconversation(r)
            setloading(false)
          }, error=>{
            console.log(error)
          });
    }

    useEffect(() => {
        (async()=>{
            let account = localStorage.getItem("user")
            let token  = localStorage.getItem('access-token')
            let key = localStorage.getItem('api-key');
            let ema = localStorage.getItem('email');
            setemail(ema)
            emailR.current = ema;
            userDetails(JSON.parse(account).email, key, token).then(data=>{
                setUser(data)
            })
            await loadfirebasechat()
        })()
        return ()=>{
            clearInterval(interval)
        }

     }, [])
    return (
        <MainLayout>
        <div className="chart-cantaner">
            
            <h4 className="dr-chat-detail">You are Chatting with <span>Dr {state.firstname}</span></h4>

            {conversation.map(chat=>{
                console.log(chat)
                    return(
                        <div className={`${chat.sender===user.email?'chat-msg-user':'chat-msg-doc'}`}>
                         {chat.attachment != null && chat.file_type.includes('image') ?  
                        <div>
                            <img src={chat.attachment} alt="" className='msg-img'/>
                        </div>: null
                        }  
                        <p>{chat.message?chat.message:'loading chat'}</p>
                        <p>{formatRelative(new Date(chat.createDate), new Date())}</p>
                        </div>
                    )
                })}
            <div class="input-chat-conatiner">
                <textarea value={message} onChange={(e)=>setmessage(e.target.value)} placeholder="type your message" className="chat-text"></textarea>
                 <label for="fileimg"><FaRegArrowAltCircleUp className="upload-icon"/></label>   
                <input type="file" id="fileimg"  className="file-upload-file"/>

                <FaTelegramPlane onClick={send}  className="upload-icon"/>
            </div>
        </div>
        </MainLayout>
    )
}

export default Chat
