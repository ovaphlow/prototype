import Link from 'next/link'
import { Suspense } from 'react'
import { Form } from '../component.client'
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

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const order = await loadData(params.slug[0])

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <Link href="/process-route" className="btn btn-outline btn-sm w-16 mb-4">
                    返回
                </Link>
                <Suspense fallback={<div>加载中</div>}>
                    <Form initial={order} />
                </Suspense>
            </div>
        </div>
    )
}
