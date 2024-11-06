import { CORE_SERVICE_URI_PREFIX } from '../../constant/webapi'

export interface Product {
    id: string
    time: string
    state: string
    name: string
    detail: string
}

export async function updateProduct(id: string, product: Product): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    if (!response.ok) {
        throw new Error('保存数据失败')
    }
}

export async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/product/${id}`, { cache: 'no-cache' })
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function getProductList(): Promise<Product[]> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/product`, { cache: 'no-cache' })
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function saveProduct(product: Product): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    if (!response.ok) {
        throw new Error('保存数据失败')
    }
}
