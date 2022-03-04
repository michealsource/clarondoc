import React,{useState,useEffect} from 'react'
import './EditPatient.css'
import { TextField, Grid, Button } from '@material-ui/core'; //importing material ui component
import { makeStyles } from '@mui/styles';
import image from '../../images/user-profile.jpg'
import {useLocation, useNavigate} from 'react-router-dom';
import MainLayout from '../../Pages/MainLayout';
import { update } from '../../Api/Auth';
import swal from 'sweetalert';
import firebase from '../../firebaseConfig';
import {UPDATE,UPDATEUSERINFO} from '../../features/user'
import { useDispatch,useSelector } from 'react-redux'
import {BiArrowBack} from "react-icons/bi"
// import profile from '../../images/user.png'
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    floatingLabelFocusStyle: {
        color: "#525252"
    },
    textField: {
        width: '100%',
        marginTop: '20px !important',
        marginBottom: '10px !important'
    },
    dateTime: {
        marginTop: '20px !important',
        // marginBottom:'20px !important'
    },
    gender: {
        marginTop: '25px !important'
    },
    btn: {
        backgroundColor: "#61cd88 !important",
        color: "#fff !important",
        marginTop: '20px !important'
    }
}));


function Editpatient() {
    const dispatch = useDispatch()
    const userData = useSelector((state)=>state.user.value)
    // const newUser = JSON.parse(userData)
    // console.log(JSON.parse(userData),'hhhhhhhhh')
   const navigate = useNavigate()
    const classes = useStyles();
    const location = useLocation();
    const {firstname,lastname,phone,email,avatar,sex,address,age}= location.state.user
    const [error, seterror] = useState()
    const [loading, setloading] = useState(false)
    const [response, setresponse] = useState({
    error: false,
    message: null
  })

  const[fname,setFname]= useState(firstname)
  const[lname,setlname]= useState(lastname)
  const[emailu,setEmal]= useState(email)
  const[avataru,setAvatar]= useState(avatar)
  const[phoneNumber,setPhoneNumber]= useState(phone)
  const [imgloading, setimgloading] = useState(false)
  
  const ImageUpload = async(e)=>{
    setimgloading(true)
    if(e.target.files[0]){
        let file =  e.target.files[0];
        firebase.storage().ref('new-photo/' + file.name).put(file);
        let url = await firebase.storage().ref(`new-photo`).child(file.name).getDownloadURL()
       
        const data ={
            firstname:fname,
             lastname:lname,
             age:age,
             email:emailu, 
             avatar:url,
             address:address, 
             gender:sex, 
             phoneNumber:phoneNumber
          }
         const response = await update(data)
         if(response.success){
            dispatch(UPDATE(url))
            setimgloading(false)
            swal({
                title: "Image Update",
                text: "successful",
                icon: "success",
                button: "Ok",
              });
         }
    }
    
  }
    const saveAccount = async ()=>{
        const data ={
            firstname:fname,
             lastname:lname,
             age:age,
             email:emailu, 
             avatar:avataru,
             address:address, 
             gender:sex, 
             phoneNumber:phoneNumber
          }

 
            try {
          setloading(true)
          let data2 = await update(data)
          setloading(false)

          if(data2.success){
            localStorage.setItem('user', JSON.stringify({...data}))
            dispatch(UPDATEUSERINFO(data))
            swal({
                title: "Update",
                text: "updated successfully",
                icon: "success",
                button: "Ok",
              });
          }else{
            alert(data.message)
            // setresponse({
            //   error: true,
            //   message: data.message
            // })
          }

            } catch (error) {
                console.log(error)
            }
      }
    return (
        <MainLayout>
        <div className="edit-user-contaner">
            <div className='gobackBtn' onClick={() => navigate(-1)}>
                <p><BiArrowBack /> Back</p>
            </div>
            <h2>Kndly Update Your Profile {userData.firstname}</h2>
            <img src={userData.avatar !== "undefined"? userData.avatar:image} alt="" className="pro-img" />
            <div class="parent-div">
                <button class="btn-upload" >{imgloading ? "Uploading" : "Change Photo"}</button>
                <input onChange={(e) => ImageUpload(e)} type="file" name="upfile" />
            </div>
            <Grid container spacing={2}>
                <p>{error?error:''}</p>
                <Grid item xs={6}>
                    <TextField
                        value={fname}
                        onChange={(e)=>setFname(e.target.value)}
                        // defaultValue={firstname}
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        value={lname}
                        id="outlined-basic"
                        onChange={(e)=>setlname(e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {/* <Grid item xs={6}>
                    <Grid item xs={6}>
                        <FormControl component="fieldset" className={classes.gender}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid> */}

                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        value={emailu}
                        onChange={(e)=>setEmal(e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {/* <Grid item xs={3}>
                    <TextField
                        id="outlined-basic"
                        label="28"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid> */}
                {/* <Grid item xs={3}>
                    <TextField
                        id="outlined-basic"
                        label="Abuja"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid> */}

                <Grid item xs={6}>

                    <TextField
                        id="outlined-basic"
                        value={phoneNumber}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>
            </Grid>
            <Button
             disabled={loading}
             onClick={saveAccount} 
             className={classes.btn}
            variant="contained"> { loading ? 'Saving...' : 'Save Changes' }</Button>
        </div>
        </MainLayout>
    )
}

export default Editpatient
