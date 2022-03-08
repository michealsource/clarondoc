import React,{useState,useEffect} from 'react'
import './Notification.css'
import FollowDrugsModal from './FollowDrugModal'
import FollowLabModal from './FollowLabModal'
import { formatDistanceToNow } from 'date-fns'
import MainLayout from '../MainLayout'
import { fetchNotifications } from '../../Api/notifications';
import loading from '../../images/loading.gif'
import {useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'

function Notification() {
    let navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([])
    const notificationsData = useSelector((state)=>state.user.notifications)
    // useEffect(()=>{

    //     (async()=>{
    //       let response = await fetchNotifications();
    //       console.log(response)
    //       setNotifications(response)
          
    //     })()
       
    // }, [])
    
    console.log(notificationsData, "notificationsDatanotificationsData")
    return (
        <MainLayout>
        
        <div className="notification-top-container">
        <h4>Notifications</h4>
            <div>

                {notificationsData.length > 0 && (notificationsData.length > 0 ? notificationsData.map((item)=>{
                    return(
                <div className={`${item.status === "Unread" ? "notification-container" :  "notification-container-read"}`  }
                onClick={
                    ()=>item.body.includes('appointment') ? navigate('/AppointmentHistory'):
                    item.body.includes('Ambulance')? navigate('/ambulance'):item.body.includes('drugs')?
                    navigate('/drugs'):item.body.includes('Lab Requests')?navigate('/laboratory'):item.body.includes('Home')?navigate('/homecare'):''}
               
                >
                <h4 
                 class="notification-title">{item.body}<span className="time">

                {formatDistanceToNow(new Date(item.createDate), { addSuffix: true })}</span></h4>
                 
                {/* {data.status? <p>{data.prescription}<button className="btn-notfi" onClick={()=>setOpen(true)}>{data.status}</button></p>:''} */}
              </div>
                    )
                }):(<img src={loading} alt="" className="loader-img"/>))}
                {/* <FollowDrugsModal open={open} setOpen={setOpen}/>
                <FollowLabModal/> */}
            </div>
        </div>
        </MainLayout>
    )
}
export default Notification
