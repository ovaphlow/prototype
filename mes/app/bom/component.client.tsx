'use client'

import { useEffect, useState } from 'react'
import { Bom, saveBom, updateBom } from './api'
import Link from 'next/link'
import { getProductList, Product } from '../product/api'

export function Form({ initialBom }: { initialBom: Bom }) {
    const [bom, setBom] = useState<Bom>(initialBom)
    const [detail, setDetail] = useState(
        bom.id && bom.id !== '0'
            ? JSON.parse(bom.detail)
            : {
                  category: '',
                  name: '',
                  qty: '',
                  seq: '',
              },
    )
    const [products, setProducts] = useState<{ id: string; sn: string; name: string }[]>([])

    const handleSubmitBom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!bom.id || bom.id === '0') {
            await saveBom({ ...bom, detail: JSON.stringify(detail) })
        } else {
            await updateBom(bom.id, { ...bom, detail: JSON.stringify(detail) })
        }
        alert('保存成功')
    }

    useEffect(() => {
        const loadProductList = async () => {
            const p = await getProductList()
            setProducts(p.map((it: Product) => ({ id: it.id, sn: JSON.parse(it.detail)?.['sn'], name: it.name })))
        }
        loadProductList()
    }, [])

    return (
        <form onSubmit={handleSubmitBom} className="flex flex-col gap-4">
            <Link href="/bom" className="btn btn-outline btn-sm w-16">
                返回
            </Link>
            <select
                className="select select-bordered w-full"
                title="产品"
                value={bom.product_id}
                onChange={(e) => setBom((prev: Bom) => ({ ...prev, product_id: e.target.value }))}
            >
                <option disabled value="">
                    产品
                </option>
                {products.map((it) => (
                    <option key={it.id} value={it.id}>
                        {it.name}
                    </option>
                ))}
            </select>
            <select
                className="select select-bordered w-full"
                title="类别"
                value={detail.category}
                onChange={(e) => setDetail((prev: typeof bom) => ({ ...prev, category: e.target.value }))}
            >
                <option disabled value="">
                    类别
                </option>
                <option value="原材料">原材料</option>
                <option value="零部件">零部件</option>
                <option value="半成品">半成品</option>
            </select>
            <label className="input input-bordered flex items-center gap-2">
                编号
                <input
                    type="text"
                    name="sn"
                    className="grow"
                    value={bom.sn}
                    onChange={(e) => setBom((prev: typeof bom) => ({ ...prev, sn: e.target.value }))}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                名称
                <input
                    type="text"
                    name="name"
                    className="grow"
                    value={detail.name}
                    onChange={(e) => setDetail((prev: typeof detail) => ({ ...prev, name: e.target.value }))}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                数量
                <input
                    type="text"
                    name="qty"
                    className="grow"
                    value={detail.qty}
                    onChange={(e) => setDetail((prev: typeof detail) => ({ ...prev, qty: e.target.value }))}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                顺序
                <input
                    type="text"
                    name="seq"
                    className="grow"
                    value={detail.seq}
                    onChange={(e) => setDetail((prev: typeof detail) => ({ ...prev, seq: e.target.value }))}
                />
            </label>
            <button type="submit" className="btn btn-primary">
                保存
            </button>
        </form>
    )
}
