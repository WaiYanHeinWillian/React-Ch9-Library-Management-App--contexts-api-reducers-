//themecontext
import { createContext, useReducer } from "react";

const ThemeContext=createContext();

//themecontextprovider component

let ThemeReducer=(state,action)=>{
    switch(action.type){
        case "CHANGE_THEME" :
            return {...state , theme : action.payload};
        default :
        return state;
    };
    
}

const ThemeContextPorvider = ({children})=>{

    let [state,dispatch]=useReducer(ThemeReducer,{
        theme:'light'
    })  //state = theme:'light' , dispatch = ThemeReducer

    let changeTheme=(theme)=>{
        //action -> type + payload ->{type,payload}
        dispatch({type : 'CHANGE_THEME' , payload : theme})
    }

    return (
        <ThemeContext.Provider value={{...state,changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext , ThemeContextPorvider}
