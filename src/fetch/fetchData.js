const fetchData = async (url) => {
    try {
        const get = await fetch(url)
        if (get.status >= 200 && get.status <= 299) {
            const data = await get.json()
            console.log(data)
            console.log(get)
        } else {
            throw new Error(get.statusText)
        }
    } catch (error) {
        console.log(error);
    }
}

export default fetchData
