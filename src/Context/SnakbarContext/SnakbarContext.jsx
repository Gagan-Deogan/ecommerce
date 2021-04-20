import React , { createContext, useReducer, useContext } from "react"

const SnakbarContext = createContext();

const snakbarReducer = (state, action) =>{
    switch(action.type){
        case("INITAIL"):
            return { isShow:false, alertType:'' };
        case("DEFAULT"):
            return { isShow:true, alertType:"DEFAULT", msg: action.payload };
        case("ERROR"):
            return { isShow:true, alertType:"ERROR", msg: action.payload };
        case("WARNING"):
            return { isShow:true, alertType:"WARNING", msg: action.payload };
        case("SUCCESS"):
            return { isShow:true, alertType:"SUCCESS", msg: action.payload };
        default: 
            return state;
    }
}
const intialSnakbar =  { isShow:false, alertType:'', msg:'' }

export const SnakbarContextProvider = ( { children } ) =>{
    const [ snakbarStatus, snakbarDispatch ] = useReducer( snakbarReducer, intialSnakbar ) 

    return(
        <SnakbarContext.Provider
            value={{
                snakbarStatus,
                snakbarDispatch
            }}
        >
            {children}
        </SnakbarContext.Provider>
    )
}
export const useSnakbarContext = () =>{
    return useContext(SnakbarContext);
}