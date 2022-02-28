import React, { useContext, useState, useEffect } from 'react'
import fetchData from './fetch/fetch-data'

const AppContext = React.createContext()
export const AppProvider = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState(0)
    const [scroll, setScroll] = useState(false)
    const [productsData, setProductsData] = useState([])
    const productsUrl = 'https://course-api.com/react-store-products'
    useEffect(() => {
        const valueFunc = async () => {
            const value1 = await fetchData(productsUrl)
            setProductsData(value1)
        }
        valueFunc()
    }, [])
    if (productsData.length <= 0) return null
    return (
        <AppContext.Provider
            value={{
                headerHeight,
                setHeaderHeight,
                scroll,
                setScroll,
                productsData,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext)
