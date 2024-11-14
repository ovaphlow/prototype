import Link from 'next/link'
import { getOrderList, Order } from './api'
import { format } from 'date-fns'
import { getProductList } from '../product/api'
import { ActiveButton, SuspendButton } from './component.client'
import IconPlus from '@/icon/plus'

export default async function Page() {
    const orders = await getOrderList()
    const generateParam = (orders: Order[]) => {
        const _product_id_list = Array.from(new Set(orders.map((order: Order) => order.product_id)))
        const param = `?filter=in,${_product_id_list.length + 1},id,${_product_id_list.join(',')}`
        return param
    }
    const products = await getProductList(generateParam(orders))

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-200 m-4 p-4 rounded shadow border border-slate-600">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">订单</h2>
                    <span>
                        <Link href="/order/0" className="btn btn-secondary btn-sm">
                            新建
                        </Link>
                    </span>
                </div>
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td>操作</td>
                            <td>交付时间</td>
                            <td>产品</td>
                            <td>规格</td>
                            <td>型号</td>
                            <td>数量</td>
                            <td>状态</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: Order) => (
                            <tr key={order.id}>
                                <td className="flex gap-2">
                                    {JSON.parse(order.detail)?.status !== '激活' && <ActiveButton id={order.id} />}
                                    {JSON.parse(order.detail)?.status === '激活' && <SuspendButton id={order.id} />}
                                    {JSON.parse(order.detail)?.status === '激活' && (
                                        <Link href={`/order/${order.id}/schedule/0`} className="btn btn-outline btn-secondary btn-sm">
                                            <IconPlus size={16} color="white" />
                                            生产计划
                                        </Link>
                                    )}
                                </td>
                                <td>{format(order.due_date, 'yyyy-MM-dd')}</td>
                                <td>{products.find((product) => product.id === order.product_id)?.name}</td>
                                <td>
                                    {
                                        JSON.parse(
                                            products.find((product) => product.id === order.product_id)?.detail || '{}',
                                        ).spec
                                    }
                                </td>
                                <td>
                                    {
                                        JSON.parse(
                                            products.find((product) => product.id === order.product_id)?.detail || '{}',
                                        ).model
                                    }
                                </td>
                                <td>{JSON.parse(order.detail)?.quantity}</td>
                                <td>{JSON.parse(order.detail)?.status || '未激活'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
