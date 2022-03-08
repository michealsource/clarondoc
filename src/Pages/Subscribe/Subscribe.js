import React,{useEffect,useState} from 'react'
import { FaCheckCircle} from "react-icons/fa";
import { useNavigate} from "react-router-dom"
import {useSelector } from 'react-redux'
import './Subscribe.css'
import MainLayout from '../MainLayout';
const prices = []
prices['Basic'] = 20
prices['Premium'] = 40
prices['Family'] = 100

function Subscribe() {
    // const [user, setUser] = useState()
    let navigate = useNavigate()
    const userData = useSelector((state)=>state.user.value)
    
      console.log(userData,'fffff')
    return (
        <MainLayout>
<div class="snip1214">

{ userData.subscription != 'Basic Plan' ?
  <div class="plan">
    <h3 class="plan-title">
      Basic  
    </h3>
    <div class="plan-cost"><span class="plan-price">GHS 20</span><span class="plan-type">/ Monthly</span>
    <p className='price-discount'>15% discount on all services</p>
    </div>
    <ul class="plan-features">
      <li><i class="ion-checkmark"> </i>168hrs open chat consultation</li>
      <li><i class="ion-checkmark"> </i>1 voice call consultation</li>
      <li><i class="ion-checkmark"> </i>1 video call consultation</li>
      <li><i class="ion-checkmark"> </i>Unlimited Home Care Request</li>
      <li><i class="ion-checkmark"> </i>Unlimited Ambulance Request</li>
      <li><i class="ion-checkmark"> </i>Unlimited Mobile Pharmacy requests</li>
      <li><i class="ion-checkmark"> </i>Unlimited Mobile Lab requests</li>
      <li><i class="ion-checkmark"> </i>1 Valid subscriber</li>
      <li><i class="ion-checkmark"> </i>Free prescriptions and delivery</li>
      <li><i class="ion-checkmark"> </i>Health tips</li>
      <li><i class="ion-checkmark"> </i>24/7 Support</li>
    </ul>
    <button onClick={()=>navigate("/Sub-Summary",{ state: { name: 'Basic Plan', id: '', price: 20 } })} class="plan-select">
    { userData.subscription == null || userData.subscription == 'Normal' ? 'Subscribe' : userData.subscription == 'Family Plan' || userData.subscription == 'Premium Plan' ? 'Downgrade' : 'Upgrade'}
    </button>
  </div>:<></> }

  { userData.subscription != 'Premium Plan' ?
  <div class="plan">
    <h3 class="plan-title">
    Premium Plan
    </h3>
    <div class="plan-cost"><span class="plan-price">GHS 40</span><span class="plan-type">/ Monthly</span>
    <p className='price-discount'>15% discount on all services</p>
    </div>
    <ul class="plan-features">
      <li><i class="ion-checkmark"> </i>Unlimited open chat consult</li>
      <li><i class="ion-checkmark"> </i>Unlimited voice call consultation</li>
      <li><i class="ion-checkmark"> </i>Unlimited video call consultation</li>
      <li><i class="ion-checkmark"> </i>Unlimited Home Care requests</li>
      <li><i class="ion-checkmark"> </i>Unlimited Ambulance requests</li>
      <li><i class="ion-checkmark"> </i>Unlimited Mobile Pharmacy requests</li>
      <li><i class="ion-checkmark"> </i>Unlimited Mobile Lab requests</li>
      <li><i class="ion-checkmark"> </i>1 Valid subscriber</li>
      <li><i class="ion-checkmark"> </i>Free prescriptions and delivery</li>
      <li><i class="ion-checkmark"> </i>Health tips</li>
      <li><i class="ion-checkmark"> </i>24/7 Support</li>
    </ul>
    <button class="plan-select"
    onClick={()=>navigate("/Sub-Summary",{ state: { name: 'Premium Plan', id: '', price: 40 } })}
    >  
    { userData.subscription == null || userData.subscription == 'Normal' ? 'Subscribe' : userData.subscription === 'Family Plan' ? 'Downgrade' : 'Upgrade'}</button>
  </div>:<></> }

  { userData.subscription != 'Family Plan' ?
  <div class="plan featured">
    <h3 class="plan-title">
    Family Plan
    </h3>
    <div class="plan-cost"><span class="plan-price">GHS 100</span><span class="plan-type">/ Monthly</span>
    <p className='price-discount-f'>15% discount on all services</p>
    </div>
    <ul class="plan-features">
      <li><i class="ion-checkmark"> </i>Unlimited open chat consult</li>
      <li><i class="ion-checkmark"> </i>Unlimited voice call consultation</li>
      <li><i class="ion-checkmark"> </i>Unlimited video call consultation</li>
      <li><i class="ion-checkmark"> </i>Unlimited Home Care requests</li>
      <li><i class="ion-checkmark"> </i>Unlimited Ambulance requests</li>
      <li><i class="ion-checkmark"> </i>Unlimited Mobile Pharmacy requests</li>
      <li><i class="ion-checkmark"> </i>Unlimited Mobile Lab requests</li>
      <li><i class="ion-checkmark"> </i>1 subscriber + 10 Family Members</li>
      <li><i class="ion-checkmark"> </i>Free prescriptions and delivery</li>
      <li><i class="ion-checkmark"> </i>Health tips</li>
      <li><i class="ion-checkmark"> </i>24/7 Support</li>
    </ul>
    <button class="plan-select"  onClick={()=>navigate("/Sub-Summary",{ state: { name: 'Family Plan', id: '', price: 100 } })}> { userData.subscription == null || userData.subscription == 'Normal' ? 'Subscribe' : userData.subscription == 'Family Plan' ? 'Downgrade' : 'Upgrade'}</button>
  </div>:<></> }
 
</div>
    
        </MainLayout>
    )
}

export default Subscribe
