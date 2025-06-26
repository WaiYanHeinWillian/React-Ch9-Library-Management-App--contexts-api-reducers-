import { createContext, useEffect } from "react";

let AuthContext = createContext();

import React from 'react'

export default function AuthContextProvider({children}) {
  return (
    <AuthContext.Provider value={{ user:"wyh" }}>
        {children}
    </AuthContext.Provider>
  )
}

export {AuthContext,AuthContextProvider}
