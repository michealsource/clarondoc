import React,{useState,useEffect} from 'react'
import './Notification.css'
import FollowDrugsModal from './FollowDrugModal'
import FollowLabModal from './FollowLabModal'
import { formatDistanceToNow } from 'date-fns'
import MainLayout from '../MainLayout'
import { fetchNotifications } from '../../Api/notifications';

function Notification() {
    useEffect(()=>{

        (async()=>{
          let response = await fetchNotifications()
          setNotifications(response)
          console.log(response[0])
        })()
    
    }, [])
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([])
    return (
        <MainLayout>
        
        <div className="notification-top-container">
        <h4>Notifications</h4>
            <div>
                {notifications.length > 0 ? notifications.map((data)=>{
                    return(
                <div class="notification-container">
                <h4  class="notification-title">{data.body}<span className="time">{formatDistanceToNow(new Date(data.createDate), { addSuffix: true })}</span></h4>
                {/* {data.status? <p>{data.prescription}<button className="btn-notfi" onClick={()=>setOpen(true)}>{data.status}</button></p>:''} */}
              </div>
                    )
                }):'No notifications'}
                {/* <FollowDrugsModal open={open} setOpen={setOpen}/>
                <FollowLabModal/> */}
            </div>
        </div>
        </MainLayout>
    )
}
export default Notification
