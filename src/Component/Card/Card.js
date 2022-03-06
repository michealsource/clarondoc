import React, { useState, useEffect } from 'react'
import './Card.css'
import { Link } from "react-router-dom"
import moment from 'moment';
import { userDetails, downgrade } from '../../Api/Auth';
// import images
import drug from '../../images/drug.png'
import labrequest from '../../images/labrequest.png'
import ambulance from '../../images/ambulance.png'
import homecare from '../../images/homecare.png'
import MainLayout from '../../Pages/MainLayout'
import { useNavigate } from "react-router-dom"
import { myBookings } from '../../Api/doctors';
import { useSelector } from 'react-redux'
import loading from '../../images/loading.gif'
function Card({ sidebar }) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.value)
    const [bookings, setBookings] = useState([])
    const [expiry, setexpiry] = useState()

    //   CHECKING USER SUBSCRIPTION 
    const checkSubscription = async (date) => {

        if (date == null) {
            return
        }

        const days = moment().diff(date, 'days')
        const left = moment(date).add(1, 'day').fromNow()
        console.log(days, 'gggggg')
        localStorage.setItem('subscription_exp_day', days);

        if (days === 0) {
            setexpiry('Your subscription ends today. Renew now to avoid losing access to services')
        } else if (days < 0 && days > -11) {
            setexpiry(`Your subscription ends in ${left}. Renew now to avoid losing access to services`)
        } else if (days > 0 && days < 10) {
            setexpiry(`Your subscription ended ${left}. Renew now to avoid losing access to services`)
        } else if (days > 10) {
            let res = await downgrade()
            console.info(res)
            // setexpiry(`Your subscription ended ${left}. Renew now to avoid losing access to services`)
        }
    }


    useEffect(() => {
        (async () => {
            try {
                var account = localStorage.getItem('user')
                // SetUser(JSON.parse(account))
                console.log('account is ' + JSON.parse(account).subscription)
                userDetails(JSON.parse(account).email).then(data => {
                    console.log(data, 'gggggggggg')
                    localStorage.setItem('subscription', data.subscription);
                    checkSubscription(data.subscription_end);
                }).catch(e => {
                    console.log('Error: ', e)
                })

                let res = await myBookings()

                setBookings(res.requests)
            } catch (error) {
                console.log(error)
            }

        })()

    }, [])



    const editPage = () => {
        navigate('/Editpatient', { state: { user: userData } });
    }

    return (
        <MainLayout>
            <div className="main-area-card-container">
                <div class="notifcation-container">
                    <div class="update-profile">
                        <p>Profile Update: You should update your first name,last name , email,  and phone number</p>
                        <button onClick={() => { editPage() }} className="update-btn-user">
                            Update Profile
                        </button>
                    </div>


                    {expiry ? (<div className="update-subscription">
                        <p>{expiry}</p>
                        <Link to="/subscribe" className="subscribe-upd-btn-user">
                            Subscribe
                        </Link>
                    </div>) : <></>}

                </div>

                <div class="first-container">
                    <div class="name-container">
                        <h4>Hi, {userData ? userData.firstname : ''}</h4>
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
                    <h1 className="app-header">Overview</h1>
                    <div class="inner-over-view">
                        <div class="over-view-header appointment">
                            <h3 className="app-header">Appointments</h3>
                            {/* <div class="prescription-conent">
                           
                        </div> */}

                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div class="his-container-cont-lab">
                                                {bookings.length > 0 && (bookings.length ? bookings.map((item) => (
                                                    <>
                                                        <div className='single-ambulance'>
                                                            <div>
                                                                <p className="his-title">{item.physician.fullName}</p>
                                                                <div className='request-test'>
                                                                    <p>Was on</p>
                                                                    <p>{new Date(item.scheduledFor).toString().substring(0, 21)}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </>
                                                )) : (<img src={loading} alt="" className="loader-img" />))}
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Card
