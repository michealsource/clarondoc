
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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}

export const individualLabRequest = async (data) => {
    console.log(data, 'ggggggggg')
    try{
        const key = await apiKey()
        const auth = await localStorage.getItem('access-token');

        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/requests/tests/individual',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
            }
        })

        key = response.data.apiKey

         localStorage.setItem('api-key', key)

        return key
    }
}

export const insurancefacilityLabRequest = async (data) => {

    const key = await apiKey()
    const auth =  localStorage.getItem('access-token');

    const response = await axios({
        method: 'POST',
        // url: 'https://api.clarondoc.com/requests/tests/facility',
        url: 'https://api.clarondoc.com/requests/insurance/tests/facility',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })
    console.log(response,'fffffffff')
    return response.data.requestDetails
}

export const insuranceindividualLabRequest = async (data) => {

    try{
        const key = await apiKey()
        const auth = await localStorage.getItem('access-token');

        const response = await axios({
            method: 'POST',
            url: 'https://api.clarondoc.com/requests/insurance/tests/individual',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${auth}`,
                'x-api-key': key
            }
        })
        console.log(response.data)

        return response.data.requestDetails;
        
    }catch(e){
        console.log(e)
        return false
    }
}

export const insurancegetLabTests = async () => {
    const key = await apiKey()
    const auth = localStorage.getItem('access-token');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/tests`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data.tests
}

export const getLabTestIndividual = async (email) => {
    const key = await apiKey()
    const auth = localStorage.getItem('access-token');
    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/requests/tests/individual/users/${email}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}


export const getLabTestFacility = async (email) => {
    const key = await apiKey()

    const auth = localStorage.getItem('access-token');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/requests/tests/facility/users/${email}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data
}


