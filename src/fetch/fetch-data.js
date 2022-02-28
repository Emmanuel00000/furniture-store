const fetchData = async (url) => {
    try {
        let data 
        const get = await fetch(url)
        if (get.status >= 200 && get.status <= 299) {
            data = await get.json()
        } else {
            throw new Error(get.statusText)
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

export default fetchData 
