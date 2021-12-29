import React, { useState, useContext, useEffect } from 'react'
import Radio from '../../Component/Radio/Radio'
import './SignIn.css'
import signIn from '../../images/book-img.svg'
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { login, sociallogin } from '../../Api/Auth'
import { AuthContext } from '../../Context/AuthContext'
import Navbar from '../../Component/Navbar/Navbar'

import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login';

function SignIn() {
    let navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { user, dispatch } = useContext(AuthContext)
    const [value, setValue] = useState('Patient');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const loginUser = async () => {
        if (!email) {
            return setError('Please provide a valid email address.')
        }
        if (!password) {
            return setError('Password field cant be empty.')
        }
        setLoading(true);
        try {
            const response = await login(email, password)
            if (response.success && value === "Patient") {
                setLoading(false)
                console.log(response)
                // dispatch({type:"LOGIN_SUCCESS", payload:response})
                navigate("/userDashboard")
            }
            else if (response.success && value === "Doctor") {
                navigate("/doctorDashboard")
            }
            else {
                setError(response.message)
                setLoading(false)
            }
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }

    }

    // GOOGLE LOGIN Authentication
    const loginSuccess = async (res) => {
        const response = await sociallogin(res.profileObj.email)
        if (response.success) {
            navigate("/userDashboard")
        } else {
            alert('error trying to navigate')
        }
    }
    const loginFaliure = (res) => {
        console.log('login failed', res)
    }


    // FACEBOOK LOGIN

    const componentClicked =(data)=>{
        console.warn(data)
    }
    const facebook = async (res) => {
        const response = await sociallogin(res.email)
        if (response.success) {
            navigate("/userDashboard")
            console.log(res)
        } else {
            alert('error trying to navigate')
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <img src={signIn} alt="login" style={{ width: '500px', height: 400 }} className="SignIn-Img" />

                <div className="loginContainer">
                    <div className="inputContainer">
                        <img src={logo} alt="logo" className="logo-img" />
                        <p style={{ color: 'red', marginTop: 5, textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>{error ? error : ''}</p>
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address" className="input-field" />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" className="input-field" />

                        <Radio value={value} handleChange={handleChange} />

                        <div className="passForgotContainer">
                            <p>forgot Password</p>
                            <button className="sigInBtn" onClick={loginUser}>{loading ? 'Please wait...' : 'Login'}</button>
                        </div>
                        <p className="or">Or</p>
                    </div>
                    <div className="socialContainer">



                        <button className="facebook"><FaFacebookF className="icon" />Sign in with Facebook</button>
                        {/* <FacebookLogin
                            appId="2426070504190344"
                            
                            onClick={componentClicked}
                            callback={facebook} /> */}
                        {/* <button className="google"><FcGoogle className="icon" />Sign in with Google</button> */}
                        <GoogleLogin
                            clientId="975805596889-071l5f7rtmfbeqjov22r8i03m6rh5q2j.apps.googleusercontent.com"
                            onSuccess={loginSuccess}
                            onFaliure={loginFaliure}
                            cookiePolicy={"single_host_origin"}

                        />
                    </div>
                    <p className="dont-have-account">Don't have account? <Link to="/SignUp" className="sign-up">Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}
export default SignIn
