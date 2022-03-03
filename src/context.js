import React, { useContext, useState, useEffect } from 'react'
import fetchData from './fetch/fetch-data'

const AppContext = React.createContext()
export const AppProvider = ({ children }) => {
    const [headerHeight, setHeaderHeight] = useState(0)
    const [scroll, setScroll] = useState(false)
    const [rerender, setRerender] = useState({})
    const priceFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    const [productsData, setProductsData] = useState([])
    const productsUrl = 'https://course-api.com/react-store-products'
    useEffect(() => {
        const valueFunc = async () => {
            const value = await fetchData(productsUrl)
            setProductsData(value)
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
                rerender,
                setRerender,
                priceFormat,
                productsData,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext)
