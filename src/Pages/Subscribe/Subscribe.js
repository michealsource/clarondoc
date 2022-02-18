import React,{useEffect,useState} from 'react'
import { FaCheckCircle} from "react-icons/fa";
import { useNavigate} from "react-router-dom"
import './Subscribe.css'
import MainLayout from '../MainLayout';
const prices = []
prices['Basic'] = 20
prices['Premium'] = 40
prices['Family'] = 100



function Subscribe() {
    let navigate = useNavigate()
    const [user, setUser] = useState()
    
    useEffect(()=>{
    
          let account = localStorage.getItem('user')
          setUser(JSON.parse(account))
            console.log(user,'fffff')
     
      }, [])
    
    return (
        <MainLayout>
        <div className="subcription-container">
            <h3>OUR SUBCRIPTIONS PLANS</h3>
            <div class="pricing-table">

            <div class="pricing-card">
                    <div class="pricing-card-header">
                        <h4>Basic Plan</h4>
                        <h4>Subscribe for GHS 20/month</h4>
                        <button
                       
                       onClick={()=>navigate('/OrderReview', { state: { type: 'Premium Plan', id: '', totalCost: 20}  })}
                         className="pay-btn">  for GHS 20/month</button>
                    </div>
                    <div class="price">
                        <div class="single-price">
                        
                        <p className="sub-title-pay">168hrs open chat consult</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">1 voice call consultation</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">1 video call consultation</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">Unlimited Ambulance request</p>
                        
                        </div>

                        <div class="single-price">
                       
                        <p className="sub-title-pay">Unlimited Home Care request</p>
                        
                        </div>

                        <div class="single-price">
                       
                       <p className="sub-title-pay">Unlimited mobile Pharmacy request</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">Unlimited mobile lab request</p>
                       
                       </div>
                        
                       <div class="single-price">
                       
                       <p className="sub-title-pay">1 Valid subscriber</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">free prescription</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">Health tips</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">24/7 Support</p>
                       
                       </div>
                    </div>
                        <span className="sub-description">Service fee are subject to be summed with drug fees, test fees and trip fee (for ambulance)</span>
                </div>

                <div class="pricing-card">
                    <div class="pricing-card-header">
                        <h4>Premium Plan</h4>
                        <h4>Subscribe for GHS 40/month</h4>
                        <button
                        onClick={()=>navigate('/OrderReview', { state: { type: 'Premium Plan', id: '', totalCost: 40}  })}
                         
                         className="pay-btn">  for GHS 40/month</button>
                    </div>
                    <div class="price">
                        <div class="single-price">
                        
                        <p className="sub-title-pay">168hrs open chat consult</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">1 voice call consultation</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">1 video call consultation</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">Unlimited Ambulance request</p>
                        
                        </div>

                        <div class="single-price">
                       
                        <p className="sub-title-pay">Unlimited Home Care request</p>
                        
                        </div>

                        <div class="single-price">
                       
                       <p className="sub-title-pay">Unlimited mobile Pharmacy request</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">Unlimited mobile lab request</p>
                       
                       </div>
                        
                       <div class="single-price">
                       
                       <p className="sub-title-pay">1 Valid subscriber</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">free prescription</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">Health tips</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">24/7 Support</p>
                       
                       </div>
                    </div>
                        <span className="sub-description">Service fee are subject to be summed with drug fees, test fees and trip fee (for ambulance)</span>
                </div>
 
                <div class="pricing-card">
                    <div class="pricing-card-header">
                        <h4>Family Plan</h4>
                        <h4>Subscribe for GHS 100/month</h4>
                        <button
                        onClick={()=>navigate('OrderReview', { state: { type: 'Family Plan', id: '', totalCost: 100}  })}
                         
                         className="pay-btn">   for GHS 100/month</button>
                    </div>
                    <div class="price">
                        <div class="single-price">
                        
                        <p className="sub-title-pay">168hrs open chat consult</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">1 voice call consultation</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">1 video call consultation</p>
                        
                        </div>

                        <div class="single-price">
                        
                        <p className="sub-title-pay">Unlimited Ambulance request</p>
                        
                        </div>

                        <div class="single-price">
                       
                        <p className="sub-title-pay">Unlimited Home Care request</p>
                        
                        </div>

                        <div class="single-price">
                       
                       <p className="sub-title-pay">Unlimited mobile Pharmacy request</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">Unlimited mobile lab request</p>
                       
                       </div>
                        
                       <div class="single-price">
                       
                       <p className="sub-title-pay">1 Valid subscriber</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">free prescription</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">Health tips</p>
                       
                       </div>

                       <div class="single-price">
                       
                       <p className="sub-title-pay">24/7 Support</p>
                       
                       </div>
                    </div>
                        <span className="sub-description">Service fee are subject to be summed with drug fees, test fees and trip fee (for ambulance)</span>
                </div>

            </div>
        </div>
        </MainLayout>
    )
}

export default Subscribe
