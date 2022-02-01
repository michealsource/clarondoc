import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');

export const requestHomeCare = async (data, token) => {

    const key = await apiKey()
    const auth = await AsyncStorage.getItem('access-token');

    const response = await axios({
        method: 'POST',
        url: 'https://api.clarondoc.com/requests/homeCare',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-payment-token': token,
            'x-api-key': key
        }
    })

    return response.data
}

export const getSymptoms = async () => {
    const key = await apiKey()
    const auth = await AsyncStorage.getItem('access-token');

    const response = await axios({
        method: 'GET',
        url: `https://api.clarondoc.com/symptoms`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'x-api-key': key
        }
    })

    return response.data.symptoms
}

export const apiKey = async () => {
    let key = await AsyncStorage.getItem('api-key');

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

        await AsyncStorage.setItem('api-key', key)

        return key
    }
}