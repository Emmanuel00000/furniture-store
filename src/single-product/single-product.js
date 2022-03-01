import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './single-product.css'
// import data from '../fetch/data'
import fetchData from '../fetch/fetch-data'
import { useGlobalContext } from '../context'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { UtilsFunc } from '../products-page/products-page-utils'
const singleProductUrl = 'https://course-api.com/react-store-single-product?id='

const SingleProduct = () => {
    const { priceFormat } = UtilsFunc()
    const { productsData: data } = useGlobalContext()
    const { id } = useParams()
    const [count, setCount] = useState(1)
    const [currName, setCurrName] = useState('')
    useEffect(() => {
        const selectedProduct = data.find((item) => item.id === id)
        setCurrName(selectedProduct.name)
    }, [id, data])

    const [singleProdData, setSingleProdData] = useState([])
    useEffect(() => {
        const valueFunc = async () => {
            const value = await fetchData(`${singleProductUrl}${id}`)
            setSingleProdData(value)
        }
        valueFunc()
    }, [id])
    if (singleProdData.length <= 0) return null

    const {
        images,
        name,
        stars,
        reviews,
        price,
        description,
        stock,
        id: sku,
        company,
        colors,
    } = singleProdData

    const ShowStars = () =>
        Array.from({ length: 5 }, (_, index) => (
            <span className="stars" key={index}>
                {stars >= index + 1 ? (
                    <BsStarFill />
                ) : stars >= index + 0.5 ? (
                    <BsStarHalf />
                ) : (
                    <BsStar />
                )}
            </span>
        ))

    const ShowColors = () =>
        colors.map((color, index) => (
            <button
                key={index}
                type="button"
                id="color"
                className={`color`}
                style={{ background: color }}
            ></button>
        ))

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
            <main className="prodContents">
                <div>
                    <div className="mainProdImgContainer">
                        <img
                            className="mainProdImg"
                            src={images[0].thumbnails.large.url}
                            alt=""
                        />
                    </div>
                    <div className="smallImgContainer">
                        {images.map((item, index) => (
                            <div className="prodImgContainer" key={index}>
                                <img
                                    className="prodImg"
                                    src={item.thumbnails.large.url}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="productName">{name}</h1>
                    <div>
                        <ShowStars />
                        <span className="reviews">{`(${reviews} customer reviews)`}</span>
                    </div>
                    <h3 className="prodPrice">
                        {priceFormat.format(price / 100)}
                    </h3>
                    <p className="description">{description}</p>
                    <div className="detailsContainer">
                        <span className="details">available :</span>
                        <span>{stock > 0 ? 'in stock' : 'out of stock'}</span>
                        <span className="details">sku :</span>
                        <span>{sku}</span>
                        <span className="details">brand :</span>
                        <span>{company}</span>
                    </div>
                    <div className="prodUnderline"></div>
                    <div className="prodColors">
                        <span>colors :</span>
                        <span>
                            <ShowColors />
                        </span>
                    </div>
                    <div className="addProd">
                        <button
                            type="button"
                            className="amountIcon"
                            onClick={() =>
                                count > 1
                                    ? setCount((value) => value - 1)
                                    : setCount(1)
                            }
                        >
                            <BiMinus />
                        </button>
                        <span className="prodAmount">{count}</span>
                        <button
                            type="button"
                            className="amountIcon"
                            onClick={() =>
                                count < stock && setCount((value) => value + 1)
                            }
                        >
                            <BiPlus />
                        </button>
                    </div>
                    <button type="button" className="toCart">
                        add to cart
                    </button>
                </div>
            </main>
        </>
    )
}

export default SingleProduct
