import Link from "next/link";
import { Bom, getBomList } from "./api";

export default async function BomPage() {
    const boms: Bom[] = await getBomList()

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-200 m-4 p-4 rounded shadow border border-slate-600">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">产品 / 物料结构(BOM)</h2>
                    <span>
                        <Link href="/bom/0" className="btn btn-secondary btn-sm">新建</Link>
                    </span>
                </div>
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td>操作</td>
                            <td>产品</td>
                            <td>编号</td>
                            <td>名称</td>
                            <td>类型</td>
                            <td>数量</td>
                            <td>顺序</td>
                        </tr>
                    </thead>
                    <tbody>
                        {boms.map((it) => (
                            <tr key={it.id}>
                                <td>
                                    <Link href={`/bom/${it.id}`}>查看</Link>
                                </td>
                                <td>{it.product_id}</td>
                                <td>{it.sn}</td>
                                <td>{JSON.parse(it.detail)?.['name']}</td>
                                <td>{JSON.parse(it.detail)?.['category']}</td>
                                <td>{JSON.parse(it.detail)?.['qty']}</td>
                                <td>{JSON.parse(it.detail)?.['seq']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}