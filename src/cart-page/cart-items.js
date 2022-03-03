import React from 'react'
// import { UtilsFunc } from '../products-page/products-page-utils'
import { useGlobalContext } from '../context'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { IoTrashBinSharp } from 'react-icons/io5'

export const CartItems = () => {
    const { rerender, setRerender, priceFormat } = useGlobalContext()
    // const { priceFormat } = UtilsFunc()
    return Object.keys(localStorage).map((id, index) => {
        let { singleProdData, selectedColor, count, stock } = JSON.parse(
            localStorage.getItem(id)
        )
        const { images, name, price } = singleProdData
        const toStorage = () => {
            const updatedObj = JSON.parse(localStorage.getItem(id))
            updatedObj.count = count
            localStorage.setItem(id, JSON.stringify(updatedObj))
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
                                    setRerender({ ...rerender })
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
                                    setRerender({ ...rerender })
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
                            onClick={() => {
                                localStorage.removeItem(id)
                                setRerender({ ...rerender })
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
