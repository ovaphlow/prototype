import { CORE_SERVICE_URI_PREFIX, ResponseRFC9457 } from '../../constant/webapi'

export type Order = {
    id: string
    time: string
    state: string
    product_id: string
    detail: string
    due_date: string
}

export async function activeOrder(_prevState: ResponseRFC9457, id: string) {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/order/${id}/active`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.status >= 400) {
        return { type: 'about:blank', title: '服务器错误', status: 500, detail: '', instance: '' }
    }
    return { type: 'about:blank', title: '数据已提交至服务器', status: 200, detail: '', instance: '' }
}

export async function suspendOrder(_prevState: ResponseRFC9457, id: string) {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/order/${id}/suspend`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.status >= 400) {
        return { type: 'about:blank', title: '服务器错误', status: 500, detail: '', instance: '' }
    }
    return { type: 'about:blank', title: '数据已提交至服务器', status: 200, detail: '', instance: '' }
}

export async function getOrderList() {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/order`)
    if (response.status >= 400) {
        return { type: 'about:blank', title: '服务器错误', status: 500, detail: '', instance: '' }
    }
    return response.json()
}

export async function saveOrder(_prevState: ResponseRFC9457, formData: FormData) {
    const raw = {
        product_id: formData.get('product_id') as string,
        due_date: formData.get('due_date') as string,
        detail: {
            quantity: Number(formData.get('quantity')),
        },
    }
    if (!raw['product_id']) {
        return { type: 'about:blank', title: '请选择产品', status: 400, detail: '', instance: '' }
    }
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(raw),
    })
    if (response.status >= 400) {
        return { type: 'about:blank', title: '服务器错误', status: 500, detail: '', instance: '' }
    }
    return { type: 'about:blank', title: '数据已提交至服务器 即将自动跳转', status: 201, detail: '', instance: '' }
}
