import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cart-page.css'
import { useGlobalContext } from '../context'
import { CartItems } from './cart-items'
import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    deleteDoc,
} from 'firebase/firestore'
import {
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaPinterest,
} from 'react-icons/fa'

const colRef = collection(getFirestore(), 'cart')

const Cart = () => {
    const { priceFormat } = useGlobalContext()
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        const unsub = onSnapshot(colRef, (snapshot) => {
            const total = snapshot.docs.reduce((acc, curr) => {
                const { count, singleProdData } = curr.data()
                acc += count * singleProdData.price
                return acc
            }, 0)
            setTotalPrice(total)
        })
        return () => unsub()
    }, [])
    const deleteCart = () => {
        const unsub = onSnapshot(colRef, (snapshot) => {
            snapshot.docs.forEach((item) => {
                const docRef = doc(colRef, item.data().singleProdData.id)
                ;(async () => {
                    try {
                        await deleteDoc(docRef)
                    } catch (error) {
                        console.log(error)
                    }
                })()
            })
            unsub()
        })
    }

    return (
        <>
            <div className="productsHeader">
                <h1>
                    <Link to="/" className="backHome">
                        home
                    </Link>
                    <span className="forwardSlash"> / </span>
                    cart
                </h1>
            </div>
            <main className="cartBody">
                <div className="cartHeadings">
                    <p>item</p>
                    <p>price</p>
                    <p>quantity</p>
                    <p>subtotal</p>
                </div>
                <div className="cartUnderline"></div>
                <CartItems />
                <div className="cartUnderline"></div>
                <div className="shopAndClr">
                    <Link to="/products">
                        <button className="contShopping" type="button">
                            continue shopping
                        </button>
                    </Link>
                    <button
                        className="clrCart"
                        type="button"
                        onClick={deleteCart}
                    >
                        clear cart
                    </button>
                </div>
                <div className="totalContainer">
                    <div className="totalSection subTotal">
                        <p>subtotal :</p>
                        <p className="priceColor">
                            {priceFormat.format(
                                totalPrice > 534 ? (totalPrice - 534) / 100 : 0
                            )}
                        </p>
                    </div>
                    <div className="totalSection">
                        <p>shipping fee :</p>
                        <p className="priceColor">
                            {priceFormat.format(
                                totalPrice > 534 ? 534 / 100 : 0
                            )}
                        </p>
                    </div>
                    <div className="cartUnderline"></div>
                    <div className="totalSection orderTotal">
                        <p>order total :</p>
                        <p className="priceColor">
                            {priceFormat.format(totalPrice / 100)}
                        </p>
                    </div>
                </div>
                <button className="cartLogin" type="button">
                    login
                </button>
            </main>
            <footer>
                <FaFacebookF className="socialIcon" />
                <FaInstagram className="socialIcon" />
                <FaTwitter className="socialIcon" />
                <FaPinterest className="socialIcon" />
                <p>
                    &copy; {new Date().getFullYear()}{' '}
                    <span>furniture universe</span> all rights reserved
                </p>
            </footer>
        </>
    )
}

export default Cart
