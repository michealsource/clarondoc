
import React, { useState } from 'react'
import './OrderReview.css'
import { FaMobileAlt, FaCreditCard} from "react-icons/fa";
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
import { useLocation } from "react-router-dom";
import { initPayment } from '../../Api/paystack';

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

function OrderReview({name}) {
    const location = useLocation();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [user, setUser] = useState()
    // const [card, setCard] = useState({number: '',month: '',year: '',cvv: ''})

    const [number, setNumber] = useState('')
    const [cvv, setCvv] = useState('')
    const [pin, setPin] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const [method, setMethod] = useState('Mobile Money')
    const [price, setPrice] = useState()
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [button, setButton] = useState('Pay Now')
    const [reference, setReference] = useState()
    const [status, setStatus] = useState()
    const [phone_error, setPhoneError] = useState()
    const [card_error, setCardError] = useState()
    const mtns = ['024', '054', '055', '059']
    const tigos = ['027', '057', '026', '056']
    const vods = ['020', '050']
   

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (newValue) => {
      setValue(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // MAKE PAYMENT Function
    const payment = ()=>{
        
            if(number.length < 16){
                setCardError('Please enter a valid card number')
                return
            }
    
            if(month.length < 2){
                setCardError('Please enter a valid expiry month')
                return
            }
    
            if(month*1 > 12){
                setCardError('Please enter a valid expiry month')
                return
            }
    
            if(year.length < 2){
                setCardError('Please enter a valid expiry year')
                return
            }
    
            if(year*1 < 21){
                setCardError('Please enter a valid expiry year')
                return
            }
    
            if(cvv.length < 3){
                setCardError('Please enter a valid card cvv')
                return
            }
            
    }

    // HANDLE MOMO PAYMENT

    const momopayment = async ()=>{
        if(phone.length < 10){
            setPhoneError('Please enter a valid number')
            return
        }
        let network;
        mtns.includes(phone.substr(0, 3)) ? network = 'mtn'
        : tigos.includes(phone.substr(0, 3)) ? network = 'tgo'
        : vods.includes(phone.substr(0, 3)) ? network = 'vod'
        : network = null

        if(network == null){
            setPhoneError('Please enter a vald Ghanaian number')
            return
        }
        try{
            setLoading(true)
            setButton('Initializing Transaction...')
            let init = await initPayment(location.state.totalCost +5,phone,network)

            if(init.status){

              if(init.data.status === 'send_otp'){
                  setLoading(false)
                  setButton('Submit OTP')
              }else if(init.data.status === 'pay_offline'){
                  setLoading(false)
                  setButton('Awaiting for payment confirmation...')
              }else if(init.data.status === 'success'){

                alert('payment successful')
                setLoading(false)
                setButton('Done')
                
              }else{
                  setLoading(false)
                  setButton(init.data.gateway_response)
                  alert('payment not successful')
              }

            }else{
              setLoading(false)
              setButton('Pay Now')
              setPhoneError(init.data.message)
              return
            }

        }catch(e){
          console.log(e.response.data)
            setLoading(false)
            setButton('Pay Now')
            setPhoneError(e.message)
            return
        }
    }
    

    return (
        <div class="order-container">
            <div class="payment-review-container">
                <div class="title-of-pay">
                    <div class="first-title-pay">
                        <p>{location.state.type}</p>
                        <p>Service fee</p>
                    </div>

                    <div class="discount-price">
                        <p>Discount</p>
                        <p>Net Total</p>
                    </div>
                </div>

                <div class="price-of-pay">
                    <div class="first-price">
                        <p style={{ color: '#61cd88' }}>GHS {location.state.totalCost} </p>
                        <p style={{ color: '#61cd88' }}>{location.state.serviceCharge ? `GHS ${location.state.serviceCharge}` : "GHS 0"}</p>
                    </div>

                    <div class="second-price">
                        <p style={{ color: '#cb2938' }}>{location.state.discount ? `GHS ${location.state.discount}` : "GHS 0"}</p>
                        <p style={{ fontWeight: 'bold' }}> {location.state.serviceCharge ? `GHS ${location.state.totalCost + location.state.serviceCharge}` : `GHS ${location.state.totalCost}` }</p>
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
                            <p className="mobile-money-heading">You will be charged GHS <span className="mobile-charge">{location.state.serviceCharge ? `GHS ${location.state.serviceCharge + location.state.totalCost}` : `GHS ${location.state.totalCost}`}</span> from your mobile money</p>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age" >
                                            <MenuItem value={10}>MTN</MenuItem>
                                            <MenuItem value={20}>TIGO</MenuItem>
                                            <MenuItem value={30}>VODAFONE</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}

                                <Grid item xs={6}>
                                    <p className='phone-error'>{phone_error?phone_error:''}</p>
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
                            <Button onClick={momopayment} className={classes.payBtn}>Pay With Momo</Button>
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
                        <p className='card-error'>{card_error?card_error:''}</p>
                            <Grid container spacing={2}>
                           
                                <Grid item xs={6}>
                                
                                    <TextField
                                        value={number}
                                        onChange={e => {setNumber(e.target.value) }}
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
                                        value={month}
                                        onChange={e => {setMonth(e.target.value) }}
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
                                        value={year}
                                        onChange={e => {setYear(e.target.value) }}
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
                                        value={cvv}
                                        onChange={e => {setCvv(e.target.value) }}
                                        variant="outlined"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        value={pin}
                                        onChange={e => {setPin(e.target.value) }}
                                        id="outlined-basic"
                                        label="PIN"
                                        variant="outlined"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button onClick={payment} className={classes.payBtn}>Pay {location.state.serviceCharge ? `GHS ${location.state.serviceCharge + location.state.totalCost}` : `GHS ${location.state.totalCost}`}</Button>
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

export default OrderReview
