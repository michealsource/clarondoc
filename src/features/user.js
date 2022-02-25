import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        value:{},
        cart: []
    },
    reducers:{
        LOGIN: (state,action)=>{
            state.value = action.payload
        },
        UPDATE: (state,action)=>{
            console.log(state.value,'sssssss')
            state.value.avatar = action.payload
        },
        UPDATEUSERINFO: (state,action)=>{
            state.value = action.payload
        },
        UPDATECARTINFO: (state,action)=>{
            state.cart.push(action.payload)
        },
        UPDATECARTQUANTITY: (state,action)=>{
            state.cart[state.cart.indexOf(state.cart.filter(d => d.drugId === action.payload.drugId)[0])].quantity += 1
            state.cart[state.cart.indexOf(state.cart.filter(d => d.drugId === action.payload.drugId)[0])].total +=  action.payload.drug.unitprice
            
        },
       
        REMOVEFROMCART: (state,action)=>{
            // console.log(action.payload, "payload")
            // console.log(state.cart, "pay")
            
            for(let i = 0; i < state.cart.length; i++){
                console.log(state.cart[i], "pay")
                if(state.cart[i].drugId === action.payload.id && state.cart[i].quantity > 1 || state.cart[i].drugId === action.payload.drugId && state.cart[i].quantity > 1){
                    state.cart[i].quantity -= 1
                    state.cart[i].total -= action.payload.drug.unitprice
                }else if(state.cart[i].drugId === action.payload.id && state.cart[i].quantity === 1 || state.cart[i].drugId === action.payload.drugId && state.cart[i].quantity === 1){
                    state.cart.splice(i, 1)
                }
            }
            // state.cart[state.cart.indexOf(state.cart.filter(d => d.drugId == action.payload.drugId)[0])].quantity -= 1
            // state.cart.splice(state.cart[action.payload.index], 1)
        },
    }
})
export const {LOGIN, UPDATE,UPDATEUSERINFO,UPDATECARTINFO,REMOVEFROMCART, UPDATECARTQUANTITY} = userSlice.actions
export default userSlice.reducer;