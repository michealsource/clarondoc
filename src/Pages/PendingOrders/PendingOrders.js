import React from 'react'
import { Checkbox } from "@mui/material";

import './PendingOrders.css'
import { Link } from 'react-router-dom';
function PendingOrders() {
    return (
        <div className="pickup-container">
            <h4>Delivery Informaton</h4>
            <div class="pick-up-container">
                <Checkbox />
                <label for="">I Will Pick up my order by myself</label>

                <span className="add-address">Add Address</span>

                <div class="tme-item-container">
                    <div class="time-container">
                    <h4>Delivery Time</h4>
                        {/* <div>
                            <input type="radio" id="one" />
                            <label for="one">5:00pm - 12:00pm</label>
                        </div>

                        <div>
                            <input type="radio" id="two" />
                            <label for="two">12:01pm - 4:00pm</label>
                        </div>

                        <div>
                            <input type="radio" id="three" />
                            <label for="three">4:01pm - 9:00pm</label>
                        </div>

                        <div>
                            <input type="radio" id="four" />
                            <label for="four">Any Time</label>
                        </div> */}

                        <div>
                        <input className="time-radio" type="radio" id="age1" name="time" value="30" />
                            <label for="age1">5:00pm - 12:00pm</label>
                        </div>

                        <div>
                            <input type="radio" id="age2" name="time" value="60" />
                            <label for="age2">12:01pm - 4:00pm</label><br />
                        </div>

                        <div>
                            <input type="radio" id="age3" name="time" value="100" />
                            <label for="age3">4:01pm - 9:00pm</label><br />
                        </div>

                        <div>
                            <input type="radio" id="four" name="time"/>
                            <label for="four">Any Time</label>
                        </div>
                       
                    </div>

                    <div class="item-bought-container">
                        <h3>DRUGS</h3>
                        <p>ZINC OXIDE OINTMENT<span> x3</span> <span className="amount-drug-pay">GHS53.32</span> </p>
                        <p>ZINCOVIST SYRUB <span>  x3</span> <span className="amount-drug-pay">GHS53.32</span></p>
                    </div>
                </div>

                <Link to="" className="check-out-btn">Check Out</Link>
            </div>

        </div>
    )
}

export default PendingOrders
