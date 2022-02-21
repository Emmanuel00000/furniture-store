import { apn, apo, apd, state } from './reducer'
let displayedData, name
const sectionMap = new Map()

const conditionsFunc = (item) => {
    const shipCond = () => {
        let condition
        if (!state.shipBool) {
            condition = true
        } else {
            condition = item[apn] === state.shipBool
        }
        return condition
    }
    return [
        apn === 'category' || apn === 'company' ? item[apn] === apo : '',
        apn === 'colors' ? item[apn].includes(apo) : '',
        apn === 'price' ? item[apn] <= parseInt(apo) : '',
        apn === 'shipping' ? shipCond() : '',
    ]
}

const filterFunc = () => {
    if (apn === 'clearFilters') {
        sectionMap.clear()
    } else {
        const sectionData = apd.filter((item) =>
            conditionsFunc(item).includes(true)
        )
        name !== apn
            ? sectionMap.set(apn, sectionData)
            : sectionMap.set(apn, sectionData)
        apo === 'all' && sectionMap.set(apn, apd)
        name = apn
        const repeatingArr = [...sectionMap.values()].reduce((prev, curr) =>
            prev.filter((e) => curr.map((item) => item.id).includes(e.id))
        )
        displayedData = repeatingArr
    }
}

export { filterFunc, displayedData }
