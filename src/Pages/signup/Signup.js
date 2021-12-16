import React from 'react'
import './signup.css'
import signupimage from '../../images/signup.svg'
import Navbar from '../../Component/Navbar/Navbar'

function Signup() {
    return (
        <>
         <div className="wrapper">
          <div class="inner">
              <div class="image-holder">
              <img src={signupimage} alt="" className="sign-up-img"/>
              </div>
              <form>
                  <h3>Register</h3>
                  <div class="form-group">
                      <input type="text" placeholder="First Name" className="form-control"/>
                      <input type="text" placeholder="Last Name" className="form-control"/>
                  </div>

                  <div class="form-wrapper">
                      <input type="text" placeholder="Phone Number" className="form-control"/>
                  </div>

                  <div class="form-wrapper">
                      <input type="text" placeholder="Email" className="form-control"/>
                  </div>
                  
                  <div class="form-wrapper">
                      <input type="date" placeholder="Email" className="form-control"/>
                  </div>
                  

                  <div class="form-wrapper">
                      <select name="" id="" className="form-control">
                            <option value="" disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="custom">Custom</option>
                      </select>
                  </div>

                  <div class="form-wrapper">
                      <input type="text" placeholder="Address" className="form-control"/>
                  </div>

                  <div class="form-wrapper">
                      <input type="password" placeholder="password" className="form-control"/>
                  </div>

                  <button className="sign-up-button">Sign Up</button>
                    <p className="terms">By Sign In you agree with our <span style={{color:'#1BCC88',cursor: 'pointer'}}>Terms</span></p>
              </form>
          </div>
        </div>
        </>
        
    )
}

export default Signup
