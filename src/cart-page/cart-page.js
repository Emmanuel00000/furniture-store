import React from 'react'
import { Link } from 'react-router-dom'
import './cart-page.css'
// import { UtilsFunc } from '../products-page/products-page-utils'
import { useGlobalContext } from '../context'
import { CartItems } from './cart-items'
import {
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaPinterest,
} from 'react-icons/fa'

const Cart = () => {
    // const { priceFormat } = UtilsFunc()
    const { priceFormat } = useGlobalContext()
    const totalPrice = () => {
        const total = Object.keys(localStorage).reduce((acc, curr) => {
            const { count, singleProdData } = JSON.parse(
                localStorage.getItem(curr)
            )
            acc += count * singleProdData.price
            return acc
        }, 0)
        return total
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
                    <button className="clrCart" type="button">
                        clear cart
                    </button>
                </div>
                <div className="totalContainer">
                    <div className="totalSection subTotal">
                        <p>subtotal :</p>
                        <p className="priceColor">
                            {priceFormat.format((totalPrice() - 534) / 100)}
                        </p>
                    </div>
                    <div className="totalSection">
                        <p>shipping fee :</p>
                        <p className="priceColor">
                            {priceFormat.format(534 / 100)}
                        </p>
                    </div>
                    <div className="cartUnderline"></div>
                    <div className="totalSection orderTotal">
                        <p>order total :</p>
                        <p className="priceColor">
                            {priceFormat.format(totalPrice() / 100)}
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
