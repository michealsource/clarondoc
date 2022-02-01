
const axios = require('axios');

export const fetchDrugs = async (prescribed) => {

    const key = await apiKey()
    const auth = localStorage.getItem('access-token');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/drugs?limit=10000&prescribed=${prescribed}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        },
        options: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    const response_ = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/drugs?limit=10000&prescribed=true`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        },
        options: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if(response.data.success && response_.data.success){
        return [...response.data.drugs, ...response_.data.drugs]
    }else{
        return []
    }
}

export const buyDrugs = async (data, token) => {

    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');

    const response = await axios({
        method: 'POST',
        url: 'https://api.clarondoc.com/drugs/order',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-payment-token': token,
            'x-api-key': key
        }
    })

    console.log(response.data)

    return response.data
}

export const myLabTests = async (sel) => {
    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');
    const email = await localStorage.getItem('email');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/requests/tests/${sel}/users/${email}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}

export const myPharmacyOrders = async () => {
    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');
    const email = await localStorage.getItem('email');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/orders/users/${email}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}

export const myAmbulanceRequests = async () => {
    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');
    const email = await localStorage.getItem('email');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/requests/ambulance/users/${email}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}

export const myHomecareRequests = async () => {
    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');
    const email = await localStorage.getItem('email');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/requests/homeCare/users/${email}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}

export const requestAmbulance = async (address, emergency, comment) => {
    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');
    const user = await localStorage.getItem('user');
    console.log(JSON.parse(user))

    const response = await axios({
        method: 'POST',
        url: `https://api.clarondoc.com/requests/ambulance`,
        data: {
            schedule: new Date().toISOString(), 
            pickup: address.trim().length === 0 ? 'No Address provided.' : address, 
            names: JSON.parse(user).firstname, 
            destination: 'Nearest', 
            contact: JSON.parse(user).phone, 
            requester: JSON.parse(user).firstname, 
            relationship: 'Other', 
            conditions: [
                emergency,
                comment.trim().length > 0 ? comment : 'No comments'
            ], 
            signature: JSON.parse(user).email
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    console.log(response.data)

    return response.data
}

export const apiKey = async (data) => {
    let key = await localStorage.getItem('api-key');

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

        await localStorage.setItem('api-key', key)

        return key
    }
}