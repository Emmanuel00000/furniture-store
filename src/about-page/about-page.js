import React from 'react'
import { Link } from 'react-router-dom'
import banner from './about-page-banner.jpg'
import './about-page.css'
import {
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaPinterest,
} from 'react-icons/fa'

const About = () => {
    return (
        <>
            <div className="productsHeader">
                <h1>
                    <Link to="/" className="backHome">
                        home
                    </Link>{' '}
                    / about
                </h1>
            </div>
            <main className="aboutMain">
                <div className="aboutImgContainer">
                    <img className="aboutImg" src={banner} alt="" />
                </div>
                <div>
                    <h1 className="aboutHeading">
                        our <span className="colorText">story</span>
                    </h1>
                    <div className="underline rmvCenter"></div>
                    <p className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloribus, magni? Dolores voluptatibus fuga velit
                        ratione deleniti! Fugiat sapiente sit aut aspernatur
                        modi dolore quas ab optio, suscipit voluptas sequi nobis
                        asperiores. Omnis mollitia consectetur ipsa nam magnam,
                        possimus, incidunt at quae eos deleniti fugit ea iste
                        eveniet beatae rem est. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Voluptatibus tenetur optio
                        fugit necessitatibus harum. Harum eum sit ad nihil,
                        voluptas cumque deleniti doloremque suscipit repellendus
                        nostrum asperiores vero, ea optio. Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Aliquam consequatur
                        distinctio deleniti saepe ad? Neque, voluptates id.
                        Dolore odio tempore, voluptatem animi ex aspernatur,
                        atque facere nisi accusamus suscipit minus?
                    </p>
                </div>
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

export default About
