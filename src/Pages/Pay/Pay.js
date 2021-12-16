
import React, { useState } from 'react'
import './Pay.css'
import { FaMobileAlt, FaCreditCard, FaPlusSquare } from "react-icons/fa";
import { InputLabel, Box, Button, Grid, FormControl, TextField, Select, MenuItem } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import 'date-fns';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        width: '100%',

        marginBottom: '30px !important'
    },
    payBtn: {
        backgroundColor: '#61cd88 !important',
        color: '#fff !important',
        marginTop: '20px !important',
        fontSize: '18px !important',
        padding: '10px',
        borderRadius: '5px'
    },
    mobile: {
        fontSize: '20px !important',
    },
    card: {
        fontSize: '20px !important',
        fontWeight: 'bold !important'
    },
    payBtnInsurance: {
        backgroundColor: '#61cd88 !important',
        color: '#fff !important',
        marginTop: '10px !important',
        fontSize: '18px !important',
        padding: '10px',
        borderRadius: '5px',
        marginLeft: '20px',
        marginBottom: '20px'
    }
}));

function Pay() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (newValue) => {
      setValue(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

   

    return (
        <div class="order-container">
            <div class="payment-review-container">
                <div class="title-of-pay">
                    <div class="first-title-pay">
                        <p>Laboratory request</p>
                        <p>Service fee</p>
                    </div>

                    <div class="discount-price">
                        <p>Discount</p>
                        <p>Total</p>
                    </div>
                </div>

                <div class="price-of-pay">
                    <div class="first-price">
                        <p style={{ color: '#61cd88' }}>GHS 160.0</p>
                        <p style={{ color: '#61cd88' }}>GHS5.0</p>
                    </div>

                    <div class="second-price">
                        <p style={{ color: '#cb2938' }}>GHS 24.0</p>
                        <p style={{ fontWeight: 'bold' }}>GHS 141.O</p>
                    </div>

                </div>
            </div>

            <h2 className="support-header">Supported payment options</h2>
            <div class="supported-payment-options-container">
                <div style={{ marginTop: 20 }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Box display="flex" justifyContent="space-between">
                                <FaMobileAlt className="phone" />

                                <Typography className={classes.mobile}>MOBILE MONEY</Typography>
                            </Box>

                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="mobile-money-heading">You will be charged GHS <span className="mobile-charge">GHS 141.0</span> from your mobile money</p>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age" >
                                            <MenuItem value={10}>MTN</MenuItem>
                                            <MenuItem value={20}>TIGO</MenuItem>
                                            <MenuItem value={30}>VODAFONE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Enter Mobile Money Number"
                                        variant="outlined"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button className={classes.payBtn}>Pay With Momo</Button>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Box display="flex" justifyContent="space-between">
                                <FaCreditCard className="phone" />
                                <Typography className={classes.card} sx={{ color: 'text.secondary' }}>
                                    VISA/MasterCard
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Card Number"
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
                                        label="Card Month MM"
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
                                    <TextField
                                        id="outlined-basic"
                                        label="Card Expiry YY"
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
                                        label="CVV"
                                        variant="outlined"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button className={classes.payBtn}>Pay GHS 85.75</Button>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Box display="flex" justifyContent="space-between">
                                <FaCreditCard className="phone" />
                                <Typography className={classes.card} sx={{ color: 'text.secondary' }}>
                                    INSURANCE
                                </Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Full Name"
                                        variant="outlined"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="standard" sx={{ m: 1, }}>
                                        <InputLabel id="demo-simple-select-standard-label" >Select Provider *</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="provider"
                                        >
                                            <MenuItem value={1}>ACACIA HEALTH INSURANCE LTD.</MenuItem>
                                            <MenuItem value={2}>ACE MEDICAL INSURANCE</MenuItem>
                                            <MenuItem value={3}>ATNA HEALTH INSURANCE</MenuItem>
                                            <MenuItem value={4}>ALLIANZ WORLDWIDE CARE</MenuItem>
                                            <MenuItem value={5}>APEX HEALTH INSRANCE LIMITED</MenuItem>
                                            <MenuItem value={6}>BUPA</MenuItem>
                                            <MenuItem value={7}>CIGNA</MenuItem>
                                            <MenuItem value={8}>COSMOPOLITAN HEALTH</MenuItem>
                                            <MenuItem value={9}>EQUITY INSURANCE</MenuItem>
                                            <MenuItem value={10}>FIRST INSURANCE</MenuItem>
                                            <MenuItem value={11}>GLICO HEALTH INSURANCE</MenuItem>
                                            <MenuItem value={12}>GN HEALTH SCHEME</MenuItem>
                                            <MenuItem value={13}>HOLLARD INSURANCE</MenuItem>
                                            <MenuItem value={14}>KASIER GLOBAL HEALTH LIMITED</MenuItem>
                                            <MenuItem value={15}>METROPOLITAN HEALTH INSURANCE</MenuItem>
                                            <MenuItem value={16}>MILLENIUM INSURANCE</MenuItem>
                                            <MenuItem value={17}>NATIONWIDE MUTUAL HEALTH CARE</MenuItem>
                                            <MenuItem value={18}>OVAL HEALTH INSURANCE</MenuItem>
                                            <MenuItem value={19}>PREMIER MUTUAL INSURANCE</MenuItem>
                                            <MenuItem value={20}>UNIVERSAL HEALTH INSRANCE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Policy No*"
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
                                        label="Policy Type"
                                        variant="outlined"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Expiration Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            </Box>


                        </AccordionDetails>
                        <Button className={classes.payBtnInsurance}>Pay Insurance</Button>
                    </Accordion>



                </div>
            </div>
        </div>
    )
}

export default Pay
