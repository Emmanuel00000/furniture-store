import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useGlobalContext } from './context'
import HomePage from './home-page/home-page'
import Products from './products-page/products-page'
import Navbar from './navbar/navbar'
import SingleProduct from './single-product/single-product'
import Cart from './cart-page/cart-page'
import About from './about-page/about-page'
import AuthPage from './auth-page/auth-page'
import Checkout from './checkout-page/checkout-page'
import UserProfile from './user-profile/user-profile'

function App() {
    const { user } = useGlobalContext()
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/single-product/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                    path="/checkout"
                    element={user ? <Checkout /> : <Navigate replace to="/" />}
                />
                <Route
                    path="/user-profile"
                    element={user ? <UserProfile /> : <Navigate replace to="/" />}
                />
                <Route
                    path="*"
                    element={
                        <h1
                            style={{
                                color: 'red',
                                marginTop: '45vh',
                                textAlign: 'center',
                                letterSpacing: '2px',
                            }}
                        >
                            error, invalid url
                        </h1>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
