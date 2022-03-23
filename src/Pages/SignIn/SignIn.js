import React, { useState, useContext, useEffect } from 'react'
import Radio from '../../Component/Radio/Radio'
import './SignIn.css'
import signIn from '../../images/book-img.svg'
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FcGoogle } from "react-icons/fc";
import TextField from '@mui/material/TextField';
import { login, sociallogin, resetpassword, checkotp, changePasswordd } from '../../Api/Auth'
import Navbar from '../../Component/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { LOGIN } from '../../features/user'
// import { GoogleLogin } from 'react-google-login'
import swal from 'sweetalert';
import FacebookLogin from 'react-facebook-login';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function SignIn() {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingf, setLoadingf] = useState(false)
    const [value, setValue] = useState();
    const [open, setOpen] = React.useState(false);
    // RESERT PASSWORD STATE
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [show_forget_p, setshow_forget_p] = useState(false)
    const [forget_p_text, setforget_p_text] = useState('')
    const [disablebtn,setDisableBtn]= useState(true)
    const [forget_p_text_holder, setforget_p_text_holder] = useState('Resent Password')
    const [forget_p_error, setforget_p_error] = useState(false)
    const [reset_code, setreset_code] = useState('')
    const [reset_passworda, setreset_passworda] = useState('')
    const [forgotEmail, setForgotEmail] = useState()
    const [hide,setHide]= useState(true)
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setValue(event.target.value);
        setDisableBtn(false)
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
                let currentUser = localStorage.getItem('user');
                dispatch(LOGIN(JSON.parse(currentUser)))
                navigate("/userDashboard")
            }
            // else if (value === "Doctor") {
            //     navigate("/doctorDashboard")
            // }
            else {
                setError(response.message, 'fffff')
                setLoading(false)
            }
        } catch (e) {
            setError(e.message, 'rrrrrr')
            setLoading(false)
        }

    }

    const loginDoctor = async () => {
        // navigate("/doctorDashboard")
        swal ( "Oops" ,  "You dont have accesss to this page" ,  "error" )
    }

    // GOOGLE LOGIN Authentication
    // const loginSuccess = async (res) => {
    //     const response = await sociallogin(res.profileObj.email)
    //     console.log(response)
    //     if (response.success) {
          
    //         let currentUser = localStorage.getItem('user');
    //         dispatch(LOGIN(JSON.parse(currentUser)))
    //         navigate("/userDashboard")

    //     } else {
    //         alert('error trying to navigate')
    //     }
    // }
    // const loginFaliure = (res) => {
    //     console.log('login failed', res)
    // }


    // FACEBOOK LOGIN

    const componentClicked = (data) => {
        console.warn(data)
    }
    const facebook = async (res) => {
        const response = await sociallogin(res.email)
        if (response.success) {
            let currentUser = localStorage.getItem('user');
            dispatch(LOGIN(JSON.parse(currentUser)))
            navigate("/userDashboard")
            console.log(res)
        } else {
            alert('error trying to navigate')
        }
    }

    // RESERT PASSWORD
    const reset_password_confirm = async () => {
        setLoading(true)
        try {
            // send otp to server to get code
            // use code to reset connection
            const response = await checkotp(reset_code);
            if (response.success) {
                var token = response.token;
                const respon = await changePasswordd({ password: reset_passworda }, token);

                if (respon.success) {
                    setforget_p_error(false)
                    setforget_p_text_holder('Password Changed');
                    alert('Password Changed');
                } else {
                    setforget_p_error(false)
                    setforget_p_text_holder('Password Error')
                }
            } else {
                setforget_p_error(false)
                setforget_p_text_holder('Code MisMatch')
            }
        } catch (e) {
            setforget_p_error(false)
            setforget_p_text_holder('Network error')
        }

        setLoading(false)
    }

    // RESERT PASSWORD FIRST CLICK
    const reset_password = async () => {
        setEmailError(false)
        setPasswordError(false)

        if (forgotEmail < 6) {
            setforget_p_error(true)
            setshow_forget_p(false)
            // setError('Please provide a valid email address.')
            return
        }

        setLoadingf(true)

        try {
            const response = await resetpassword(forgotEmail)
            if (response.success) {
                setHide(false)
                console.log(response)
            } else {
                setforget_p_error(false)
            }
        } catch (e) {
            setError(e.message)
        }

        setLoadingf(false)
    }

    return (
        <div className='signin-container'>
            <Navbar />
            <div className="container">
                <img src={signIn} alt="login" style={{ width: '500px', height: 400 }} className="SignIn-Img" />

                <div className="loginContainer">
                    <div className="inputContainer">
                        
                        <p style={{ color: 'red', marginTop: 5, textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>{error ? error : ''}</p>
                        
                        <TextField
                            value={email}
                            type="email"
                            className='text-field'
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth id="outlined-basic" label="Email Address" variant="outlined" />
                            
                        <TextField
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth id="outlined-basic" label="Password" variant="outlined" />

                        <Radio value={value} handleChange={handleChange} />

                        <div className="passForgotContainer">
                            <p onClick={handleOpen}>forgot Password</p>
                            {/* <button  className="sigInBtn" onClick={loginUser}>{loading ? 'Please wait...' : 'Login'}</button> */}

                            <Button disabled={disablebtn} onClick={ value==="Doctor"?loginDoctor:loginUser}  className={!disablebtn ? 'sigInBtn':null} variant="contained">{loading ? 'Please wait...' : 'Login'}</Button>
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
                        {/* <GoogleLogin
                            clientId="975805596889-071l5f7rtmfbeqjov22r8i03m6rh5q2j.apps.googleusercontent.com"
                            onSuccess={loginSuccess}
                            onFaliure={loginFaliure}
                            cookiePolicy={"single_host_origin"}
                        /> */}
                    </div>
                    <p className="dont-have-account">Don't have account? <Link to="/SignUp" className="sign-up">Sign Up</Link></p>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                fullWidth
            >
                <Box sx={style}>
                   {hide?<div>
                            <p>
                                we would send a reset link to your email provided
                            </p>
                            <TextField
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                                fullWidth id="outlined-basic" label="Email" variant="outlined" />
                            <br /><br />
                            <Button disabled={loadingf} onClick={() => reset_password()} className='change-btn-password' variant="contained">Request Link</Button>
                        </div>:<div>
                        <p>
                            We have sent a reset code to your provided email address
                        </p><br />
                        <TextField
                            value={forget_p_text}

                            onChange={(e) => setforget_p_text(e.target.value)}

                            fullWidth id="outlined-basic" label="Enter the reset code" variant="outlined" />
                        <br /><br /><br />
                        <TextField fullWidth id="outlined-basic" label="Enter new Password" variant="outlined" />
                        <br /><br />
                        <Button className='change-btn-password' variant="contained">Change Password</Button>
                    </div>}
                </Box>
            </Modal>
        </div>
    )
}
export default SignIn
