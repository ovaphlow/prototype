import { format } from 'date-fns'
import { Form } from '../component.client'
import { Product, getProduct } from '../api'

export interface ProductDetailProps {
    initialProduct: Product
}

async function getProductDetail(id: string): Promise<Product> {
    if (id === '0') {
        return {
            id: '0',
            time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
            state: '{}',
            name: '',
            detail: '{}',
        }
    } else {
        return getProduct(id)
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
