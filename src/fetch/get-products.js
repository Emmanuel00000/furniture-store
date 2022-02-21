import React from 'react'
import { priceFormat } from '../products-page/products-page-utils'

export const GetProducts = ({ data }) => {
    return (
        <>
            {data.map((product) => {
                const { id, image, name, price, company } = product
                return (
                    <div key={id}>
                        <div className="productsImgContainer">
                            <img className="productsImg" src={image} alt="" />
                        </div>
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
