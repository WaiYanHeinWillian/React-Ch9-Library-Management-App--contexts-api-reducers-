//themecontext
import { createContext } from "react";

const ThemeContext=createContext();

//themecontextprovider component
const ThemeContextPorvider = ({children})=>{
    return (
        <ThemeContext.Provider value={{ theme:'light' }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext , ThemeContextPorvider}
