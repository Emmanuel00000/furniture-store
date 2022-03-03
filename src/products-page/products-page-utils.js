import React from 'react'
// import data from '../fetch/data'
import { state, dispatch, rangeTitleRef } from './products-page'
import { useGlobalContext } from '../context'

export const UtilsFunc = () => {
    const { productsData: data, priceFormat } = useGlobalContext()

    const initState = {
        input: '',
        filteredData: data,
        index: null,
        shipBool: true,
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const options = (value) => {
        const option = data.map((item) => item[value])
        return [...new Set(option)].map((name, index) => (
            <option key={index}>{name}</option>
        ))
    }

    const optionsClickHandler = (name, index) => (e) => {
        dispatch({
            type: 'FILTER_OPTIONS',
            payload: {
                option: e.target.value,
                select: e.currentTarget.id,
                data,
                name,
            },
        })
        name === 'colors' && dispatch({ type: 'OUTLINE', payload: index + 1 })
        name === 'shipping' && dispatch({ type: 'SHIPPING_STATUS' })
        if (name === 'price') {
            rangeTitleRef.current.innerText = priceFormat.format(
                e.target.value / 100
            )
        }
        if (name === 'clearFilters') {
            dispatch({
                type: 'CLEAR_FILTERS',
                payload: data,
            })
            rangeTitleRef.current.innerText = priceFormat.format(0)
        }
    }

    const ColorButtons = () => {
        const colorsArr = []
        data.forEach((item) => colorsArr.push(...item.colors))
        return [...new Set(colorsArr)].map((color, index) => (
            <button
                key={index}
                type="button"
                id="color"
                className={`color ${
                    state.index === index + 1 ? 'outline' : ''
                }`}
                style={{ background: color }}
                value={color}
                onClick={optionsClickHandler('colors', index)}
            ></button>
        ))
    }

    // const priceFormat = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    // })
    const price = data.map((item) => {
        return item.price
    })

    return {
        data,
        initState,
        submitHandler,
        options,
        optionsClickHandler,
        ColorButtons,
        // priceFormat,
        price,
    }
}
