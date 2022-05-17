import { useEffect } from 'react'
import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
    deleteDoc,
} from 'firebase/firestore'
import { useGlobalContext } from '../context'

const AuthPageUtils = () => {
    const { user } = useGlobalContext()
    const uid = user?.uid
    const db = getFirestore()
    const colRef = collection(
        db,
        'temp-cart',
        localStorage.getItem('temp_id'),
        'cart-items'
    )
    const colRef2 = collection(db, 'cart', uid, 'cart-items')
    useEffect(() => {
        ;(async () => {
            try {
                const documents = await getDocs(colRef)
                documents.docs.forEach((item) => {
                    ;(async () => {
                        try {
                            await setDoc(
                                doc(colRef2, item.data().singleProdData.id),
                                {
                                    ...item.data(),
                                }
                            )
                            await deleteDoc(
                                doc(colRef, item.data().singleProdData.id)
                            )
                        } catch (error) {
                            console.log(error)
                        }
                    })()
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }, [colRef,colRef2])
}

export default AuthPageUtils
