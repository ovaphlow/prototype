import Link from 'next/link'
import { list } from './actions'

export default async function Page() {
    const data = await list()

    return (
        <div className="h-screen w-full flex flex-col gap-4 justify-center items-center">
            <Link href="/detail" className="p-2 rounded bg-teal-500 font-bold italic text-white">
                CREATE
            </Link>
            <table className="w-1/2">
                <thead>
                    <tr>
                        <th className="border-2 px-4 py-2">ID</th>
                        <th className="border-2 px-4 py-2">Title</th>
                        <th className="border-2 px-4 py-2">Content</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="border-2 px-4 py-2 text-center">{item.id}</td>
                            <td className="border-2 px-4 py-2">{item.title}</td>
                            <td className="border-2 px-4 py-2">{item.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
