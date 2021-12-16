import React,{useState} from 'react'
import './Wallet.css'
import TextField from '@mui/material/TextField';
import WalletTable from './WalletTable'
import WalletModal from './WalletModal'

function Wallet() {
    const[openModal, setOpenModal] = useState(false)
    return (
        <div className="referral-wallet-container">
            <h2>Referral Wallet</h2>

            <div class="wallet-container">
                <div class="balance-container">
                    <div class="amount-wallet-container">
                        <h2>0</h2>
                        <p>WALLET BALANCE</p>
                    </div>
                    <button onClick={()=>setOpenModal(true)}>Withdraw</button>
                </div>
            </div>

            <div class="serach-container-wallet">
                <h2>Your Transaction History</h2>
                <TextField fullWidth label="Search field" type="search" variant="standard" />
            </div>
            <WalletTable/>
            <WalletModal  openModal={openModal} setOpenModal={setOpenModal}/>
        </div>
    )
}

export default Wallet
