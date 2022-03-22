import React, { useRef, useEffect, useState, useReducer } from 'react'
import banner from './banner.jpg'
import './home-page.css'
import '../products-page/products-page.css'
import { GetProducts } from '../fetch/get-products'
import { MdHistoryEdu } from 'react-icons/md'
import { GiDiamondHard, GiCompass } from 'react-icons/gi'
import {
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaPinterest,
} from 'react-icons/fa'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const HomePage = () => {
    const { setHeaderHeight, scroll, productsData } = useGlobalContext()
    useEffect(() => {
        setHeaderHeight(header.current.getBoundingClientRect().height)
    })
    const featuredData = productsData.filter((item) => item.featured === true)
    const [count, setCount] = useState(-1)
    const reducer = (state, action) => {
        let newState
        if (action.type === 'SHIFT') {
            newState = featuredData.filter((_, index) => index > count)
        } else {
            throw new Error('no matching action type')
        }
        return newState
    }
    const [state, dispatch] = useReducer(reducer, featuredData)
    useEffect(() => {
        dispatch({ type: 'SHIFT' })
    }, [count])
    const header = useRef(null)

    return (
        <>
            <header ref={header}>
                <img className="banner" src={banner} alt="banner" />
                <div className="intro">
                    <h1>design your comfort zone</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Est veniam voluptate itaque a pariatur, eaque cumque
                        magnam impedit odit laudantium temporibus magni modi rem
                        dignissimos, quibusdam consequatur consectetur, atque
                        quod?
                    </p>
                    <Link to="./products">
                        <button
                            className="mainBtn"
                            type="button"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            shop now
                        </button>
                    </Link>
                </div>
            </header>

            <section className="featuredProducts">
                <h1>
                    featured <span className="colorText">products</span>
                </h1>
                <div className="underline"></div>
                <div
                    className="backIcon"
                    onClick={() => count >= 0 && setCount((value) => value - 1)}
                >
                    <IoIosArrowBack />
                </div>
                <div
                    className="forwardIcon"
                    onClick={() =>
                        featuredData.length - 4 > count &&
                        setCount((value) => value + 1)
                    }
                >
                    <IoIosArrowForward />
                </div>
                <div className="featuredProductsContainer">
                    <GetProducts data={state} />
                </div>
                <Link to="./products" className="removeLine">
                    <button type="button" onClick={() => window.scrollTo(0, 0)}>
                        all products
                    </button>
                </Link>
            </section>

            <section className={`goals ${scroll && 'goalsIndex'}`}>
                <div className="goalsTextContainer">
                    <h1>custom furniture built only for you</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odit, ea sit tenetur ullam architecto pariatur
                        necessitatibus perferendis dolore sequi recusandae a
                        officia, quibusdam nisi voluptatem vitae adipisci atque,
                        enim non.
                    </p>
                </div>
                <div className="goalsContainer">
                    <div>
                        <GiCompass className="icon" />
                        <h1>mission</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Deserunt aliquam impedit aliquid dolor ad,
                            suscipit modi tenetur, esse totam dicta dolorum,
                            ipsum libero! Vel accusantium repudiandae assumenda
                            nam omnis facilis.
                        </p>
                    </div>
                    <div>
                        <GiDiamondHard className="icon" />
                        <h1>vision</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repellendus necessitatibus ab quis molestiae
                            excepturi eum provident, velit id laboriosam
                            voluptatum at eveniet repudiandae, dicta, dolore
                            mollitia voluptates fugiat? Assumenda, odio.
                        </p>
                    </div>
                    <div>
                        <MdHistoryEdu className="icon" />
                        <h1>history</h1>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Recusandae accusantium exercitationem veniam
                            sit, excepturi rem sunt error consequatur illum quod
                            aspernatur quia itaque. Cumque in, quibusdam quis
                            eveniet temporibus laboriosam.
                        </p>
                    </div>
                </div>
            </section>

            <section className="lastSection">
                <div className="newsLetter">
                    <div>
                        <h1>Join our newsletter and get 20% off</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quia eligendi porro unde sequi dignissimos
                            explicabo, fuga beatae ratione enim. Doloremque,
                        </p>
                    </div>
                    <form>
                        <input type="text" placeholder="enter email" />
                        <button type="submit">subscribe</button>
                    </form>
                </div>
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
            </section>
        </>
    )
}

export default HomePage
