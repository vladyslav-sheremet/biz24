export interface Product {
    id: number
    brand: string
    name: string
    img: string
    price: number
    displaySize: number
    memory: string
}

export interface State {
    products: Product[]
    brands: string[]
    memory: string[]
}