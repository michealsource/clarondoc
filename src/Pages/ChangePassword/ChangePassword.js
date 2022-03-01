import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { updatePassword,userDetails } from '../../Api/Auth';
import { useNavigate, useRoutes } from "react-router-dom";
import './ChangePassword.css'
import MainLayout from '../../Pages/MainLayout'
import swal from 'sweetalert';
function ChangePassword() {
    const navigate = useNavigate()
    const [password, setpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [user, setUser]=useState()
    const [response, setresponse] = useState({
      error: false,
      message: null
    })

    const [account, setaccount] = useState({
        firstname: '', 
        lastname: '', 
        age: '', 
        email: '', 
        avatar: '', 
        address: '', 
        gender: '',
        phoneNumber: ''
      })

    //   SUBMIT REQUEST
    const savePassword = async ()=>{
    
        if(password.length == 0){
          return setresponse({
            error: true,
            message: 'Please enter your current password'
          })
        }
        
    
        if(newpassword.trim().length == 0){
          return setresponse({
            error: true,
            message: 'Please enter your new password'
          })
        }
    
        if(confirmpassword.trim().length == 0){
          return setresponse({
            error: true,
            message: 'Please confirm your new password'
          })
        }
    
        if(newpassword == confirmpassword){
          try{
            setloading(true)
            let data = await updatePassword({password: newpassword})
            setloading(false)
            if(data.success){
              setresponse({
                error: false,
                message: 'Your password was successfully updated!'
              })
              swal({
                title: "Password update",
                text: "Password updated successfully",
                icon: "success",
                button: "Ok",
            });
    
            }else{
              setresponse({
                error: true,
                message: data.message
              })
            }
    
          }catch(e){
            console.log(e)
            setloading(false)
            setresponse({
              error: true,
              message: e.response.data.message
            })
          }
        }else{
          setresponse({
            error: true,
            message: 'Your passwords do not match'
          })
        }
      }
      let currentUser = JSON.parse(localStorage.getItem('user'));

      useEffect(()=>{
          const data = async ()=>{
            const data1 = await userDetails(currentUser.email)
            setUser(data1)
            
          }
          data()
      },[])
   
    return (
        <MainLayout>
        <div className='changepassword-container'>
            <h2>Change Password</h2>
            {/* <TextField
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                className='change'
                id="demo-helper-text-misaligned-no-helper"
                label="Current Password" /> */}
            <TextField
                onChange={(e) => setnewpassword(e.target.value)}
                value={newpassword}
                className='change'
                id="demo-helper-text-misaligned-no-helper"
                label="New Password" />
            <TextField
                onChange={(e) => setconfirmpassword(e.target.value)}
                value={confirmpassword}
                className='change' id="demo-helper-text-misaligned-no-helper" label="Confirm New Password" />
            <Button onClick={savePassword} disabled={loading} className='change-btn-password' variant="contained">{ loading ? 'Saving...' : 'Save Changes' }</Button>
        </div>
        </MainLayout>
    )
}

export default ChangePassword