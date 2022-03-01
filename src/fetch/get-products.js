import React from 'react'
import { Link } from 'react-router-dom'
import { UtilsFunc } from '../products-page/products-page-utils'

export const GetProducts = ({ data }) => {
    const { priceFormat } = UtilsFunc()
    return (
        <>
            {data.map((product) => {
                const { id, image, name, price, company } = product
                return (
                    <div key={id}>
                        <Link to={`/single-product/${id}`}>
                            <div className="productsImgContainer">
                                <img
                                    className="productsImg"
                                    src={image}
                                    alt=""
                                />
                            </div>
                        </Link>
                        <div className="namePriceContainer">
                            <h4 className="name">{name}</h4>
                            <p className="price">
                                {priceFormat.format(price / 100)}
                            </p>
                        </div>
                        <p className="company">{company}</p>
                    </div>
                )
            })}
        </>
    )
}
