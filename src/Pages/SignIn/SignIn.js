import React,{useState,useEffect} from 'react'
import './SignIn.css'
import signIn from '../../images/book-img.svg'
import Navbar from '../../Component/Navbar/Navbar'
import logo from '../../images/logo.png'
import { Link ,useNavigate  } from 'react-router-dom';

import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
function SignIn({setLogin,setLoginP,login}) {
    const[email,setEmail]= useState()
    const[password,setPassword]= useState()
    const navigate = useNavigate ();
        const loginUser =()=>{
            if(email === "Patient@Gmail.Com" && password ==="patient"){
                setLoginP(true) 
                navigate('/userDashboard')
               
            }else if(email === "Doctor@Gmail.Com" && password ==="doctor"){
                setLogin(true)
                navigate('/doctorDashboard')
            }
            else{
                alert('invalid credentilas')
            }
        }
    return (
        <>
        <div className="container">
            <img src={signIn} alt="login" style={{ width: '500px', height: 400 }}  className="SignIn-Img"/>

            <div className="loginContainer">
                <div className="inputContainer">
                <img src={logo} alt="logo"  className="logo-img"/>

                    <input type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email Address" className="input-field"/>

                    <input
                     onChange={(e)=>setPassword(e.target.value)}
                    type="password" placeholder="Password" className="input-field"/>
                 
                    <div className="passForgotContainer">
                        <p>forgot Password</p>
                        <button className="sigInBtn" onClick={loginUser}>Sign In</button>
                    </div>
                    <p className="or">Or</p>
                </div>
                <div className="socialContainer">
                    <button className="facebook"><FaFacebookF className="icon"/>Sign in with Facebook</button>
                    <button className="google"><FcGoogle className="icon"/>Sign in with Google</button>
                </div>
                <p className="dont-have-account">Don't have account? <Link to="/SignUp" className="sign-up">Sign Up</Link></p>
            </div>

        </div>
        </>
    )
}

export default SignIn
