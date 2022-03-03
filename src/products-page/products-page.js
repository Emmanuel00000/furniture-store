import React, { useReducer, useRef } from 'react'
// import data from '../fetch/data'
import { GetProducts } from '../fetch/get-products'
import './products-page.css'
import { Link } from 'react-router-dom'
import reducer from './reducer'
import { UtilsFunc } from './products-page-utils'
import { useGlobalContext } from '../context'

let expState, expDispatch, expRangeTitleRef

const Products = () => {
    const {
        data,
        initState,
        submitHandler,
        options,
        optionsClickHandler,
        ColorButtons,
        // priceFormat,
        price,
    } = UtilsFunc()
    const { priceFormat } = useGlobalContext()
    const [state, dispatch] = useReducer(reducer, initState)
    const rangeTitleRef = useRef(null)
    expState = state
    expDispatch = dispatch
    expRangeTitleRef = rangeTitleRef
    return (
        <>
            <div className="productsHeader">
                <h1>
                    <Link to="/" className="backHome">
                        home
                    </Link>{' '}
                    / products
                </h1>
            </div>
            <div className="filterContainer">
                <aside>
                    <form onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder="search..."
                            className="search"
                            value={state.input}
                            onChange={(e) =>
                                dispatch({
                                    type: 'INPUT',
                                    payload: e.target.value,
                                })
                            }
                            onKeyUp={() =>
                                dispatch({
                                    type: 'SEARCH',
                                    payload: data,
                                })
                            }
                        />

                        <label htmlFor="category" className="largeLabel">
                            <h4>category</h4>
                        </label>
                        <select
                            id="category"
                            className="dropdown"
                            onChange={optionsClickHandler('category')}
                        >
                            <option>all</option>
                            {options('category')}
                        </select>

                        <label htmlFor="company" className="largeLabel">
                            <h4>company</h4>
                        </label>
                        <select
                            id="company"
                            className="dropdown"
                            onChange={optionsClickHandler('company')}
                        >
                            <option>all</option>
                            {options('company')}
                        </select>

                        <h4 className="largeLabel">color</h4>
                        <button
                            type="button"
                            id="color"
                            className="allColors"
                            value={'all'}
                            onClick={optionsClickHandler('colors')}
                        >
                            all
                        </button>
                        <ColorButtons />

                        <label htmlFor="price" className="largeLabel">
                            <h4>price</h4>
                        </label>
                        <h4 className="priceNum" ref={rangeTitleRef}>
                            {priceFormat.format(0)}
                        </h4>
                        <input
                            type="range"
                            id="price"
                            className="priceRange"
                            min={Math.min(...price)}
                            max={Math.max(...price)}
                            onChange={optionsClickHandler('price')}
                        />

                        <label htmlFor="check">
                            <p className="shippingText">free shipping</p>
                        </label>
                        <input
                            type="checkbox"
                            id="check"
                            className="shipping"
                            onClick={optionsClickHandler('shipping')}
                        />
                        <input
                            type="reset"
                            value="clear filters"
                            className="clearFilter"
                            onClick={optionsClickHandler('clearFilters')}
                        />
                    </form>
                </aside>
                <main className="productsContainer">
                    <GetProducts data={state.filteredData} />
                </main>
            </div>
        </>
    )
}

export default Products
export {
    expState as state,
    expDispatch as dispatch,
    expRangeTitleRef as rangeTitleRef,
}
