import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    setDoc,
    onSnapshot,
} from 'firebase/firestore'
import './single-product.css'
import { useGlobalContext } from '../context'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { ShowStars, ShowColors } from './single-product-utils'

const db = getFirestore()
const colRef = collection(db, 'singleItems')
const colRef2 = collection(db, 'cart')

const SingleProduct = () => {
    const { productsData: data, priceFormat } = useGlobalContext()
    const { id } = useParams()
    const [singleProdData, setSingleProdData] = useState([])
    const [selectedColor, setSelectedColor] = useState()
    useEffect(() => {
        ;(async () => {
            const singleDoc = doc(colRef, id)
            const getSingleDoc = await getDoc(singleDoc)
            const value = getSingleDoc.data()
            setSingleProdData(value)
            setSelectedColor(
                value.colors.filter((_, index) => index === 0).toString()
            )
        })()
    }, [id])
    const [isInCart, setIsInCart] = useState(false)
    const [count, setCount] = useState(1)
    useEffect(() => {
        const unsub = onSnapshot(colRef2, async (snapshot) => {
            const docSnap = await getDoc(doc(colRef2, id))
            if (docSnap.exists()) {
                const { count, colorIndex } = docSnap.data()
                setCount(count)
                setColorIndex(colorIndex)
                setIsInCart(docSnap.exists())
            }
        })
        return () => unsub()
    }, [id])
    const [colorIndex, setColorIndex] = useState(0)
    const [imgIndex, setImgIndex] = useState(0)
    if (singleProdData.length <= 0 && !selectedColor) return null
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
    const cartFunc = () => {
        if (stock > 0) {
            ;(async () => {
                await setDoc(doc(colRef2, id), {
                    singleProdData,
                    selectedColor,
                    count,
                    colorIndex,
                    stock,
                })
            })()
        }
    }

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
                    {data.find((item) => item.id === id).name}
                </h1>
            </div>
            <main className="prodContents">
                <div>
                    <div className="mainProdImgContainer">
                        <img
                            className="mainProdImg"
                            src={images[imgIndex].thumbnails.large.url}
                            alt=""
                        />
                    </div>
                    <div className="smallImgContainer">
                        {images.map((item, index) => (
                            <div
                                className={`prodImgContainer ${
                                    index === imgIndex && 'prodImgOutline'
                                }`}
                                key={index}
                                onClick={() => setImgIndex(index)}
                            >
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
                        <ShowStars stars={stars} />
                        <span className="reviews">{`(${reviews} customer reviews)`}</span>
                    </div>
                    <h3 className="prodPrice">
                        {priceFormat.format(price / 100)}
                    </h3>
                    <p className="description">{description}</p>
                    <div className="detailsContainer">
                        <span className="details">available :</span>
                        <span className={`caps ${stock === 0 && 'noStock'}`}>
                            {stock > 0 ? 'in stock' : 'out of stock'}
                        </span>
                        <span className="details">sku :</span>
                        <span>{sku}</span>
                        <span className="details">brand :</span>
                        <span className="caps">{company}</span>
                    </div>
                    <div className="prodUnderline"></div>
                    <div className="prodColors">
                        <span>colors :</span>
                        <span>
                            <ShowColors
                                colors={colors}
                                colorIndex={colorIndex}
                                setColorIndex={setColorIndex}
                                setSelectedColor={setSelectedColor}
                            />
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
                        <span className="prodAmount">
                            {stock > 0 ? count : 0}
                        </span>
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
                    <button
                        type="button"
                        className={`toCart ${isInCart && 'cartBtnColor'}`}
                        onClick={cartFunc}
                    >
                        {isInCart ? 'edit cart' : 'add to cart'}
                    </button>
                </div>
            </main>
        </>
    )
}

export default SingleProduct
