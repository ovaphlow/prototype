import { format } from 'date-fns'
import { getProcessRoute, ProcessRoute } from '../api'
import { Suspense } from 'react'
import { Form } from '../component.client'
import Link from 'next/link'

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
                <Link href="/process-route" className="btn btn-outline btn-sm w-16 mb-4">
                    返回
                </Link>
                <div role="tablist" className="tabs tabs-lifted">
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="工艺路线"
                        defaultChecked
                    />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
                        <Suspense fallback={<div>加载中</div>}>
                            <Form initial={route} />
                        </Suspense>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="工序" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-4">
                        <div className="flex flex-row justify-end">
                            <Link href={`/procedure/0/${route.id}`} className="btn btn-secondary btn-sm w-16 mb-4">
                                新建
                            </Link>
                        </div>
                        <table className="table table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <td>操作</td>
                                    <td>产品</td>
                                    <td>编号</td>
                                    <td>名称</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
