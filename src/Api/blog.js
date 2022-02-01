import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');

export const fetchArticles = async (from, to) => {

    const key = await apiKey()
    const auth = await AsyncStorage.getItem('access-token');

    try{
        const response = await axios({
            method: 'GET',
            url: `https://api.clarondoc.com/articles`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`,
                'x-api-key': key
            }
        })

        if(response.data.success){
            return response.data.articles
        }else{
            return []
        }
    }catch(e){
        return []
    }
}

export const mediumPosts = async()=>{
    
    let response = await axios({
        method: 'GET',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@clarondoc',
    })

    return response.data.items
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