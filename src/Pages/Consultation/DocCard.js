import React, { useState, useEffect } from 'react'
import { FaRegCalendarAlt, FaHeart, FaPhoneAlt, FaInfo } from "react-icons/fa";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { userDetails, downgrade } from '../../Api/Auth'
import { fetchDoctors } from '../../Api/doctors';
import DoctorProfile from './DoctorProfile';
function DocCard({ doctor, setCall, call,  handleOpen }) {
    const [doctors, setDoctors] = useState([])
    const [user, setUser] = useState({})
    const [expiry, setexpiry] = useState()

    const [selectedData, setSelectedData] = useState({});
    const [open, setOpen] = useState(false);

    const [openP, setOpenP] = React.useState(false);
    const  handleOpenProfile = () => setOpenP(true);
    const  handleCloseProfile = () => setOpenP(false);

    const handleOpenP = (selectedRec) => {
        setSelectedData(selectedRec);
        setOpen(true)
    }
   
  
    const checkSubscription = async (date) => {
        if (date == null) {
            return
        }
        const days = moment().diff(date, 'days')
        const left = moment(date).add(1, 'day').fromNow()

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
            let account = localStorage.getItem('user')
            let token = localStorage.getItem('access-token')
            let key = localStorage.getItem('api-key');
            setUser(JSON.parse(account))

            let found = await fetchDoctors()
            setDoctors(found)

            userDetails(JSON.parse(account).email, key, token).then(data => {
                setUser(data)
            }).catch(e => {
                console.log('Error: ', e)
            })

            try {
                checkSubscription(JSON.parse(account).subscription_end);
            } catch (e) { }

            // ['Family', 'Premium'].includes(JSON.parse(account).subscription) ?
            //     setMenu(secondary) :
            // ['Basic'].includes(JSON.parse(account).subscription) ? setMenu(basic) : setMenu(main)

        })()

    }, [])
    return (
        <>
            <div class="box" id={doctor.email}>
                {doctor.availability === 'Online' ? <div className="active-state">Active</div> : ''}

                <img src={doctor.avatar} alt="" />
                <h3 className='doc-name-consult'>{doctor.firstname} {doctor.lastname}</h3>
                <span className="title">{doctor.department}</span>
                <div class="share">
                    <div class="action-container"
                        onClick={handleOpenProfile}
                    >
                        <FaInfo className="doctor-icon" />
                        <span> About</span>
                    </div>

                    <Link to="/chat" class="action-container">
                        <BsFillChatSquareTextFill className="doctor-icon" />
                        <span>Chat</span>
                    </Link>

                    <div onClick={handleOpen} class="action-container">
                        <FaRegCalendarAlt className="doctor-icon" />
                        <span>Book</span>
                    </div>

                    <div class="action-container">
                        <FaHeart className="doctor-icon" />
                        <span>Favourite</span>
                    </div>
                    <div onClick={() => setCall(!call)} class="action-container">
                        <FaPhoneAlt className="doctor-icon" />
                        <span>Call</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocCard
