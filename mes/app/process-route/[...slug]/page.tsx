import { format } from 'date-fns'
import { getProcessRoute, ProcessRoute } from '../api'
import { Suspense } from 'react'
import { Form } from '../component.client'

async function loadData(id: string): Promise<ProcessRoute> {
    if (id === '0') {
        return {
            id: '0',
            time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
            state: '{}',
            product_id: '',
            sn: '',
            detail: '',
        }
    } else {
        return getProcessRoute(id)
    }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const route = await loadData(params.slug[0])

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <Suspense fallback={<div>加载中</div>}>
                    <Form initial={route} />
                </Suspense>
            </div>
        </div>
    )
}
