import React, { useState,useEffect} from 'react'
// import '../OrderReview.css'
import { FaMobileAlt, FaCreditCard} from "react-icons/fa";
import { Box, Button, Grid, TextField, Select, MenuItem } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {UPDATESUB} from '../../features/user';
import { useDispatch,useSelector } from 'react-redux'
import  MainLayout from "../MainLayout"
import 'date-fns';
import { useLocation, useNavigate } from "react-router-dom";
import { initPayment, verOtp, cardPayment,Upgrade_sub } from '../../Api/paystack';
import moment from 'moment';
import swal from 'sweetalert';



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
        fontSize: '18px !important',
        padding: '10px',
        borderRadius: '5px',
        marginBottom:'20px'
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

function PayAsYouGo() {
    const {state} = useLocation();
    const dispatch = useDispatch()
    const { name,doctor,price } = state;
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
    const [button, setButton] = useState('Pay Now')
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

    // CARD PAYMENT
    const cardInsurancePayment = async()=>{
        const card = {
            number: number,
            month: month,
            year: year,
            cvv: cvv,
            pin: pin
        }
        if(card.number.length < 10){
            setCardError('Please enter a valid card number')
            return
          }
    
          if(card.month.length < 2){
            setCardError('Please enter a valid expiry month')
            return
          }
    
          if(card.month*1 > 12){
            setCardError('Please enter a valid expiry month')
            return
          }
    
          if(card.year.length < 2){
            setCardError('Please enter a valid expiry year')
            return
          }
    
          if(card.year*1 < 21){
            setCardError('Please enter a valid expiry year')
            return
          }
    
          if(card.cvv.length < 3){
            setCardError('Please enter a valid card cvv')
            return
          }
          setLoading(true)
          setButton('Initializing Transaction...')
          let init = await cardPayment(card, price);
          // console.log(card)

          if(init.status){
            if(init.data.status === 'send_otp'){
              setLoading(false)
              setshowotp_field(true)
              settnx_ref(init.data.reference)
              setButton('Submit OTP ABOVE')
            }else if(init.data.status === 'pay_offline'){
              setLoading(false)
              setButton('Awaiting for payment confirmation...')
            }else if(init.data.status === 'success'){
              setLoading(false)
              setButton('Done')
              swal({
                title: "Payment successful",
                text: `You have successfully paid ${price}'} `,
                icon: "success",
                button: "Ok",
            });
            if(name === "Pay As You go"){
              navigate('/Book',{state:{doctor}})
            }else{
              navigate('/chat',{state:{doctor}})
            }
    
            }else{
              setLoading(false)
              setButton(init.data.gateway_response)
            }
  
          }else{
            setLoading(false)
            setButton('Subscribe Now')
            setPhoneError(init.data.message)
            alert(init.data.message)
            return
          }
    }

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
      
                if(init.data.status === 'send_otp'){
                  setLoading(false)
                  setshowotp_field(true)
                  settnx_ref(init.data.reference)
                  setButton('Submit OTP ABOVE')
                }else if(init.data.status == 'pay_offline'){
                  setLoading(false)
                  setButton('Awaiting for payment confirmation...')
                }else if(init.data.status === 'success'){

                  swal({
                    title: "Payment successful",
                    text: `Your ${name} was successful click Ok`,
                    icon: "success",
                    button: "Ok",
                  });
                  if(name === "Pay As You go"){
                    navigate('/Book',{state:{doctor}})
                  }else{
                    navigate('/chat',{state:{doctor}})
                  }
                  
               
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
             const sub = await Upgrade_sub( name, moment(new Date().toString().substr(0, 16)).add(1,"months"))
             localStorage.setItem('subscription', sub);
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
              if(name === "Pay As You go"){
                navigate('/Book',{state:{doctor}})
              }else{
                navigate('/chat',{state:{doctor}})
              }
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
                        <p>Payment</p>
                       
                    </div>

                    <div class="discount-price">
                        <p>Total</p>
                    </div>
                </div>

                <div class="price-of-pay">
                    <div class="first-price">
                    <p style={{ color: '#61cd88' }}>{name}</p>
                        
                    </div>

                    <div class="second-price">
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
                                {
                                    showotp_field ? (
                                        <>
                                            <Grid item xs={6}>
                                                <TextField
                                                    value={otp}
                                                    onChange={e => { setOTP(e.target.value) }}
                                                    id="outlined-basic"
                                                    label="OTP"
                                                    variant="outlined"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        className: classes.floatingLabelFocusStyle,
                                                    }}
                                                />
                                            </Grid>
                                            <Button onClick={() => process_otp()} className={classes.payBtn}>{button}</Button>
                                        </>
                                    ) : (
                                        <>
                                            <p className='card-error'>{card_error ? card_error : ''}</p>
                                            <Grid container spacing={2}>

                                                <Grid item xs={6}>

                                                    <TextField
                                                        value={number}
                                                        onChange={e => { setNumber(e.target.value) }}
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
                                                        onChange={e => { setMonth(e.target.value) }}
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
                                                        onChange={e => { setYear(e.target.value) }}
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
                                                        onChange={e => { setCvv(e.target.value) }}
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
                                                        onChange={e => { setPin(e.target.value) }}
                                                        id="outlined-basic"
                                                        label="PIN"
                                                        type="password"
                                                        variant="outlined"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            className: classes.floatingLabelFocusStyle,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button onClick={cardInsurancePayment} className={classes.payBtn}>{loading ? "Processing..." : `Pay GHS ${price}`}</Button>
                                        </>
                                    )
                                }
                            </AccordionDetails>
                        </Accordion>
                </div>
            </div>
        </div>
        </MainLayout>
    )
}

export default PayAsYouGo