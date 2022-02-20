import React, { useState,useEffect} from 'react'
// import '../OrderReview.css'
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
import  MainLayout from "../MainLayout"
import 'date-fns';
import { useLocation, useNavigate } from "react-router-dom";
import { initPayment, verOtp, cardPayment,Upgrade_sub } from '../../Api/paystack';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import swal from 'sweetalert';
import loading from '../../images/loading.gif'


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

function SubscriptionSummary() {
    const {state} = useLocation();
    const { name, id,price } = state;
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
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [showotp_field, setshowotp_field] = useState(false)
    const [otperror, setotperror] = useState(false)
    const [tnx_ref, settnx_ref] = useState('')
    const [button, setButton] = useState('Subscribe Now')
    const [open, setOpen] = useState(false);
    
    const [phone_error, setPhoneError] = useState()
    const [card_error, setCardError] = useState()
    const [otp, setOTP] = useState("")
    const mtns = ['024', '054', '055', '059']
    const tigos = ['027', '057', '026', '056']
    const vods = ['020', '050']

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const navigate = useNavigate()

    const handleDateChange = (newValue) => {
      setValue(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleClose = () => setOpen(false);



    const momo = async ()=>{
            let network
            if(phone.length < 10){
              setPhoneError('Please enter a valid number')
              return
            }
      
            mtns.includes(phone.substr(0, 3)) ? network = 'mtn'
            : tigos.includes(phone.substr(0, 3)) ? network = 'tgo'
            : vods.includes(phone.substr(0, 3)) ? network = 'vod'
            : network = null
      
            if(network == null){
              setPhoneError('Please enter a Ghanaian number')
              return
            }
      
            try{
      
              setLoading(true)
              setButton('Initializing Transaction...')
              let init = await initPayment(price, phone, network)
              
              console.log(init)
      
              if(init.status){
      
                if(init.data.status == 'send_otp'){
                  setLoading(false)
                  setshowotp_field(true)
                  settnx_ref(init.data.reference)
                  setButton('Submit OTP ABOVE')
                }else if(init.data.status == 'pay_offline'){
                  setLoading(false)
                  setButton('Awaiting for payment confirmation...')
                }else if(init.data.status == 'success'){
                  try {
                    await Upgrade_sub(name, new Date().toString().substr(0, 16))
                    
                  } catch (error) {
                    console.log(error)
                  }
                  setLoading(false)
                  setButton('Done')
                  swal({
                    title: "subscription successful",
                    text: `Your ${name} subscription was successful`,
                    icon: "success",
                    button: "Ok",
                  });
                  navigate(-1)
               
                }else{
                  setLoading(false)
                  setButton(init.data.gateway_response)
                }
      
              }else{
                setLoading(false)
                setButton('Subscribe Now')
                setPhoneError(init.data.message)
                return
              }
      
            }catch(e){
              setLoading(false)
              setButton('Subscribe Now')
              setPhoneError(e.message)
              return
            }
          
    }

    const process_otp = async()=>{
        setLoading(true)
        setButton('Initializing Verification for Otp...')
    
        let init = await verOtp(tnx_ref, otp);
        // start
        if(init.status){
    
          if(init.data.status == 'send_otp'){
            setLoading(false)
            setshowotp_field(true)
            settnx_ref(init.data.reference)
            setButton('Submit OTP Above')
          }else if(init.data.status == 'pay_offline'){
            setLoading(false)
            setButton('Awaiting for payment confirmation...')
          }else if(init.data.status == 'success'){
            try {
              await Upgrade_sub(user.email, name, new Date().toString().substr(0, 16))
            } catch (error) {
              console.log(error)
            }
            setLoading(false)
            setButton('Done')
            swal({
                title: "Payment successful",
                text: `You have successfully paid GHS ${price} for ${name}.`,
                icon: "success",
                button: "Ok",
              });
              navigate(-1)
            // navigation.pop()
            // navigation.replace('PaymentResult', {purpose: price == 20 ? 'Basic Plan Subscription' : price == 20 ? 'Premium Plan Subscription' : 'Family Plan Subscription', amount: price, reference, date: init.data.transaction_date})
          }else{
            setLoading(false)
            setButton(init.data.gateway_response)
          }
    
        }else{
          setLoading(false)
          setButton('Subscribe Now')
          setPhoneError(init.data.message)
          return
        }
        // stop
      }

    useEffect(()=>{

        (async()=>{
          let account = localStorage.getItem('user')
          setUser(JSON.parse(account))
        })()
    
      }, [])
    return (
        <MainLayout>
        <div class="order-container">
            <div class="payment-review-container">
                <div class="title-of-pay">
                    <div class="first-title-pay">
                        <p>subscription</p>
                        <p>Subscription Start Date</p>
                    </div>

                    <div class="discount-price">
                        <p>Next Payment</p>
                        <p>Renewal Amount</p>
                        <p>Total</p>
                    </div>
                </div>

                <div class="price-of-pay">
                    <div class="first-price">
                    <p style={{ color: '#61cd88' }}>{name}</p>
                    <p style={{ color: '#61cd88' }}>{new Date().toString().substr(0, 16)} </p>
                    <p style={{ color: '#61cd88' }}>{new Date().toString().substr(0, 16)}</p>
                        
                    </div>

                    <div class="second-price">
                        <p style={{ color: '#cb2938' }}>GHS {price.toFixed(2)}</p>
                        <p style={{ color: '#cb2938' }}>GHS {price.toFixed(2)}</p>
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

                            <p className="mobile-money-heading">You will be charged GHS {price.toFixed(2)} <span className="mobile-charge"></span> from your mobile money</p>
                            <p className='phone-error'>{phone_error ? phone_error : ''}</p>
                            <Grid container spacing={2}>
                                    {
                                    button === "Submit OTP" ? (
                                        <Grid item xs={6} >
                                    <TextField
                                        id="outlined-basic"
                                        label="Enter OTP"
                                        variant="outlined"
                                        value={otp}
                                        onChange={e => setOTP(e.target.value)}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                    
                                </Grid>
                                    ): (
                                        <Grid item xs={6}>
                                        
                                        <TextField
                                            id="outlined-basic"
                                            label="Enter Mobile Money Number"
                                            variant="outlined"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                className: classes.floatingLabelFocusStyle,
                                            }}
                                        />
                                    </Grid>
                                    )
                                }
                              
                               
                            </Grid>
                            {
                                    button === "Submit OTP" ? (
                                        <Button onClick={process_otp} className={classes.payBtn}>{button}</Button>

                                    ) : (
                                        <Button onClick={momo} className={classes.payBtn}>{button}</Button>
                                    )
                                }
                                      
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
                          
                                    <>
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
                                    <Button className={classes.payBtn}>{button}</Button>
                                    </>
                                    <>
                                     <Grid item xs={6}>
                                        <TextField
                                            value={otp}
                                            onChange={e => {setOTP(e.target.value) }}
                                            id="outlined-basic"
                                            label="OTP"
                                            variant="outlined"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                className: classes.floatingLabelFocusStyle,
                                            }}
                                        />
                                        <Button  className={classes.payBtn}>{button}</Button>
                                    </Grid>
                                    
                                    </>
                            
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
        </MainLayout>
    )
}

export default SubscriptionSummary