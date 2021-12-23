import React, { useState,useContext,useEffect } from 'react'
import Radio from '../../Component/Radio/Radio'
import './SignIn.css'
import signIn from '../../images/book-img.svg'
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {login,sociallogin} from '../../Api/Auth'
import {AuthContext} from '../../Context/AuthContext'
import Navbar from '../../Component/Navbar/Navbar'

function SignIn() {
    let navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const {user,dispatch} = useContext(AuthContext)

    console.log(user)
    const loginUser = async () => {
        if(!email){
        return setError('Please provide a valid email address.')
        }

        if(!password){
         return  setError('Password field cant be empty.')
        }
        setLoading(true);

        try{
            const response = await login(email, password)

            if(response){
                setLoading(false)
                console.log(response)
                // dispatch({type:"LOGIN_SUCCESS", payload:response})
                navigate("/userDashboard")
            }else{
                setError(response.message)
                setLoading(false)
            }
        }catch(e){
            setError(e.message)
            setLoading(false)
        }

    }

    // GOOGLE LOGIN
    return (
        <>
        <Navbar />
            <div className="container">
                <img src={signIn} alt="login" style={{ width: '500px', height: 400}} className="SignIn-Img" />

                <div className="loginContainer">
                    <div className="inputContainer">
                        <img src={logo} alt="logo" className="logo-img" />
                        <p style={{color:'red',marginTop:5, textAlign:'center', fontSize:20, paddingBottom:10}}>{error ? error : ''}</p>
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address" className="input-field" />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" className="input-field" />

                            {/* <Radio/> */}

                        <div className="passForgotContainer">
                            <p>forgot Password</p>
                            <button className="sigInBtn" onClick={loginUser}>{ loading ? 'Please wait...' : 'Login'}</button>
                        </div>
                        <p className="or">Or</p>
                    </div>
                    <div className="socialContainer">
                        <button className="facebook"><FaFacebookF className="icon" />Sign in with Facebook</button>
                        <button className="google"><FcGoogle className="icon" />Sign in with Google</button>
                    </div>
                    <p className="dont-have-account">Don't have account? <Link to="/SignUp" className="sign-up">Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}
export default SignIn
