import { format } from 'date-fns'
import Link from 'next/link'

export interface Product {
    id: string
    time: string
    state: Map<string, string>
    name: string
    detail: Map<string, string>
}

async function getProducts(): Promise<Product[]> {
    const res = await fetch('http://localhost:8088/core-api/production/product', { cache: 'no-cache' })
    if (!res.ok) {
        throw new Error('获取产品数据失败')
    }
    return res.json()
}

export default async function Product() {
    const products = await getProducts()

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">产品 / 产品定义</h2>
                    <span>
                        <Link href="/product/0" className="btn btn-secondary btn-sm">新建</Link>
                    </span>
                </div>
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td>操作</td>
                            <td>时间</td>
                            <td>内容</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <span>查看</span>
                                </td>
                                <td>{format(new Date(product.time), 'yyyy-MM-dd HH:mm')}</td>
                                <td>{product.detail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
