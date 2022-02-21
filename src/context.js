import React, { useContext, useState } from 'react'

const AppContext = React.createContext()
export const AppProvider = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState(0)
    const [scroll, setScroll] = useState(false)
    return (
        <AppContext.Provider
            value={{
                headerHeight,
                setHeaderHeight,
                scroll,
                setScroll,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext)
