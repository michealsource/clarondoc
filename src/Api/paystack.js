
// const axios = require('axios');
// // import { usePaystackPayment } from 'react-paystack';


// const getUser = async()=>{
//     let account = await localStorage.getItem('user')
//     return JSON.parse(account)
// }

// export const initPayment = async(price, phone, network)=>{
//     let user = await getUser()

//     let response

//     try{
//         let res = await axios.default.post('https://api.paystack.co/charge', {
//                 "amount": price*100, 
//                 "email": `${user.email}`,
//                 "firstname": `${user.firstname}`,
//                 "lastname": `${user.lastname}`,
//                 "currency": "GHS",
//                 "plan": 'PLN_2lw4dvg8vkv2aro',
//                 "mobile_money": {
//                     "phone" : `${phone}`,
//                     "provider" : `${network.toUpperCase()}`
//                 }
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer sk_test_b99f2f6df4585689836cad3d63d8b1d145789934`
//                 }
//             }
//         )
//         response = res.data
//     }catch(e){
//         try{
//             response = e.response.data
//         }catch(e){
//             response = null
//         }
//     }

//     return response
// }

// export const initiatCardPayment = async(data) => {

//     const config = {
//         reference: (new Date()).getTime().toString(),
//         email: data.email,
//         amount: data.amount,
//         publicKey: 'sk_test_b99f2f6df4585689836cad3d63d8b1d145789934',
//     };
    
//     // you can call this function anything
//     const onSuccess = (reference) => {
//       // Implementation for whatever you want to do with reference and after success call.
//       console.log(reference);
//     };
  
//     // you can call this function anything
//     const onClose = () => {
//       // implementation for  whatever you want to do when the Paystack dialog closed.
//       console.log('closed')
//     }

//     const initializePayment = usePaystackPayment(config);

//     return initializePayment(onSuccess, onClose)

// }



const axios = require('axios');

const sk_key = "sk_test_b99f2f6df4585689836cad3d63d8b1d145789934";
// const sk_key = "sk_live_10b0401836f2ba502abc0ee39c1264797d5e0213";

const getUser = async()=>{
    let account = await localStorage.getItem('user')
    return JSON.parse(account)
}

export const initPayment = async(price, phone, network)=>{
    let user = await getUser()

    let response

    try{
        let res = await axios.default.post('https://api.paystack.co/charge', {
                "amount": price*100, 
                "email": `${user.email}`,
                "firstname": `${user.firstname}`,
                "lastname": `${user.lastname}`,
                "currency": "GHS",
                "plan": 'PLN_2lw4dvg8vkv2aro',
                "mobile_money": {
                    "phone" : `${phone}`,
                    "provider" : `${network.toUpperCase()}`
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${sk_key}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            }
        )
        response = res.data
    }catch(e){
        try{
            response = e.response.data
        }catch(e){
            response = null
        }
    }

    return response
}



export const verOtp = async(tnx_ref, otp)=>{
    let user = await getUser()

    let response

    try{
        let res = await axios.default.post('https://api.paystack.co/charge/submit_otp', {
                "reference": tnx_ref, 
                "otp": `${otp}`,
            },
            {
                headers: {
                    'Authorization': `Bearer ${sk_key}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            }
        )
        response = res.data
    }catch(e){
        try{
            response = e.response.data
        }catch(e){
            response = null
        }
    }

    return response
}

export const cardPayment = async(card, amount)=>{
    let user = await getUser()
    let email = user.email;

    // console.log(card)
    // console.log(amount)
    // console.log(email)

    let response

    try{
        let res = await axios.default.post('https://api.paystack.co/charge', {
                "amount": amount*100, 
                "email": `${email}`,
                "pin": `${card.pin}`,
                "card": {
                    "cvv": card.cvv,
                    "number": card.number,
                    "expiry_month": card.month,
                    "expiry_year": card.year,
                },
                "custom_fields": [
                    {
                    "value": "Payment:"+(Math.floor(Math.random() * 100) + 1)+(Math.floor(Math.random() * 100) + 1)+(Math.floor(Math.random() * 100) + 1),
                    "display_name": "Payment entry --"+(Math.floor(Math.random() * 100) + 1),
                    "variable_name": "Payment entry _for"+(Math.floor(Math.random() * 100) + 1)
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${sk_key}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            }
        )
        response = res.data
    }catch(e){
        try{
            response = e.response.data
        }catch(e){
            response = null
        }
    }

    return response
}

export const Upgrade_sub = async(plan, end)=>{
    const key = await apiKey()
    const auth = await localStorage.getItem('access-token');
    let user = await getUser()
    let email = user.email;

    const response = await axios({
        method: 'PUT',
        url: `https://api.clarondoc.com/subscriptions/upgrade`,
        data: {
            email: email,
            plan: plan,
            end: end
        },
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

        await localStorage.setItem('api-key', key)

        return key
    }
}