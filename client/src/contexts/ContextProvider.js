import React, { createContext, useContext, useState } from "react";

const StateContext = createContext()

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [activeTitle, setActiveTitle] = useState('Dashboard')

    return (
        <StateContext.Provider
            value={{ activeMenu, setActiveMenu, activeTitle, setActiveTitle }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)