import { CORE_SERVICE_URI_PREFIX } from "@/constant/webapi"

type Procedure = {
    id: string
    time: string
    process_route_id: string
    sn: string
    detail: string
}

export async function getProcedure(id: string) {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/procedure/${id}`)
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function getProcedureList() {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/procedure`)
    if (!response.ok) {
        throw new Error('获取数据失败')
    }
    return response.json()
}

export async function saveProcedure(procedure: Procedure): Promise<void> {
    const response = await fetch(`${CORE_SERVICE_URI_PREFIX}/production/procedure`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(procedure),
    })
    if (!response.ok) {
        throw new Error('保存数据失败')
    }
}