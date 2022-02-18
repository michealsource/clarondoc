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
import  MainLayout from "../MainLayout"
import 'date-fns';
import { useLocation, useNavigate } from "react-router-dom";
import { initPayment, verOtp, cardPayment } from '../../Api/paystack';
import { facilityLabRequest, individualLabRequest, insurancefacilityLabRequest, insuranceindividualLabRequest } from '../../Api/lab';
import { requestHomeCare, insurancerequestHomeCare, get_insurance_provider, request_payment_through_insurance } from '../../Api/homecare';
import { buyDrugs } from '../../Api/pharmacy'
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

function OrderReview() {
    const location = useLocation();

    const{item,totalCost,name,serviceCharge,discount, type}= location.state
    // const{totalCost}= item
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

    const netAmount = item.totalCost + item.serviceCharge

    const handleDateChange = (newValue) => {
      setValue(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => setOpen(false);

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
            let init = await initPayment(item.totalCost + 5,phone,network)

            console.log(init, "init")

            if(init.status){

              if(init.data.status === 'send_otp'){
                  setLoading(false)
                  alert(init.data.display_text)
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
            console.log(e)
          console.log(e)
            setLoading(false)
            setButton('Pay Now')
            setPhoneError(e.message)
            return
        }
    }

    const processCardPayment = async (netAmount) => {

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
            setButton('Initializing Transaction, Please wait...')

            
            let init = await cardPayment(card, netAmount);
    
            console.log(card, netAmount, init)
    
            // start
            if(init.status){
    
              if(init.data.status == 'send_otp'){
                  setLoading(false)
                  setshowotp_field(true)
                  settnx_ref(init.data.reference)
                  setButton('Pay Now')
              }else if(init.data.status == 'pay_offline'){
                  setLoading(false)
                  setButton('Awaiting for payment confirmation...')
              }else if(init.data.status == 'success'){
    
                if(location.state.type == 'lab'){
                  if(location.state.item.type == 'facility'){
                    await facilityLabRequest(location.state.data)
                  }else{
                    await individualLabRequest(location.state.data)
                  }
                }else if(location.state.type == 'homecare'){
                  await requestHomeCare(location.state.data)
                }else if(location.state.type == 'drug'){
                    await buyDrugs(location.state.data)
                    localStorage.removeItem("cart")
                }

                const purpose = location.type == 'drug' ? 'Pharmacy Order' : location.type == 'lab' ? 'Laboratory Test(s)' : 'Home Care Service'
    
                setLoading(false)
                setButton('Done')
                swal({
                    title: "Payment successful",
                    text: `You have successfully paid GHS ${totalCost?totalCost:item.total} for ${purpose}. \n Your trasaction reference is ${init.data.reference}.`,
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
              setButton('Pay Now')
              setPhoneError(init.data.message)
              alert(init)
              return
            }
            // stop
    
          
    }


    const process_otp = async()=>{
        setLoading(true)
        setButton('Initializing Verification for Otp...')
  
        let init = await verOtp(tnx_ref, otp);
        // start
        if(init.status){
  
          if(init.data.status == 'send_otp'){
              setLoading(false)
              setPhoneError("Invalid or expired otp")
              settnx_ref(init.data.reference)
              setButton('Pay Now')
          }else if(init.data.status == 'pay_offline'){
              setLoading(false)
              setButton('Awaiting for payment confirmation...')
          }else if(init.data.status == 'success'){
  
            if(location.state.type == 'lab'){
              if(location.state.item.type == 'facility'){
                await facilityLabRequest(location.state.data)
              }else{
                await individualLabRequest(location.state.data)
              }
            }else if(location.state.type == 'homecare'){
              await requestHomeCare(location.state.data)
            }else if(location.state.type == 'drug'){
              await buyDrugs(location.state.data)
            }
  
            const purpose = location.type == 'drug' ? 'Pharmacy Order' : location.type == 'lab' ? 'Laboratory Test(s)' : 'Home Care Service'
            setLoading(false)
            setButton('Done')
            swal({
                title: "Payment successful",
                text: `You have successfully paid GHS ${totalCost?totalCost:item.total} for ${purpose}. \n Your trasaction reference is ${init.data.reference}.`,
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
          setButton('Pay Now')
          setPhoneError(init.data.message)
          return
        }
        // stop
      }
  
      
    console.log(name)

    
    
    return (
        <MainLayout>
        <div class="order-container">
            <div class="payment-review-container">
                <div class="title-of-pay">
                    <div class="first-title-pay">
                        <p>{location.state.type}</p>
                        <p>Service fee</p>
                    </div>

                    <div class="discount-price">
                        <p>Discount</p>
                        <p>Total</p>
                        <p>Net Total</p>
                    </div>
                </div>

                <div class="price-of-pay">
                    <div class="first-price">
                    <p style={{ color: '#61cd88' }}>GHS {item.totalCost? item.totalCost:item.total}</p>
                    <p style={{ color: '#61cd88' }}>GHS {item.serviceCharge?item.serviceCharge:'0.00'} </p>
                    <p style={{ color: '#61cd88' }}>GHS {discount?discount:'0.00'} </p>
                        
                    </div>

                    <div class="second-price">
                        <p style={{ color: '#cb2938' }}>GHS {item.totalCost?item.totalCost:item.totalCost}</p>
                        <p style={{ fontWeight: 'bold' }}> {item.serviceCharge ? `GHS ${item.totalCost + item.serviceCharge}` : `GHS ${item.totalCost}` }</p>
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

                            <p className="mobile-money-heading">You will be charged GHS <span className="mobile-charge">{totalCost?totalCost:item.totalCost}</span> from your mobile money</p>

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

                                {
                                    button === "Submit OTP" ? (
                                        <Grid item xs={6} >
                                    <p className='phone-error'>{phone_error ? phone_error : ''}</p>
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
                                        <p className='phone-error'>{phone_error?phone_error:''}</p>
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
                                        <Button onClick={momopayment} className={classes.payBtn}>{button}</Button>
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
                                            onChange={e => {setOTP(e.target.value) }}
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
                                    <Button onClick={() => processCardPayment(totalCost?totalCost:item.totalCost)} className={classes.payBtn}>{ loading ? "Processing..." : `Pay GHS ${totalCost?totalCost:item.totalCost}`}</Button>
                                    </>
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

export default OrderReview