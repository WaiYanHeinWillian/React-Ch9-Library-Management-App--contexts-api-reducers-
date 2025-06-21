//themecontext
import { createContext } from "react";

const ThemeContext=createContext();

//themecontextprovider component
const ThemeContextPorvider = ({children})=>{
    return (
        <ThemeContext.Provider value={{ theme:'dark' }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext , ThemeContextPorvider}
