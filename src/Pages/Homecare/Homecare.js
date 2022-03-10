import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import './Homecare.css'
import HomeCareCard from './HomeCareCard'
import MainLayout from '../MainLayout';
import * as API from '../../Api/pharmacy'
function Homecare() {

    const [bookings, setBookings] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        (async()=>{
    
          if(!loaded){
            try{
                let res
                res = await API.myHomecareRequests()
                setBookings(res.requests)
                console.log(bookings)
                
            }catch(e){
              console.log(e)
            }
            setLoaded(true)
          }
    
        })()
      })
     
    return (
        <MainLayout>
        <div className="home-care-container-1">
            <div class="homecare-inner-container-2">
                <h2>HOME CARE OVERVIEW</h2>
                <div class="laboratory-container-btn">
                    <div class="individual-request">
                        <Link to="/HomeCareForm" className="individual-btn">Request Home Care</Link>
                    </div>
                </div>
            </div>

            <div class="appointment-container-box">

                <div class="appointment-box two">
                    <div className="pending-num">{bookings.length}</div>
                    <p>Pending Request</p>
                </div>

                <div class="appointment-box three">
                    <div className="completed-num">0</div>
                    <p>Completed Request</p>
                </div>

            </div>

            <HomeCareCard/>
        </div>
        </MainLayout>
    )
}

export default Homecare
