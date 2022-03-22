import React, { useContext, useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
})

const db = getFirestore()
const auth = getAuth()
const colRef = collection(db, 'items')

const AppContext = React.createContext()
export const AppProvider = ({ children }) => {
    const [user, setUser] = useState()
    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })
    const [headerHeight, setHeaderHeight] = useState(0)
    const [scroll, setScroll] = useState(false)
    const [rerender, setRerender] = useState({})
    const [modal, setModal] = useState(false)
    const priceFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    const [productsData, setProductsData] = useState([])
    useEffect(() => {
        ;(async () => {
            try {
                let documentData = []
                const documents = await getDocs(colRef)
                documents.docs.forEach((item) => documentData.push(item.data()))
                setProductsData(documentData)
            } catch (error) {
                console.log(error)
            }
        })()
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
                user,
                setUser,
                modal,
                setModal,
                productsData,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext)
