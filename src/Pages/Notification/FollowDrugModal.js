import React, { useState } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { FiX } from "react-icons/fi";
import{Link} from 'react-router-dom'
import './Notification.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function FollowDrugModal({open, setOpen}) {
    const [toggled, setToggled] = useState(true)

    return (
        <div>
            <Dialog open={open} fullWidth={true}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        Prescribed Drugs
                        <IconButton onClick={()=>setOpen(false)}>
                            <FiX />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>

                    <div class="drugs-infor-container-modal">
                        <h4>Delivery Information</h4>
                        <div class="address">

                            <div className="switch-container">
                                <label className="switch">
                                    <input type="checkbox"
                                        checked={toggled}
                                        className="input-checked"
                                        onChange={() => setToggled(!toggled)}
                                    />
                                    <span className="slider" />
                                    <label className="pick-text">I will pick up my order by myself</label>
                                </label>
                            </div>

                            {toggled && <div class="add-contact-container">
                                <h4>Delivery Address</h4>
                                <p>Home:          <span>GH</span></p>
                                <p>Contact No:    <span>8589669966</span></p>
                            </div> }
                            

                            <div class="drug-delivery-time-container">
                                
                                <div class="radio-group-conatiner">
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend"><h4>Delivery Time</h4></FormLabel>
                                        <RadioGroup aria-label="time" defaultValue="female" name="radio-buttons-group">
                                            <FormControlLabel value="5:00 AM - 12:00 PM" control={<Radio />} label="5:00 AM - 12:00 PM" />
                                            <FormControlLabel value="12:01 PM - 4:00 PM" control={<Radio />} label="12:01 PM - 4:00 PM" />
                                            <FormControlLabel value="4:00 PM - 9:00 PM" control={<Radio />} label="4:00 PM - 9:00 PM" />
                                            <FormControlLabel value="Any Time" control={<Radio />} label="Any Time" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>

                            <div class="list-of-drugs-container">
                                <div>
                                    Medical Report x 2
                                </div>
                                <div className="price-d">
                                    GHS1.0 0
                                </div>
                            </div>
                           <div class="pay-drug-btn-container">
                                 <Link to ="/OrderReview" className="pay-drug-btn">Checkout</Link>
                           </div>
                            
                        </div>
                       
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FollowDrugModal
