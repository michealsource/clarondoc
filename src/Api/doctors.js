
const axios = require('axios');
let base_url = 'https://api.clarondoc.com'
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

export const DeleteBooking = async (id) => {
    const key = await apiKey()
    const auth = localStorage.getItem('access-token');
    const email = localStorage.getItem('email');

    const response = await axios({
        method: 'PUT',
        url: `https://api.clarondoc.com/requests/physicians/consultations/${id}`,
        data: {schedule: 'Wed Jan 13 2021 15:30'},
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })
    console.log(response.data)
    return response.data
}


export const respondRequest = async (response, id)=>{
    try{
        console.log('reach for logger: '+response+id)
        const key = await apiKey()
        let token = await localStorage.getItem('access-token');
        let res = await axios.post(`${base_url}/physicians/consultations/confirm`, {
            availability: response,
            status: response,
            id
        }, {
            headers: {
                'x-api-key': key,
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(res.data);
        return res.data.success;
    }catch(e){
        console.log(e.response.data);
        return false
    }
}
