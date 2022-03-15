import React, { useState } from 'react'
import './signup.css'
import signupimage from '../../images/signup.svg'
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Api/Auth'
import Navbar from '../../Component/Navbar/Navbar';
import { useDispatch } from 'react-redux'
import { LOGIN } from '../../features/user'
import { Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import swal from 'sweetalert';
const classes = {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: 20,
      textAlign: "center",
      backgroundColor: "black",
      color: "white"
    }
  };
function Signup() {
    const [firstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState();
    const [gender, setGender] = React.useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!firstName) {
            return setError('Please provide a valid first name.')
        }
        if (!LastName) {
            return setError('Please provide a valid Last Name.')
        }
        if (!phone) {
            return setError('Please provide a valid Phone number.')
        }
        if (!email) {
            return setError('Please provide a valid email address.')
        }
        if (!password) {
            return setError('Please provide a valid Password.')
        }
        if (!password) {
            return setError('Please select gender.')
        }
        setLoading(true)
        try {
            const response = await register({
                firstname: firstName,
                lastname: LastName,
                email: email,
                password: password,
                phone: phone,
                age: age,
                avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png",
                address: address,
                sex: gender
            });
            if (response.success) {
                navigate("/userDashboard")
                let currentUser = localStorage.getItem('user');
                dispatch(LOGIN(JSON.parse(currentUser)))
                setLoading(false)

            } else {
                setError(response.message)
                swal("Network Error!", "You dont have internet connection!", "error");
                alert('error inserting data no ')
                setLoading(false)
            }
        } catch (e) {
            setError(e.message)
            setLoading(false)
        }

    }
    return (
        <>
            <Navbar />
            <div className="wrapper">
                <div className="inner">
                    <div className="image-holder">
                        <img src={signupimage} alt="" className="sign-up-img" />
                    </div>
                    <form onSubmit={handleSignup} className='sign-up-form'>

                        <h3>Register</h3>
                        <p style={{ color: 'red', marginTop: 5, textAlign: 'center' }}>{error}</p>
                                <div class="first-input-container">
                                <TextField style={{ width: '45%' }} className='first-input-sign-up' value={firstName} onChange={(e) => setFirstName(e.target.value)} id="outlined-basic" label="First Name" variant="outlined" />
                           
                                <TextField className='first-input-sign-up' style={{ width: '45%' }} value={LastName} onChange={(e) => setLastName(e.target.value)} id="outlined-basic" label="Last Name" variant="outlined" />
                                </div>
                              

                        <div className="form-wrapper">
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Email" variant="outlined" />
                        </div>

                        <div className="form-wrapper">
                            <TextField value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Phone Number" variant="outlined" />
                        </div>



                        <div className="form-wrapper">
                            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="password" variant="outlined" />

                        </div>

                        <div className="form-group">
                            <div className='age-input' style={{ width: '45%' }}>
                                <TextField value={age} onChange={(e) => setAge(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Age" variant="outlined" />
                            </div>

                            <div className='age-input' style={{ width: '45%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        label="Gender"
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Custom">Custom</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <TextField value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%' }} id="outlined-multiline-flexible" label="Physical Address" multiline maxRows={4} />
                        </div>
                        <button disabled={loading} className="sign-up-button">{loading ? 'Please wait...' : 'Create Account'}</button>
                        <p className="terms">By Sign In you agree with our <Link to="/privacy" style={{ color: '#1BCC88', cursor: 'pointer' }}>Terms</Link></p>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Signup
