import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    user:null,
    // storage: null,
    isFetching:false,
    error:false
}
export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider =({children})=>{
    const[state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    return(
        <AuthContext.Provider
        value={{
            company:"learnit",
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}