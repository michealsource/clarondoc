
const axios = require('axios');
export const fetchDoctors = async () => {

    const key = await apiKey()
    const auth = localStorage.getItem('access-token');
    const response = await axios({
        method: 'GET',
        url: 'https://api.clarondoc.com/physicians',
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
        return response.data.physicians
    }else{
        return []
    }
}

export const makeBooking = async (data) => {

    const key = await apiKey()
    const auth = localStorage.getItem('access-token');

    const response = await axios({
        method: 'POST',
        url: 'https://api.clarondoc.com/requests/physicians/consultations',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}

export const onDemandBooking = async (data) => {

    try{
        const key = await apiKey()
        const auth = localStorage.getItem('access-token');

        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/booking/demand',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`,
                'x-api-key': key
            }
        })

        return response.data.success
        
    }catch(e){
        return false
    }
}

export const myBookings = async () => {
    const key = await apiKey()
    const auth = localStorage.getItem('access-token');
    const email = localStorage.getItem('email');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/requests/physicians/consultations/users/${email}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
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

        localStorage.getItem('api-key', key)

        return key
    }
}