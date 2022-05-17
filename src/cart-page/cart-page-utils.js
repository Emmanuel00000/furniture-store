import { useEffect } from 'react'
import { getStripe } from '../App'
import { getFunctions, httpsCallable } from 'firebase/functions'
import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    deleteDoc,
    addDoc,
} from 'firebase/firestore'
import { useGlobalContext } from '../context'

const CartPageUtils = () => {
    const { user, totalPrice, setTotalPrice } = useGlobalContext()
    const uid = user?.uid

    useEffect(() => {
        let unsub
        const getVal = (name, dbId) => {
            unsub = onSnapshot(
                collection(getFirestore(), name, dbId, 'cart-items'),
                (snapshot) => {
                    const total = snapshot.docs.reduce((acc, curr) => {
                        const { count, singleProdData } = curr.data()
                        acc += count * singleProdData.price
                        return acc
                    }, 0)
                    setTotalPrice(total)
                }
            )
        }
        if (user) {
            getVal('cart', uid)
        } else {
            getVal('temp-cart', localStorage.getItem('temp_id'))
        }
        return () => unsub()
    }, [user, uid, setTotalPrice])

    const deleteCart = () => {
        const getVal = (name, dbId) => {
            const colRef = collection(getFirestore(), name, dbId, 'cart-items')
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
        if (user) {
            getVal('cart', uid)
        } else {
            getVal('temp-cart', localStorage.getItem('temp_id'))
        }
    }

    const toPayment = () => {
        ;(async () => {
            try {
                const changeTotalPrice = httpsCallable(
                    getFunctions(),
                    'changeTotalPrice'
                )
                const value = await changeTotalPrice({
                    totalPrice,
                })
                let colRef2
                if (user) {
                    colRef2 = collection(
                        getFirestore(),
                        'cart',
                        uid,
                        'checkout_sessions'
                    )
                } else {
                    colRef2 = collection(
                        getFirestore(),
                        'temp-cart',
                        localStorage.getItem('temp_id'),
                        'checkout_sessions'
                    )
                }
                const val = await addDoc(colRef2, {
                    mode: 'payment',
                    price: value.data.priceId,
                    success_url: window.location.origin,
                    cancel_url: window.location.origin,
                })
                const unsub = onSnapshot(val, (snapshot) => {
                    const { sessionId } = snapshot.data()
                    ;(async () => {
                        try {
                            const stripe = await getStripe()
                            stripe.redirectToCheckout({
                                sessionId,
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    })()
                    unsub()
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }
    return { deleteCart, toPayment }
}

export default CartPageUtils
