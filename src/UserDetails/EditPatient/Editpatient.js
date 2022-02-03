import React,{useState,useEffect} from 'react'
import './EditPatient.css'
import { TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core'; //importing material ui component
import { makeStyles } from '@mui/styles';
import image from '../../images/user-profile.jpg'
import {useLocation} from 'react-router-dom';
import MainLayout from '../../Pages/MainLayout';
import { update } from '../../Api/Auth';
import swal from 'sweetalert';
import firebase from 'firebase';
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

  console.log(avataru)
  
  const ImageUpload = async(e)=>{
    if(e.target.files[0]){
        setAvatar(e.target.files[0])
    }
    let file = avataru;
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let uploadTask = storageRef.child('new-photo/' + file.name).put(file);
    let url = await firebase.storage().ref(`new-photo`).child(file.name).getDownloadURL()
  }
    const saveAccount = async ()=>{
        const data ={
            firstname:fname,
             lastname:lname,
             age:age,
             email:emailu, 
             avatar:avataru.name,
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
            <h2>Kndly Update Your Profile {firstname}</h2>
            <img  src={avataru?avataru:image} alt="Profile" className="pro-img"/>
            <div class="parent-div">
                <button class="btn-upload">Change Photo</button>
                <input onChange={ImageUpload} type="file" name="upfile" />
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
