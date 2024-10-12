import Link from 'next/link'

async function loadData(id: string) {
    if (id === '0') {
        return []
    } else {
        return []
    }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const [id, process_route_id] = params.slug
    console.info(params)

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-100 m-4 p-4 rounded-lg shadow-xl border-2">
                <Link href={`/process-route/${process_route_id}`} className="btn btn-outline btn-sm w-16 mb-4">
                    返回
                </Link>
            </div>
        </div>
    )
}
