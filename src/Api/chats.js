
const axios = require('axios');
export const fetchConversation = async (from, to) => {
    const key = await apiKey()
    const auth = localStorage.getItem('access-token');

    try{
        const response = await axios({
            method: 'GET',
            url: `https://api.clarondoc.com/chats/conversations/between/${from}/and/${to}?limit=10000`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`,
                'x-api-key': key
            }
        })

        if(response.data.success){
            return response.data.chats
        }else{
            return []
        }
    }catch(e){
        return []
    }
}

export const sendMessage = async (data)=>{
    try{

        let key = await apiKey()
        let token = localStorage.getItem('access-token')
        let res = await axios.post(`https://api.clarondoc.com/chats`, data, {
            headers: {
                'x-api-key': key,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${token}`
            }
        })

        return res.data.success

    }catch(e){
        return false
    }
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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
            }
        })

        key = response.data.apiKey

        localStorage.getItem('api-key', key)

        return key
    }
}