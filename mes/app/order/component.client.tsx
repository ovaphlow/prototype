'use client'

import { useState } from 'react'
import { Order, saveOrder } from './api'

export function Form({ initial }: { initial: Order }) {
    const [order, setOrder] = useState<Order>(initial)
    const [detail, setDetail] = useState(
        order.id && order.id !== '0'
            ? JSON.parse(order.detail)
            : {
                  quantity: '1',
              },
    )

    const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        saveOrder(order)
        alert('保存成功')
    }

    return (
        <form onSubmit={handleSubmitOrder} className="flex flex-col gap-4">
            <input
                type="text"
                className="input input-bordered"
                placeholder="产品"
                value={order.product_id}
                onChange={(e) => setOrder((prev: Order) => ({ ...prev, product_id: e.target.value }))}
            />
            <input
                type="number"
                className="input input-bordered"
                placeholder="数量"
                value={detail.quantity}
                onChange={(e) => setDetail((prev: typeof detail) => ({ ...prev, quantity: e.target.value }))}
            />
            <input
                type="date"
                className="input input-bordered"
                placeholder="交货日期"
                value={order.due_date}
                onChange={(e) => setOrder((prev: Order) => ({ ...prev, due_date: e.target.value }))}
            />
            <button type="submit" className="btn btn-primary">
                保存
            </button>
        </form>
    )
}
