import React,{useState} from 'react'
import './Dash.css'
import user1 from '../../images/user.png'
function Dash() {
  
  return (
      <>
        <input type="checkbox" id="nav-toggle"/>
        <div class="sidebar">
        <div class="sidebar-brand">
            <h2><span class="las la-clinic-medical"></span> <span>Hospital</span></h2>
        </div>
 
        <div class="sidebar-menu">
            <ul>

                <li className='service-d'>
                    <a href=""><span class="las la-stethoscope"></span>
                    <span>Dashboard</span></a>
                </li>
                <li className='service-d'>
                    <a href=""><span class="las la-user"></span>
                    <span>Consultation</span></a>
                </li>
                <li className='service-d'>
                    <a href=""><span class="las la-user-injured"></span>
                    <span>Laboratory</span></a>
                </li>
                <li className='service-d'>
                    <a href=""><span class="las la-history"></span>
                    <span>Appointment History</span></a>
                </li>
                <li className='service-d'>
                    <a href=""><span class="las la-search"></span>
                    <span>Ambulance</span></a>
                </li>
                <li className='service-d'>
                    <a href=""><span class="las la-book-medical"></span>
                    <span>Home Care</span></a>
                </li>

                <li className='service-d'>
                    <a href=""><span class="las la-book-medical"></span>
                    <span>Pharmacy Buy' Drugs</span></a>
                </li>

                <li className='service-d'>
                    <a href=""><span class="las la-book-medical"></span>
                    <span>Subscribe Now!</span></a>
                </li>

                <li className='service-d'>
                    <a href=""><span class="las la-book-medical"></span>
                    <span>Referral</span></a>
                </li>

                
            </ul>
        </div>
    </div>

    <div class="main-content">
        <header>
            <h2>
                <label for="nav-toggle">
                    <span class="las la-bars"></span>
                </label> Tablero
            </h2>

            <div class="search-wrapper">
                <span class="las la-search"></span>
                <input type="search" placeholder="Buscar aquí" />
            </div>
            <div class="user-wrapper">
                <img src="img/Avatar.png" width="40px" height="40px" alt="user"/>
                <div>
                    <h4>Administrador</h4>
                    <small>Super Admin</small>
                </div>
            </div>
        </header>


    </div>


     </>
  )
}

export default Dash