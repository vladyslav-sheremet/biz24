export const updateUrl = (selectedBrand: string, selectedMemory: string, price: number, MINIMAL_PRICE: number): void => {
    let amountOfQueryParameters = 0
    let brandParameter = ''
    let memoryParameter = ''
    let priceParameter = ''

    if (selectedBrand !== '' && selectedBrand !== 'All') {
        brandParameter = `brand=${selectedBrand}`
        amountOfQueryParameters++
    }
    if (selectedMemory !== '' && selectedMemory !== 'All') {
        memoryParameter = `memory=${selectedMemory}`
        amountOfQueryParameters++
    }
    if (price !== MINIMAL_PRICE) {
        priceParameter = `price=${Math.floor(price)}`
        amountOfQueryParameters++
    }

    const parameters = brandParameter === '' && memoryParameter === '' && priceParameter === '' ? '' : '?'
    const firstAnd = amountOfQueryParameters === 0 || amountOfQueryParameters === 1 ? '' : '&'
    const secondAnd = amountOfQueryParameters > 2 ? '&' : ''
    const url = `${window.location.pathname}${parameters}${brandParameter}${firstAnd}${memoryParameter}${secondAnd}${priceParameter}`

    window.history.pushState(
        null,
        document.title,
        url
    )

    // window.history.pushState(
    //     null,
    //     document.title,
    //     `${window.location.pathname}?brand=${selectedBrand.value}&memory=${selectedMemory.value}&price=${Math.floor(price.value)}`
    // )
}