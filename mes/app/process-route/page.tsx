import Link from 'next/link'
import { ProcessRoute, getProcessRouteList } from './api'

export default async function Page() {
    const routes: ProcessRoute[] = await getProcessRouteList()

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">产品 / 工艺路线</h2>
                    <span>
                        <Link href="/process-route/0" className="btn btn-secondary btn-sm">
                            新建
                        </Link>
                    </span>
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
                    <tbody>
                        {routes.map((it) => (
                            <tr key={it.id}>
                                <td>
                                    <Link href={`/process-route/${it.id}`}>查看</Link>
                                </td>
                                <td>{it.product_id}</td>
                                <td>{it.sn}</td>
                                <td>{JSON.parse(it.detail)?.['name']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
