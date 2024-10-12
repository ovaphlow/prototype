import Link from 'next/link'

async function loadData(id: string) {
    if (id === '0') {
        return []
    } else {
        return []
    }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const procedures = await loadData(params.slug[0])

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">产品 / 工艺路线 / 工序</h2>
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
                    <tbody></tbody>
                </table>
            </div>
        </div>
    )
}
