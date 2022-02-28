import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './single-product.css'
// import data from '../fetch/data'
import { UtilsFunc } from '../products-page/products-page-utils'

const SingleProduct = () => {
    const { data } = UtilsFunc()
    const { id } = useParams()
    const [currName, setCurrName] = useState('')
    useEffect(() => {
        const selectedProduct = data.find((item) => item.id === id)
        setCurrName(selectedProduct.name)
    }, [id, data])
    return (
        <>
            <div className="productsHeader">
                <h1>
                    <Link to="/" className="backHome">
                        home
                    </Link>
                    <span className="forwardSlash"> / </span>
                    <Link to="/products" className="toProducts">
                        products
                    </Link>
                    <span className="forwardSlash"> / </span>
                    {currName}
                </h1>
            </div>
            <main></main>
        </>
    )
}

export default SingleProduct
