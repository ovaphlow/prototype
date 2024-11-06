import Link from 'next/link'
import { getProcedure } from '../api'
import { format } from 'date-fns'
import { Suspense } from 'react'
import { Form } from '../conponent.client'

async function loadData(id: string, process_route_id: string) {
    if (id === '0') {
        return {
            id: '0',
            time: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
            state: '{}',
            process_route_id: process_route_id,
            sn: '',
            detail: '',
            equipment: '',
            operation: '',
            qc: '',
        }
    } else {
        return getProcedure(id)
    }
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const [id, process_route_id] = params.slug
    const procedure = await loadData(id, process_route_id)

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <Link href={`/process-route/${process_route_id}`} className="btn btn-outline btn-sm w-16 mb-4">
                    返回
                </Link>
                <Suspense fallback={<div>加载中</div>}>
                    <Form initial={procedure} />
                </Suspense>
            </div>
        </div>
    )
}
