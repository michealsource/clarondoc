import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        value:{},
        cart: [],
        notifications: []
    },
    reducers:{
        LOGIN: (state,action)=>{
            state.value = action.payload
        },
        LOGOUT:(state)=>{
            state.value ={}
        },
        UPDATE: (state,action)=>{
            state.value.avatar = action.payload
        },

        UPDATESUB: (state,action)=>{
            state.value.subscription = action.payload
        },

        UPDATEUSERINFO: (state,action)=>{
            state.value = action.payload
        },
        UPDATECARTINFO: (state,action)=>{
            state.cart.push(action.payload)
        },

        CLEARCARTINFO: (state,action)=>{
            state.cart = []
        },
        UPDATECARTQUANTITY: (state,action)=>{
            state.cart[state.cart.indexOf(state.cart.filter(d => d.drugId === action.payload.drugId)[0])].quantity += 1
            state.cart[state.cart.indexOf(state.cart.filter(d => d.drugId === action.payload.drugId)[0])].total +=  action.payload.drug.unitprice
            
        },
        REMOVEFROMCART: (state,action)=>{
            
            for(let i = 0; i < state.cart.length; i++){
                console.log(state.cart[i], "pay")
                if(state.cart[i].drugId === action.payload.id && state.cart[i].quantity > 1 || state.cart[i].drugId === action.payload.drugId && state.cart[i].quantity > 1){
                    state.cart[i].quantity -= 1
                    state.cart[i].total -= action.payload.drug.unitprice
                }else if(state.cart[i].drugId === action.payload.id && state.cart[i].quantity === 1 || state.cart[i].drugId === action.payload.drugId && state.cart[i].quantity === 1){
                    state.cart.splice(i, 1)
                }
            }
        },

        NOTIFICATIONS: (state,action)=>{
            state.notifications = action.payload
        },
    }
})
export const {LOGIN,LOGOUT,UPDATE,UPDATESUB,UPDATEUSERINFO,UPDATECARTINFO,REMOVEFROMCART, UPDATECARTQUANTITY, NOTIFICATIONS,CLEARCARTINFO} = userSlice.actions
export default userSlice.reducer;