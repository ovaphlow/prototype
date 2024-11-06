import { CORE_SERVICE_URI_PREFIX } from "../../constant/webapi"

export type Bom = {
    id: string
    time: string
    state: string
    product_id: string
    sn: string
    detail: string
}

export async function updateBom(id: string, bom: Bom): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/bom/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bom),
    })
    if (!response.ok) {
        throw new Error('更新数据失败')
    }
}

export async function getBom(id: string): Promise<Bom> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/bom/${id}`)
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function getBomList(): Promise<Bom[]> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/bom`)
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function saveBom(bom: Bom): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/bom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bom),
    })
    if (!response.ok) {
        throw new Error('保存数据失败')
    }
}