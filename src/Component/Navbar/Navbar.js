import logo from '../../images/logo.png'
import './Navbar.css'
import { Routes, Route, Link } from "react-router-dom"
import SignUp from '../../Pages/signup/Signup'
import SigIn from '../../Pages/SignIn/SignIn'
import LandingPage from '../../Pages/landingPage.js/LandingPage'
import About from '../../Pages/Settings/About'
import TermsandCondition from '../../Pages/Settings/TermsandCondition'
import { FaAlignJustify } from "react-icons/fa";

function Navbar() {
    return (
        <>
        <header className="Navbar-header">
            <a href="/" className="logo"> <img src={logo} alt={logo} /></a>
            
                       
            <label for="toggle"><FaAlignJustify className="bars-menu"/></label>
            <input type="checkbox" id='toggle' className='bar'/>
            
            <nav className="login-signup-container">
                <Link to="/SignIn">Sign In</Link>
                <Link to="/SignUp">Sign Up</Link>
                <Link to="/about">About Us</Link>
                <Link to="/privacy">Terms and Privacy</Link>
            </nav>    
        </header>
    </>
    )
}

export default Navbar
