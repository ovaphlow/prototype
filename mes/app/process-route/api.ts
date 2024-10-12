import { CORE_SERVICE_URI_PREFIX } from '@/constant/webapi'

export type ProcessRoute = {
    id: string
    time: string
    state: string
    product_id: string
    sn: string
    detail: string
}

export async function updateProcessRoute(id: string, route: ProcessRoute): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/process-route/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    })
    if (!response.ok) {
        throw new Error('保存数据失败')
    }
}

export async function getProcessRoute(id: string): Promise<ProcessRoute> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/process-route/${id}`)
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function getProcessRouteList() {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/process-route`)
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function saveProcessRoute(route: ProcessRoute): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/process-route`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    })
    if (!response.ok) {
        throw new Error('保存数据失败')
    }
}
