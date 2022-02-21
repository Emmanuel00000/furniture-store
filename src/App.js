import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './home-page/home-page'
import Products from './products-page/products-page'
import Navbar from './navbar/navbar'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="*" element={<h1>error, invalid url</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
