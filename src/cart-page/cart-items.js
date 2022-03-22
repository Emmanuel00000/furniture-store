import React, { useState, useEffect } from 'react'
import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'
import { useGlobalContext } from '../context'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { IoTrashBinSharp } from 'react-icons/io5'

const colRef = collection(getFirestore(), 'cart')

export const CartItems = () => {
    const { priceFormat } = useGlobalContext()
    const [itemsInCart, setItemsInCart] = useState([])
    useEffect(() => {
        const unsub = onSnapshot(colRef, (snapshot) => {
            let dataArr = []
            snapshot.docs.forEach((item) => {
                dataArr.push(item.data())
            })
            setItemsInCart(dataArr)
        })
        return () => unsub()
    }, [])
    return itemsInCart.map((item, index) => {
        let { singleProdData, selectedColor, count, stock } = item
        const { images, name, price, id } = singleProdData
        const docRef = doc(colRef, id)
        const toStorage = async () => {
            try {
                await updateDoc(docRef, { count: count })
            } catch (error) {
                console.log(error)
            }
        }

        return (
            <React.Fragment key={index}>
                <div className="cartPageItems">
                    <div className="prodDesc">
                        <div className="cartImgContainer">
                            <img
                                className="cartImg"
                                src={images[0].thumbnails.large.url}
                                alt=""
                            />
                        </div>
                        <div>
                            <p className="cartItemName">{name}</p>
                            <p className="colorTxt">
                                color :
                                <button
                                    type="button"
                                    className="color"
                                    style={{ background: selectedColor }}
                                ></button>
                            </p>
                        </div>
                    </div>
                    <p className="cartPrice">
                        {priceFormat.format(price / 100)}
                    </p>
                    <div>
                        <button
                            type="button"
                            className="amountIcon"
                            onClick={() => {
                                if (count > 1) {
                                    count = count - 1
                                    toStorage()
                                }
                            }}
                        >
                            <BiMinus />
                        </button>
                        <span className="cartProdAmount">{count}</span>
                        <button
                            type="button"
                            className="amountIcon"
                            onClick={() => {
                                if (count < stock) {
                                    count = count + 1
                                    toStorage()
                                }
                            }}
                        >
                            <BiPlus />
                        </button>
                    </div>
                    <div className="priceAndBin">
                        <span className="cartPrice">
                            {priceFormat.format((price * count) / 100)}
                        </span>
                        <button
                            type="button"
                            className="cartBin"
                            onClick={async () => {
                                try {
                                    await deleteDoc(docRef)
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        >
                            <IoTrashBinSharp />
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    })
}
