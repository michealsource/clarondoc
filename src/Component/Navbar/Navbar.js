import logo from '../../images/logo.png'
import './Navbar.css'
import { Routes, Route, Link } from "react-router-dom"
import SignUp from '../../Pages/signup/Signup'
import SigIn from '../../Pages/SignIn/SignIn'
import LandingPage from '../../Pages/landingPage.js/LandingPage'
import About from '../../Pages/Settings/About'
import TermsandCondition from '../../Pages/Settings/TermsandCondition'

function Navbar({setLogin,setLoginP,login}) {
    return (
        <>
        <header className="Navbar-header">
            <a href="/" className="logo"> <img src={logo} alt={logo} /></a>
            <nav className="login-signup-container">
                <Link to="/SignIn">Sign In</Link>
                <Link to="/SignUp">Sign Up</Link>
                <Link to="/about">About Us</Link>
                <Link to="/privacy">Terms and Privacy</Link>
            </nav>
        </header>
        <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="SignIn" element={<SigIn login={login} setLogin={setLogin} setLoginP={setLoginP} />}></Route>
        <Route exact path="SignUp" element={<SignUp />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/privacy" element={<TermsandCondition />}></Route>
    </Routes>
    </>
    )
}

export default Navbar
