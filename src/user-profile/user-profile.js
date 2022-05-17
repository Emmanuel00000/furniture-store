import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './user-profile.css'
import { useGlobalContext } from '../context'
import {
    getAuth,
    updateProfile,
    updatePassword,
    signOut,
    deleteUser,
} from 'firebase/auth'
import {
    FaEdit,
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaPinterest,
} from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import authLoading from '../auth-page/auth-loading.gif'

const auth = getAuth()

const UserProfile = () => {
    const { user, modal, setModal, setUser } = useGlobalContext()
    const { email, displayName } = user
    let userName = ''
    for (const letter of user.email) {
        if (letter !== '@') {
            userName += letter
        } else {
            break
        }
    }
    const [edit, setEdit] = useState('')
    const [input, setInput] = useState({
        name: '',
        newPass: '',
        confPass: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    const [timer, setTimer] = useState(false)

    const timerFunc = () =>
        setTimeout(() => {
            setTimer(false)
            setErrorMsg()
        }, 5000)

    const submitHandler = (e) => {
        e.preventDefault()
        const { name, newPass, confPass } = input
        if (edit === 'name') {
            if (name.length <= 15) {
                ;(async () => {
                    try {
                        setIsLoading(true)
                        await updateProfile(auth.currentUser, {
                            displayName: name,
                        })
                        setModal(false)
                        setIsLoading(false)
                    } catch (error) {
                        console.log(error)
                    }
                })()
            } else {
                setErrorMsg('maximum character length is 15')
                setTimer(true)
                timerFunc()
            }
        } else if (edit === 'password') {
            if (newPass === confPass) {
                ;(async () => {
                    try {
                        setIsLoading(true)
                        await updatePassword(auth.currentUser, newPass)
                        setModal(false)
                        setIsLoading(false)
                    } catch (error) {
                        setIsLoading(false)
                        const errorMessage = error.message.toString()
                        const final = errorMessage.slice(9)
                        setErrorMsg(final)
                        setTimer(true)
                        timerFunc()
                    }
                })()
            } else {
                setErrorMsg(`password and confirmation password don't match`)
                setTimer(true)
                timerFunc()
            }
        }
        setInput({
            name: '',
            newPass: '',
            confPass: '',
        })
    }

    return (
        <>
            <div className="productsHeader">
                <h1>
                    <Link to="/" className="backHome">
                        home
                    </Link>{' '}
                    / profile
                </h1>
            </div>
            <main>
                <section className="personalInfo">
                    <p className="personalInfoText">email : </p>
                    <p>{email}</p>
                    <div></div>
                    <p className="personalInfoText">user name : </p>
                    <p>{displayName || userName}</p>
                    <FaEdit
                        className="personalInfoIcon"
                        onClick={() => {
                            setModal(true)
                            setEdit('name')
                        }}
                    />
                    <p className="personalInfoText">password : </p>
                    <p>*********</p>
                    <FaEdit
                        className="personalInfoIcon"
                        onClick={() => {
                            setModal(true)
                            setEdit('password')
                        }}
                    />
                    <button
                        className="logout"
                        type="button"
                        onClick={async () => {
                            try {
                                await signOut(auth)
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    >
                        log out
                    </button>
                </section>
                <p className={`deleteAccMsg ${!timer ? 'hide' : ''}`}>
                    {errorMsg}
                </p>
                <button
                    className="deleteAccount"
                    type="button"
                    onClick={async () => {
                        try {
                            await deleteUser(auth.currentUser)
                        } catch (error) {
                            console.log(error)
                            const errorMessage = error.message.toString()
                            const final = errorMessage.slice(9)
                            setErrorMsg(final)
                            setTimer(true)
                            timerFunc()
                        }
                    }}
                >
                    delete account
                </button>
                <div className={`editProfile ${!modal ? 'hide' : ''}`}>
                    <form onSubmit={submitHandler}>
                        <MdOutlineClose
                            className="closeEdit"
                            onClick={() => {
                                setModal(false)
                                setInput({
                                    name: '',
                                    newPass: '',
                                    confPass: '',
                                })
                            }}
                        />
                        <p className={`editErrorMsg ${!timer ? 'hide' : ''}`}>
                            {errorMsg}
                        </p>
                        <input
                            className={`${!(edit === 'name') ? 'hide' : ''}`}
                            type="text"
                            placeholder="new user name"
                            value={input.name}
                            required={edit === 'name' ? true : false}
                            onChange={(e) =>
                                setInput({ ...input, name: e.target.value })
                            }
                        />
                        <input
                            className={`${
                                !(edit === 'password') ? 'hide' : ''
                            }`}
                            type="password"
                            placeholder="new password"
                            value={input.newPass}
                            required={edit === 'password' ? true : false}
                            onChange={(e) =>
                                setInput({ ...input, newPass: e.target.value })
                            }
                        />
                        <input
                            className={`${
                                !(edit === 'password') ? 'hide' : ''
                            }`}
                            type="password"
                            placeholder="confirm new password"
                            value={input.confPass}
                            required={edit === 'password' ? true : false}
                            onChange={(e) =>
                                setInput({ ...input, confPass: e.target.value })
                            }
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
                                'save'
                            )}
                        </button>
                    </form>
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

export default UserProfile
