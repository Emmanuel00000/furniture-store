import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'
import { useGlobalContext } from '../context'
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
import { FaUserPlus, FaUser, FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
    const { headerHeight, scroll, setScroll, user, modal } = useGlobalContext()
    const displayName = user?.displayName
    const uid = user?.uid
    const nav = useRef(null)
    const location = useLocation()

    useEffect(() => {
        const navHeight = nav.current.getBoundingClientRect().height
        const handleScroll = () =>
            setScroll(window.pageYOffset > headerHeight - navHeight)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })
    const handleClass = () =>
        `${!(location.pathname === '/') && 'linkColor'} ${
            scroll && 'linkColor'
        }`
    const [cartVal, setCartVal] = useState(0)
    useEffect(() => {
        let unsub
        const getVal = (name, dbId) => {
            const colRef = collection(getFirestore(), name, dbId, 'cart-items')
            unsub = onSnapshot(colRef, (snapshot) => {
                const total = snapshot.docs.reduce((acc, curr) => {
                    acc += curr.data().count
                    return acc
                }, 0)
                setCartVal(total)
            })
        }
        if (user) {
            getVal('cart', uid)
        } else {
            getVal('temp-cart', localStorage.getItem('temp_id'))
        }
        return () => unsub()
    }, [uid, user])
    let userName = ''
    if (user) {
        for (const letter of user.email) {
            if (letter !== '@') {
                userName += letter
            } else {
                break
            }
        }
    }
    const [updateName, setUpdateName] = useState()
    useEffect(() => {
        setUpdateName(displayName)
    }, [displayName, modal])

    return (
        <nav
            ref={nav}
            className={`${!(location.pathname === '/') && 'navBackground'} ${
                scroll && 'navBackground'
            }`}
        >
            <h1 className="storeName">furniture univer</h1>
            <ul className="links">
                <li>
                    <Link
                        to="/"
                        className={`link ${handleClass()}`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/products"
                        className={`link ${handleClass()}`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        products
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        className={`link ${handleClass()}`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        about
                    </Link>
                </li>
            </ul>
            <div className="navIcons">
                <span className={`navIconText1 ${handleClass()}`}>cart</span>
                <Link to="/cart" className={`navIcon ${handleClass()}`}>
                    <div
                        className={`itemsInCart ${cartVal === 0 ? 'hide' : ''}`}
                    >
                        {cartVal}
                    </div>
                    <FaShoppingCart />
                </Link>
                <span className={`navIconText2 ${handleClass()}`}>
                    {user ? updateName || userName : 'login'}
                </span>
                <Link
                    to={user ? '/user-profile' : '/auth'}
                    className={`navIcon ${handleClass()}`}
                >
                    {user ? <FaUser /> : <FaUserPlus />}
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
