import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');

export const fetchNotifications = async () => {

    const key = await apiKey()
    const auth = await AsyncStorage.getItem('access-token');
    const email = await AsyncStorage.getItem('email');

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