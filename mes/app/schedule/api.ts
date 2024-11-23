import { CYCLONE_SERVICE_URI_PREFIX, ResponseRFC9457 } from '../../constant/webapi'

export interface Schedule {
    id: string
    time: string
    state: string
    starting_date: string
    order_id: string
    product_id: string
    bom_id_raw: string
    bom_id_semi: string
    detail: string // workshop, line
}

/**
 * 获取生产计划列表。
 *
 * @returns 返回生产计划列表数据或错误信息。
 */
export async function getScheduleList() {
    const querystring = [`filter=`, `l=`]
    const uri = [CYCLONE_SERVICE_URI_PREFIX, '/dbutil/mes.schedule?']
    uri.push(querystring.join('&'))
    const response = await fetch(uri.join(''))
    if (response.status >= 400) {
        return { type: 'about:blank', title: '服务器错误', status: 500, detail: '', instance: '' }
    }
    return response.json()
}

/**
 * 保存生产计划信息。
 *
 * @param _prevState 上一次的响应状态。
 * @param formData 表单数据，包括生产计划的详细信息。
 * @returns 返回提交结果的响应信息。
 */
export async function saveSchedule(_prevState: ResponseRFC9457, formData: FormData) {
    const raw = {
        starting_date: formData.get('starting_date') as string,
        order_id: formData.get('order_id') as string,
        product_id: formData.get('product_id') as string,
        bom_id_raw: formData.get('bom_id_raw') as string,
        bom_id_semi: formData.get('bom_id_semi') as string,
        detail: JSON.stringify({
            workshop: formData.get('workshop'),
            line: formData.get('line'),
        }),
    }
    const response = await fetch(`${CYCLONE_SERVICE_URI_PREFIX}/dbutil/mes.schedule`, {
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
