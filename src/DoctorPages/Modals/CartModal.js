import React from 'react'
import './Modals.css'

function CartModal() {
    return (
        <div className="list-of-prescribed-drug-container">

            <div class="list-card">
        
                <div className="list-card-inner">
                    <div className="list-card-name">
                        <p style={{fontWeight:'bold', paddingRight:'10px'}}>Name:</p>
                        <p style={{color:'#1bcc88'}}>Edina Anku</p>
                    </div>

                    <div class="drug-p-p-container">
                        <h4>NAME OF DRUGS WITH PRICE</h4>
                        <div className="drug-1">
                            <p>CRESTOR 10MG (1 pack) X 1</p>
                            <p>GHS153.00</p>
                        </div>
                        <div className="drug-1">
                            <p>CRESTOR 10MG (1 pack) X 1</p>
                            <p>GHS153.00</p>
                        </div>
                    </div>
                </div>
                <button className="cart-sub-btn-c">Submit</button>
            </div>
        </div>
    )
}

export default CartModal
