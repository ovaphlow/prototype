import { CORE_SERVICE_URI_PREFIX } from '@/constant/webapi'

export type Order = {
    id: string
    time: string
    state: string
    product_id: string
    detail: string
    due_date: string
}

export async function saveOrder(order: Order): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    if (!response.ok) {
        throw new Error('保存数据失败')
    }
}
