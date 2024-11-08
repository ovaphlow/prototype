import { format } from 'date-fns'
import { Bom, getBom } from '../api'
import { Form } from '../component.client'
import { Suspense } from 'react'

async function getBomDetail(id: string): Promise<Bom> {
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
        return getBom(id)
    }
}

export default async function BomDetail(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const bom = await getBomDetail(params.slug[0])

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-200 m-4 p-4 rounded shadow border border-slate-600">
                <Suspense fallback={<div>加载中</div>}>
                    <Form initialBom={bom} />
                </Suspense>
            </div>
        </div>
    )
}
