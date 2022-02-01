
const axios = require('axios');
// import { usePaystackPayment } from 'react-paystack';


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
                    'Authorization': `Bearer sk_test_b99f2f6df4585689836cad3d63d8b1d145789934`
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