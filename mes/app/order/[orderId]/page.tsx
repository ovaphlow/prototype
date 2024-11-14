import Link from 'next/link'
import { Suspense } from 'react'
import { OrderForm } from '../component.client'
import { format } from 'date-fns'

async function loadData(id: string) {
    if (id === '0') {
        return {
            id: '0',
            time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
            state: '{}',
            product_id: '',
            detail: '{}',
            due_date: format(new Date(), 'yyyy-MM-dd'),
        }
    } else {
        return {
            id: '0',
            time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
            state: '{}',
            product_id: '',
            detail: '{}',
            due_date: '',
        }
    }
}

export default async function Page({orderId}: {orderId: string}) {
    const order = await loadData(orderId)

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-200 m-4 p-4 rounded shadow border border-slate-600">
                <Link href="/process-route" className="btn btn-outline btn-sm w-16 mb-4">
                    返回
                </Link>
                <Suspense fallback={<div>加载中</div>}>
                    <OrderForm initial={order} />
                </Suspense>
            </div>
        </div>
    )
}
