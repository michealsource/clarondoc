import React, { useState, useEffect } from 'react'
import "./cart.css"
import { makeStyles } from '@mui/styles';
import { Grid, Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { FiX } from "react-icons/fi";
import drugsone from '../../images/drug-one.jpg'
import Badge from '@mui/material/Badge';
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import swal from 'sweetalert';


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
        marginBottom: '25px !important',

    },
    dateTime: {
        marginTop: 20,
        marginBottom: '20px !important'
    },
}));

function CartModal({ openModal, setOpenModal, cartItem, total, removeFromCart, addToCart }) {
    const classes = useStyles();
    const [ttotal, setTotal] = useState(0)
    const [pickup, setpickup] = useState(false)
    const [user, setUser] = useState()
    const [prescription, setprescription] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [deliveryAddress, setDeliveryAddress] = useState('')

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
    };
    const navigate = useNavigate()

    console.log(cartItem, "cartItem")

    useEffect(() => {
        const user = localStorage.getItem("user")
        const prescriptions = localStorage.getItem("prescription")
        setprescription(prescriptions)
        setUser(user)
    }, [])


    const totalBill = () => {
        let total = 0
        for (let i = 0; i < cartItem.length; i++) {
            const subtotal = cartItem[i] !== null ? cartItem[i].drug.unitprice * cartItem[i].quantity : 0
            total = total + subtotal
        }
        return parseFloat((total).toFixed(2))
    }


    const handleChange = (event) => {
        setpickup(event.target.checked);
    };


    const checkout = ()=>{

        let otc = true
        let count = 0
    
        cartItem.forEach(item=>{
          if(item?.drug?.requiresPrescription){
            otc = false
            count++
          }
        })
    
        if(otc){
            

            navigate('/OrderReview', {
                state: {
                    item: {
                        netTotal: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? totalBill() : totalBill() + 5,
                        totalCost: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? totalBill() : totalBill() + 5,
                        totalDiscount: 0,
                    },
                    data: {
                        order: cartItem,
                        prescription: 'not required',
                        deliveryOption: pickup ? 'Pickup' : 'Delivery',
                        deliveryLocation: {
                            address_type: "null",
                            contact_no: "null",
                            location_address: deliveryAddress,
                            name: "null"
                        },
                        deliveryTime: selectedDate,
                        isDirectDoctorPrescription: prescription ? true : false,
                        serviceId: 'orders'
                    },
                    type: 'drug'
                }
            })
        }else{
          if(prescription){

            navigate('/OrderReview', {
                state: {
                    item: {
                        netTotal: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? totalBill() : totalBill() + 5,
                        totalCost: ['Basic', 'Premium', 'Family'].includes(user.subscription) ? totalBill() : totalBill() + 5,
                        totalDiscount: 0,
                    },
                    data: {
                        order: cartItem,
                        prescription: prescription,
                        deliveryOption: pickup ? 'Pickup' : 'Delivery',
                        deliveryLocation: {
                            address_type: "null",
                            contact_no: "null",
                            location_address: deliveryAddress,
                            name: "null"
                        },
                        deliveryTime: selectedDate,
                        isDirectDoctorPrescription: prescription ? true : false,
                        serviceId: 'orders'
                    },
                    type: 'drug'
                }
            })
          }else{

            swal({
                title: "Missing prescription",
                text: `Missing Prescription', ${count} of the drugs on your cart require a doctor's prescription. Please upload one before you procced`,
                icon: "fail",
                button: "Ok",
              });
          }
        }
      }

    return (
        <div className="details-container">
            <Link to="" className="notification" onClick={() => setOpenModal(true)}>
                <Badge badgeContent={cartItem.length} color="success">
                    <FaShoppingCart className="card" />
                </Badge>
            </Link>
            <Dialog open={openModal}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        My Items
                        <IconButton onClick={() => setOpenModal(false)}>
                            <FiX />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {
                        cartItem.map(product => (

                            <div className="cart-container">
                                <div className="cart-item_view">
                                    <img className="cart-drug-img" src={product?.drug?.avatar} alt="drug-image" />
                                    <div class="cart-drug-name-and-price">
                                        <h4>{product?.drug?.name}</h4>
                                        <h5>{product?.quantity}</h5>
                                        <p>GHS{parseFloat((product?.drug?.unitprice * product?.quantity).toFixed(2))}</p>
                                    </div>
                                    <div className="actionBtn">
                                        <button className="actionBtnOne" onClick={() => removeFromCart(product)}>-</button>
                                        <button className="actionBtnTwo" onClick={() => addToCart(product)}>+</button>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    <hr />


                    {
                        pickup ? null : (
                            <Grid container spacing={2}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        value={deliveryAddress}
                                        onChange={e => { setDeliveryAddress(e.target.value) }}
                                        id="outlined-basic"
                                        label="Delivery address"
                                        variant="outlined"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                   
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={3}>
                                            <DesktopDatePicker
                                            label="When should we deliver"
                                            inputFormat="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            />
                                            </Stack>
                                        </LocalizationProvider>

                                </Grid>
                            </Grid>
                        )
                    }

                    <FormControlLabel control={<Checkbox
                        checked={pickup}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'I will collect the order myself' }}
                    />} label="I will collect the order myself" />


                    <div class="total_view">
                        <h2>Total:</h2>
                        <p>{totalBill()}</p>
                    </div>



                    <div class="cart-checkout" onClick={() => checkout()} >
                        <p>CHECKOUT</p>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CartModal
