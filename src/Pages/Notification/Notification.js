import React,{useState} from 'react'
import './Notification.css'
import FollowDrugsModal from './FollowDrugModal'
import FollowLabModal from './FollowLabModal'

const notification = [
    {
        id: 1,
        title: "Drug Notification From Samuel",
        prescription:"You have a new Drug Prescription from Samuel",
        status:"Follow Drug Prescription",
        date: "05/05/2021 07:23 PM"
    },
    {
        id: 2,
        title: "Lab prescription From Samuel",
        prescription:"You have a new lab request from Samuel",
        status:"Follow lab test",
        date: "30/08/2021 04:54 PM"
    },
    {
        id: 3,
        title: "Lab prescription From Samuel",
        prescription:"You have a new lab request from Samuel",
        status:"Follow Drug test",
        date: "30/08/2021 02:31 PM"
    },
    {
        id: 4,
        title: "Request Made",
        prescription:"Your request to Ambulance/Emergency Requests 566061828 was made successful",
        status:"",
        date: "05/05/2021 07:23 PM"
    }, {
        id: 5,
        title: "Appointment made",
        prescription:"your appointment with physiotherapist. Nana Kwame Safo-Kantanka, PT. on 4/30/2021, 2:53:00 PM was made successfully",
        status:"",
        date: "30/04/2021 12:53 AM"
    }, {
        id: 6,
        title: "Request made",
        prescription:"Your request to Ambulance/Emergency Requests 223145038 was made successful",
        status:"Follow Drug test",
        date: "28/04/2021 04:37 PM"
    }
]

function Notification() {
    const [open, setOpen] = useState(false);
    return (
        <div className="notification-top-container">
            <h4>Notifications</h4>
                {notification.map((data)=>{
                    return(
                <div class="notification-container">
                <h4  class="notification-title">{data.title}<span className="time">{data.date}</span></h4>
                {data.status? <p>{data.prescription}<button className="btn-notfi" onClick={()=>setOpen(true)}>{data.status}</button></p>:''}
              </div>
                    )
                })}
                <FollowDrugsModal open={open} setOpen={setOpen}/>
                <FollowLabModal/>
        </div>
    )
}
export default Notification
