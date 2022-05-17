import React from 'react'
import { Link } from 'react-router-dom'
import './cart-page.css'
import { useGlobalContext } from '../context'
import { CartItems } from './cart-items'
import CartPageUtils from './cart-page-utils'
import {
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaPinterest,
} from 'react-icons/fa'

const Cart = () => {
    const { user, priceFormat, totalPrice } = useGlobalContext()
    const { deleteCart, toPayment } = CartPageUtils()

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
                            {priceFormat.format(totalPrice / 100)}
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
                            {priceFormat.format(
                                totalPrice > 534 ? (totalPrice + 534) / 100 : 0
                            )}
                        </p>
                    </div>
                </div>
                <Link
                    to={!user && '/auth'}
                    className="cartLogin"
                    type="button"
                    onClick={() => {
                        if (user) {
                            toPayment()
                        }
                    }}
                >
                    {user ? 'checkout' : 'login'}
                </Link>
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
