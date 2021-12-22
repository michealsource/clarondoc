
const axios = require('axios');
export const register = async (data,dispatch) => {
    const key = await apiKey()
    try{
        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/register',
            data,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            options: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        localStorage.setItem('access-token',response.data.accessToken);
        localStorage.setItem('login-expiry', response.data.tokenExpiryUTC)
        localStorage.setItem('email', data.email)
        await userDetails(data.email, key, response.data.accessToken)
        console.log(response.data)
        return response.data
    }catch(e){
        
        return {
            message: e.message,//'The credentials you provided are not associated with any account',
            success: false
        }
    }
}


// PATIENT LOGIN
export const login = async (email, password) => {
    const key = await apiKey()

    try{
        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/login',
            data: {
                email,
                password
            },
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            options: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        
        localStorage.setItem('access-token',response.data.accessToken);
        localStorage.setItem('login-expiry', response.data.tokenExpiryUTC)
        localStorage.setItem('email',email)
        await userDetails(email, key, response.data.accessToken)
        return response.data
    }catch(e){
        return {
            message: e.message,//'The credentials you provided are not associated with any account',
            success: false
        }
    }
    
}

// GETTING USER DETAILS
export const userDetails = async (email, key, auth) => {
    const response = await axios({
        method: 'GET',
        url: 'https://api.clarondoc.com/users/'+email,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        },
        options: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if(response.data.success){
        localStorage.setItem('user', JSON.stringify(response.data.userDetails))
        return response.data.userDetails
    }
}

export const apiKey = async (data) => {
    let key = localStorage.getItem('api-key');
  
    if(key != null){
        return key
    }else{
        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/getAPIKey',
            data: {
                email: 'developer@clarondoc.com',
                password: 'Basket012Ball'
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })

        key = response.data.apiKey

        localStorage.setItem('api-key',key);
        return key
    }
}

// SOCIAL MEDIA LOGIN
export const sociallogin = async (email) => {

    const key = await apiKey()

    try{
        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/social/login',
            data: {
                email
            },
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            options: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        localStorage.setItem('access-token',response.data.accessToken);
        localStorage.setItem('login-expiry', response.data.tokenExpiryUTC)
        localStorage.setItem('email',email)
        await userDetails(email, key, response.data.accessToken)
        await userDetails(email, key, response.data.accessToken)

        return response.data
    }catch(e){
        return {
            message: e.message,//'The credentials you provided are not associated with any account',
            success: false
        }
    }
    
}
