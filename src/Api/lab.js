
const axios = require('axios');

export const facilityLabRequest = async (data) => {

    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');

    const response = await axios({
        method: 'POST',
        url: 'https://api.clarondoc.com/requests/tests/facility',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}

export const individualLabRequest = async (data) => {

    try{
        const key = await apiKey()
        const auth = await localStorage.getItem('access-token');

        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/requests/tests/individual',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`,
                'x-api-key': key
            }
        })
        console.log(response.data)

        return response.data.success
        
    }catch(e){
        console.log(e)
        return false
    }
}

export const getLabTests = async () => {
    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/tests`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data.tests
}

export const apiKey = async () => {
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