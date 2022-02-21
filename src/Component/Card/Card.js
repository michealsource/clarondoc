import React,{useState,useEffect} from 'react'
import './Card.css'
import {Link } from "react-router-dom"
import moment from 'moment';
import { userDetails, downgrade } from '../../Api/Auth';
// import images
import drug from '../../images/drug.png'
import labrequest from '../../images/labrequest.png'
import ambulance from '../../images/ambulance.png'
import homecare from '../../images/homecare.png'
import MainLayout from '../../Pages/MainLayout'
import {useNavigate } from "react-router-dom"
// import {userDetails} from '../../Api/Auth'
function Card({sidebar}) {
    const navigate = useNavigate();
    const[user,SetUser]= useState()
    const [expiry, setexpiry] = useState()
  
    useEffect(()=>{
        
        (async()=>{
          
            try {
                var account = await localStorage.getItem('user')
                var token = await localStorage.getItem('access-token')
                var key = await localStorage.getItem('api-key');
                SetUser(JSON.parse(account))

                console.log('account is '+JSON.parse(account).subscription)
                userDetails(JSON.parse(account).email, key, token).then(data=>{
                    SetUser(data)
                }).catch(e=>{
                    console.log('Error: ', e)
                })
            } catch (error) {
                console.log(error)
            }

            try{
                localStorage.setItem('subscription', JSON.parse(account).subscription);
                checkSubscription(JSON.parse(account).subscription_end);
            }catch(e){}

        })()

    }, [])


    const editPage=()=>{
        navigate('/Editpatient',{state:{user:user}});
          }

        //   CHECKING USER SUBSCRIPTION 
        const checkSubscription = async(date)=>{

            if(date == null){
                return
            }
    
            const days = moment().diff(date, 'days')
            const left = moment(date).add(1, 'day').fromNow()
    
            localStorage.setItem('subscription_exp_day', days);
    
            if(days == 0){
                setexpiry('Your subscription ends today. Renew now to avoid losing access to services')
            }else if (days < 0 && days > -11){
                setexpiry(`Your subscription ends in ${left}. Renew now to avoid losing access to services`)
            }else if(days > 0 && days < 10){
                setexpiry(`Your subscription ended ${left}. Renew now to avoid losing access to services`)
            }else if(days > 10){
                let res = await downgrade()
                console.info(res)
                // setexpiry(`Your subscription ended ${left}. Renew now to avoid losing access to services`)
            }
        }
    

    return (
        <MainLayout>
        <div className="main-area-card-container">
            <div class="notifcation-container">
                <div class="update-profile">
                    <p>Profile Update: You should update your "Blood Group, City, Gender, State, Genotype and Date Of Birth</p>
                    <button onClick={()=>{editPage()}} className="update-btn-user">
                        Update Profile
                    </button>
                </div>

                <div className="update-subscription">
                    <p>Subscription: To book a doctor, you must have an active subscription</p>
                    <Link to="/subscribe" className="subscribe-upd-btn-user">
                        Subscribe
                    </Link>
                </div>

            </div>

            <div class="first-container">
                <div class="name-container">
                    <h4>Hi, {user?user.firstname:''}</h4>
                    <p>Welcome Back!</p>
                </div>

                <div class="doctor-book-btn">
                    <Link to="/consultation" className="demand-booking-btn">Book a Doctor</Link>
                </div>
            </div>


            <div className="cards">
                <div class="card-container">
                    <Link to="/drugs" class="card-box">
                        <img src={drug} alt="" />
                        <h4>Drugs Order History</h4>
                        <span>No Order made yet</span>
                    </Link>

                    <Link to="/laboratory" class="card-box">
                        <img src={labrequest} alt="" />
                        <h4>Lab Request History</h4>
                        <span>No request made yet</span>
                    </Link>

                    <Link to="/ambulance" class="card-box">
                        <img src={ambulance} alt="" />
                        <h4>Ambulance Request History</h4>
                        <span>No request made yet</span>
                    </Link>

                    <Link to="/homecare" class="card-box">
                        <img src={homecare} alt="" />
                        <h4>HomeCare Request History</h4>
                        <span>No request made yet</span>
                    </Link>
                </div>
            </div>

{/* APPOINTMENT STRUCTURE */}
            <div class="over-view">
                <h1>Overview</h1>
                <div class="inner-over-view">
                    <div class="over-view-header appointment">
                        <h3>Appointments</h3>
                        <div class="prescription-conent">
                            Your appointments will be listed here
                        </div>

                    </div>

                    <div class="over-view-header">
                        <h3>Prescriptions</h3>
                        <div class="prescription-conent">
                            Your prescriptions will be listed here
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </MainLayout>
    )
}

export default Card
