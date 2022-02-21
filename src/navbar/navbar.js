import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'
import { useGlobalContext } from '../context'

const Navbar = () => {
    const { headerHeight, scroll, setScroll } = useGlobalContext()
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
        `link ${!(location.pathname === '/') && 'linkColor'} ${
            scroll && 'linkColor'
        }`

    return (
        <nav
            ref={nav}
            className={`${!(location.pathname === '/') && 'navBackground'} ${
                scroll && 'navBackground'
            }`}
        >
            <h1 className="storeName">furniture universe</h1>
            <ul className="links">
                <li>
                    <Link
                        to="/"
                        className={handleClass()}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/products"
                        className={handleClass()}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        products
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
