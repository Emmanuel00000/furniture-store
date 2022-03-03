import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './home-page/home-page'
import Products from './products-page/products-page'
import Navbar from './navbar/navbar'
import SingleProduct from './single-product/single-product'
import Cart from './cart-page/cart-page'
import About from './about-page/about-page'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/single-product/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
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
