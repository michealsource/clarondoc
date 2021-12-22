// LOGIN ACTIONS
export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START"
})

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
})

export const LoginFaliure = (error)=>({
    type:"LOGIN_FALIURE",
    payload:error
})

// export const logout = (userLogout)=>{
//     type:"LOGOUT",
//     payload:userLogout
// }