import React,{useEffect,useState} from 'react'
import './Homecare.css'
import { Link } from 'react-router-dom'
import * as API from '../../Api/pharmacy'
import loading from '../../images/loading.gif'
function HomeCareCard() {
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
        <div className="top-history-container">
            <div class="row-his">
                <div className="column-his-1">
                    
                <div class="col-container-home">
                    
                    {bookings.length > 0 && (bookings.length? bookings.map((item)=>(
                        <>
                        <div className='single-home-car'>
                        <div className="head-his">
                        <h4 className='reason'>{item.reasons[0]}</h4>
                        <p className={item.status==='Pending'?'pending':''}>{item.status}</p>
                    </div>
                            <div className='booked-container-home'><p className='a-head'>Request Id</p> <p>{item.id}</p> </div>
                            <div className='booked-container-home'><p className='a-head'>Schedule Date</p> <p>{item.scheduledFor}</p> </div>
                            <div className='booked-container-home'><p className='a-head'>Patient (Male)</p> <p>{item.names}</p> </div>
                            <div className='booked-container-home'><p className='a-head'>Email</p> <p>{item.email}</p> </div>
                            <div className='booked-container-home'><p className='a-head'>Contact</p> <p>{item.bestContact}</p> </div>
                            <div className='booked-container-home'><p className='a-head'>Address</p> <p>{item.address}</p> </div>
                            <div className='divider'></div>
                    
                             <div className='booked-container-home'>
                              <p className='a-head'>Symptoms</p> 
                               <p>{item.symptoms.map(sym=>(<div className='sys-container'><p className='symtomss'>{sym},</p>
                            </div>))}</p> </div>
                            
                        </div>
                        </>
                    )):(<img src={loading} alt="" className="loader-img"/>))}
                </div>
                </div>
            </div>

        </div>
    )
}

export default HomeCareCard
