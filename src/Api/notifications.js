
const axios = require('axios');

export const fetchNotifications = async () => {

    const key = await apiKey()
    const auth = localStorage.getItem('access-token');
    const email =localStorage.getItem('email');

    try{
        const response = await axios({
            method: 'GET',
            url: `https://api.clarondoc.com/notifications/users/${email}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`,
                'x-api-key': key
            }
        })

        if(response.data.success){
            return response.data.notifications
        }else{
            return []
        }
    }catch(e){
        return []
    }
}

export const sendMessage = async (data)=>{
    
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

        localStorage.setItem('api-key', key)

        return key
    }
}