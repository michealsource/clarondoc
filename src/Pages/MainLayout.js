import React,{useState,useEffect} from 'react'
import '../Pages/Dash/Dash.css'
import user1 from '../images/user.png'
import { FaCalendarPlus, FaShareSquare } from "react-icons/fa";
import { FaFlask } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAmbulance } from "react-icons/fa";
import { FaHouzz } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa";
import { FaStaylinked } from "react-icons/fa";
import { FaTh } from "react-icons/fa";
import { FaAlignJustify, FaHeart, FaShareAlt, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import '../Pages/Dashboard/Dashboard.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT } from '../features/user'
import { fetchNotifications } from '../Api/notifications';
import { NOTIFICATIONS, } from '../features/user'

export default function MainLayout({ children }) {
  const userData = useSelector((state) => state.user.value)
  const [user, SetUser] = useState()
  const [notifications, setNotifications] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      let account = localStorage.getItem('user')
      SetUser(JSON.parse(account))
      let response = await fetchNotifications();
      // console.log(response)
      dispatch(NOTIFICATIONS(response))
      setNotifications(response)
    })()
  }, [])
  const [open, setOpen] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const openAction = Boolean(anchorEl);
  const navigate = useNavigate()

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setOpen(!open)
  };
  const logOut = () => {
    localStorage.removeItem("email")
    localStorage.removeItem("access-token")
    localStorage.removeItem("api-key")
    localStorage.removeItem("login-expiry")
    localStorage.removeItem("user")
    dispatch(LOGOUT())
    navigate("/")
  }
  return (
      <>
        <input type="checkbox" id="nav-toggle"/>
        <div class="sidebar">
        <div className="profile-container">
                <img src={userData.avatar !== "undefined" ? userData.avatar : user1} alt="" className="user" />
        </div>
        <div className='responsive-title'>
        <p className="name">{userData ? userData.firstname : ''} {userData ? userData.lastname : null}</p>
        <p className="title">Patient</p>  
        </div>      
        <div class="sidebar-menu">
            <ul>

                <li className='service-d'>
                    <Link to="/userDashboard"><span class="las la-stethoscope"></span>
                    <span>Dashboard</span></Link>
                </li>
                <li className='service-d'>
                    <Link to="/consultation"><span class="las la-user"></span>
                    <span>Consultation</span></Link>
                </li>
                <li className='service-d'>
                    <Link to="/laboratory"><span class="las la-user-injured"></span>
                    <span>Laboratory</span></Link>
                </li>
                <li className='service-d'>
                    <Link to="/AppointmentHistory"><span class="las la-history"></span>
                    <span>Appointment History</span></Link>
                </li>
                <li className='service-d'>
                    <Link to="/ambulance"><span class="las la-search"></span>
                    <span>Ambulance</span></Link>
                </li>
                <li className='service-d'>
                    <Link to="/homecare"><span class="las la-book-medical"></span>
                    <span>Home Care</span></Link>
                </li>

                <li className='service-d'>
                    <Link to="/drugs"><span class="las la-book-medical"></span>
                    <span>Pharmacy Buy' Drugs</span></Link>
                </li>

                <li className='service-d'>
                    <Link to="/subscribe"><span class="las la-book-medical"></span>
                    <span>Subscribe Now!</span></Link>
                </li>

                <li className='service-d'>
                    <a href="whatsapp://send?text=Hey! Join me on this awesome health care app and cut on trips to the hospital. http://onelink.to/clarondoc" target="_blank"><span class="las la-book-medical"></span>
                    <span>Share</span></a>
                </li>                
            </ul>
        </div>
    </div>

    <div class="main-content">
        <header className='main-content-toggle'>
            <div className='nav-okay'>
                <label for="nav-toggle">
                    <span class="las la-bars"></span>
                </label> 
            </div>

            <Link to="/notification" className="notification">
                <Badge badgeContent={notifications.length} color="success">
                  <NotificationsIcon color="action" />
                </Badge>
              </Link>

              <Link to="/blog" className="blog">
                {/* <FaHeart className="hrt"/>  */}
                <h5 className="tips">Health Tips</h5>
              </Link>

              <button onClick={() => userData.subscription == "Premium" || userData.subscription == "Family Plan" ? navigate("/call", { state: { mediaType: "audio" } }) : navigate("/Subscribe")} className="blog">
                <FaPhoneAlt className="hrt" />
                <h5 className='urgent'>Urgent Care</h5>
              </button>

            <div class="user-wrapper">
                <img src={userData.avatar !== "undefined" ? userData.avatar : user1}  width="40px" height="40px" alt="user"/>
                <div>
                    <h4 onClick={handleClick}>Profile <FaCaretDown /></h4>
                    {
                  open ? <div className='hover-menu'>
                    <Link to="/profile">Profile</Link>
                    <Link to="/AboutClaron">About Us</Link>
                    <Link to="/ClaronTerms">Terms and Condition</Link>
                    <span onClick={logOut}>Logout</span>
                    {/* <h3>Home</h3> */}
                  </div> : null
                }
                    {/* <small>Super Admin</small> */}
                </div>
            </div>
        </header>
        <main>
    {children}
    </main>
    </div>

    

     </>
  )
}
