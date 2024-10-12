'use client'

import { useEffect, useState } from 'react'
import { ProcessRoute, saveProcessRoute, updateProcessRoute } from './api'
import { getProductList, Product } from '../product/api'
import Link from 'next/link'

export function Form({ initial }: { initial: ProcessRoute }) {
    const [route, setRoute] = useState<ProcessRoute>(initial)
    const [detail, setDetail] = useState(
        route.id && route.id !== '0'
            ? JSON.parse(route.detail)
            : {
                  category: '',
                  name: '',
                  qty: '',
                  seq: '',
              },
    )
    const [products, setProducts] = useState<{ id: string; sn: string; name: string }[]>([])

    const handleSubmitRoute = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!route.id || route.id === '0') {
            await saveProcessRoute({ ...route, detail: JSON.stringify(detail) })
        } else {
            await updateProcessRoute(route.id, { ...route, detail: JSON.stringify(detail) })
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
        <form onSubmit={handleSubmitRoute} className="flex flex-col gap-4">
            <Link href="/process-route" className="btn btn-outline btn-sm w-16">
                返回
            </Link>
            <select
                className="select select-bordered w-full"
                title="产品"
                value={route.product_id}
                onChange={(e) => setRoute((prev: ProcessRoute) => ({ ...prev, product_id: e.target.value }))}
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
            <input
                type="text"
                className="input input-bordered"
                placeholder="编号"
                value={route.sn}
                onChange={(e) => setRoute((prev: ProcessRoute) => ({ ...prev, sn: e.target.value }))}
            />
            <input
                type="text"
                className="input input-bordered"
                placeholder="名称"
                value={detail.name}
                onChange={(e) => setDetail((prev: typeof route) => ({ ...prev, name: e.target.value }))}
            />
            <button type="submit" className="btn btn-primary">
                保存
            </button>
        </form>
    )
}
