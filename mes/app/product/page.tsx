import { format } from 'date-fns'
import Link from 'next/link'
import { getProductList } from './api'

export interface Product {
    id: string
    time: string
    state: string
    name: string
    detail: string
}

export default async function Product() {
    const products = await getProductList()

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
                            <td>名称</td>
                            <td>编号</td>
                            <td>规格</td>
                            <td>型号</td>
                            <td>版本</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((it) => (
                            <tr key={it.id}>
                                <td>
                                    <Link href={`/product/${it.id}`}>查看</Link>
                                </td>
                                <td>{format(new Date(it.time), 'yyyy-MM-dd HH:mm')}</td>
                                <td>{it.name}</td>
                                <td>{JSON.parse(it.detail)?.['sn']}</td>
                                <td>{JSON.parse(it.detail)?.['spec']}</td>
                                <td>{JSON.parse(it.detail)?.['model']}</td>
                                <td>{JSON.parse(it.detail)?.['version']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
