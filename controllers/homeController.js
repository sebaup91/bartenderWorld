const homeController = async () => {
    try {
        const response = await fetch("/data/stock.json")
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
    }
}
