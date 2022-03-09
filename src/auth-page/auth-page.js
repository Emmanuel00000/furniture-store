import React, { useState } from 'react'
import './auth-page.css'
import authLoading from './auth-loading.gif'
import { MdOutlineClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth'

initializeApp({
    apiKey: 'AIzaSyDWyTjIxEojn6tznsYv4FXO-TP2vjoQyN0',
    authDomain: 'furniture-store-development.firebaseapp.com',
    projectId: 'furniture-store-development',
})
const auth = getAuth()

const AuthPage = () => {
    const { setUser } = useGlobalContext()
    const navigate = useNavigate()
    // navigate(-1, { replace: true })
    const [isLogin, setIsLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('')
    const [isVerified, setIsVerified] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const timeoutHandler = () =>
        setTimeout(() => {
            setMessage('')
            setColor('')
            setIsVerified(true)
        }, 10000)
    const submitHandler = (e) => {
        e.preventDefault()
        ;(async () => {
            try {
                if (isLogin) {
                    setEmail('')
                    setIsLoading(true)
                    await signInWithEmailAndPassword(auth, email, password)
                    setIsLoading(false)
                    if (auth.currentUser.emailVerified) {
                        navigate(-1, { replace: true })
                        setUser(auth.currentUser)
                        // setPersistence(auth, browserLocalPersistence)
                    } else {
                        setMessage(
                            'please verify your email in order to log in'
                        )
                        setColor('red')
                        timeoutHandler()
                        setIsVerified(false)
                    }
                    console.log(auth.currentUser)
                } else {
                    if (password === confirmPassword) {
                        setEmail('')
                        setIsLoading(true)
                        await createUserWithEmailAndPassword(
                            auth,
                            email,
                            password
                        )
                        setIsLoading(false)
                        setColor('green')
                        setMessage('check your email for a verification link')
                        await sendEmailVerification(auth.currentUser)
                        let interval = setInterval(async () => {
                            if (auth.currentUser.emailVerified) {
                                clearInterval(interval)
                                navigate(-1, { replace: true })
                                setUser(auth.currentUser)
                            }
                            await auth.currentUser.reload()
                        }, 2000)
                    } else {
                        setMessage(
                            `Error: password and confirmation password don't match`
                        )
                        setColor('red')
                        timeoutHandler()
                    }
                }
            } catch (error) {
                setIsLoading(false)
                const errorMessage = error.message.toString()
                const final = errorMessage.slice(10)
                setMessage(final)
                setColor('red')
                timeoutHandler()
            }
        })()
        setPassword('')
        setConfirmPassword('')
    }
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         setPersistence(auth, browserLocalPersistence)
    //     }
    // })

    return (
        <>
            <section
                className={`authMain ${
                    isLogin ? 'authZIndex2' : 'authZIndex1'
                }`}
            >
                <form className="authForm" onSubmit={submitHandler}>
                    <span
                        className="authClose"
                        onClick={() => navigate(-1, { replace: true })}
                    >
                        <MdOutlineClose />
                    </span>
                    <p
                        className={`authMessage ${
                            color === 'red'
                                ? 'authMessageRed'
                                : color === 'green'
                                ? 'authMessageGreen'
                                : ''
                        }`}
                    >
                        {message}
                    </p>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">
                        {isLoading ? (
                            <div className="authLoadingContainer">
                                <img
                                    className="authLoading"
                                    src={authLoading}
                                    alt=""
                                />
                            </div>
                        ) : (
                            'sign up'
                        )}
                    </button>
                    <p className="switchAuth">
                        already signed up?{' '}
                        <button type="button" onClick={() => setIsLogin(true)}>
                            log in
                        </button>
                    </p>
                </form>
            </section>

            <section
                className={`authMain ${
                    isLogin ? 'authZIndex1' : 'authZIndex2'
                }`}
            >
                <form className="authForm" onSubmit={submitHandler}>
                    <span
                        className="authClose"
                        onClick={() => navigate(-1, { replace: true })}
                    >
                        <MdOutlineClose />
                    </span>
                    <p
                        className={`authMessage ${
                            color === 'red'
                                ? 'authMessageRed'
                                : color === 'green'
                                ? 'authMessageGreen'
                                : ''
                        }`}
                    >
                        {message}
                        <button
                            className={`msgBtn ${isVerified ? 'hide' : ''}`}
                            onClick={async () =>
                                await sendEmailVerification(auth.currentUser)
                            }
                        >
                            resend verification email
                        </button>
                    </p>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">
                        {isLoading ? (
                            <div className="authLoadingContainer">
                                <img
                                    className="authLoading"
                                    src={authLoading}
                                    alt=""
                                />
                            </div>
                        ) : (
                            'log in'
                        )}
                    </button>
                    <p className="switchAuth">
                        don't have an account?{' '}
                        <button type="button" onClick={() => setIsLogin(false)}>
                            sign up
                        </button>
                    </p>
                </form>
            </section>
        </>
    )
}

export default AuthPage
