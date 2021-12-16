import React from 'react'
import './EditPatient.css'
import { TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core'; //importing material ui component
import { makeStyles } from '@mui/styles';
import image from '../../images/user-profile.jpg'

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
    return (
        <div className="edit-user-contaner">
            <h2>Kndly Update Your Profile</h2>
            <img src={image} alt="" className="pro-img"/>
            <div class="parent-div">
                <button class="btn-upload">Choose file</button>
                <input type="file" name="upfile" />
            </div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        label="Vncent"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        label="Chibuke"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid item xs={6}>
                        <FormControl component="fieldset" className={classes.gender}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        label="Chibuke@gmail.com"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        id="outlined-basic"
                        label="28"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="outlined-basic"
                        label="Abuja"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>

                <Grid item xs={6}>

                    <TextField
                        id="outlined-basic"
                        label="070348765427"
                        variant="outlined"
                        className={classes.textField}
                        InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                        }}
                    />
                </Grid>
            </Grid>
            <Button className={classes.btn} variant="contained">Save Changes</Button>
        </div>
    )
}

export default Editpatient
