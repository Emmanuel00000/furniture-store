import { filterFunc, displayedData } from './reducer-utils'
let expState, apn, apo, apd

const reducer = (state, action) => {
    let newState
    switch (action.type) {
        case 'INPUT':
            newState = {
                ...state,
                input: action.payload,
            }
            break

        case 'SEARCH':
            newState = {
                ...state,
                filteredData: action.payload.filter((item) =>
                    item.name
                        .toLowerCase()
                        .startsWith(state.input.toLowerCase())
                ),
            }
            break

        case 'FILTER_OPTIONS':
            expState = state
            apn = action.payload.name
            apo = action.payload.option
            apd = action.payload.data
            filterFunc()
            newState = {
                ...state,
                input: '',
                filteredData: displayedData,
            }
            break

        case 'OUTLINE':
            newState = { ...state, index: action.payload }
            break

        case 'SHIPPING_STATUS':
            newState = { ...state, shipBool: !state.shipBool }
            break
        case 'CLEAR_FILTERS':
            newState = {
                ...state,
                filteredData: action.payload,
                index: null,
                shipBool: true,
            }
            break
        default:
            throw new Error('no matching action type')
    }
    return newState
}

export default reducer
export { apn, apo, apd, expState as state }
