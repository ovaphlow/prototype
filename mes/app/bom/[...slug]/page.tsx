import { format } from 'date-fns'
import { Bom, getBom } from '../api'
import { Form } from '../client-component'
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

export default async function BomDetail({ params }: { params: { slug: string[] } }) {
    const bom = await getBomDetail(params.slug[0])

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <Suspense fallback={<div>加载中</div>}>
                    <Form initialBom={bom} />
                </Suspense>
            </div>
        </div>
    )
}
