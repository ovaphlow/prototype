import { Product } from '../page'
import { Form } from './component-form'

export interface ProductDetailProps {
    initialProduct: Product
}

async function getProductDetail(id: string): Promise<Product> {
    if (id === '0') {
        return {
            id: '0',
            time: '',
            state: new Map<string, string>(),
            name: '',
            detail: new Map<string, string>(),
        }
    } else {
        const response = await fetch(`http://localhost:8088/core-api/production/product/${id}`, { cache: 'no-cache' })
        if (!response.ok) {
            throw new Error('获取产品数据失败')
        }
        return response.json()
    }
}

export default async function ProductDetail({ params }: { params: { slug: string[] } }) {
    const product = await getProductDetail(params.slug[0])

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <Form initialProduct={product} />
            </div>
        </div>
    )
}
