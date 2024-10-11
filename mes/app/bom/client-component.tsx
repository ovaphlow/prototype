'use client'

import { useState } from 'react'
import { Bom, saveBom, updateBom } from './api'
import Link from 'next/link'

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

    const handleSubmitBom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!bom.id || bom.id === '0') {
            await saveBom({ ...bom, detail: JSON.stringify(detail) })
        } else {
            await updateBom(bom.id, { ...bom, detail: JSON.stringify(detail) })
        }
        alert('保存成功')
    }

    return (
        <form onSubmit={handleSubmitBom} className="flex flex-col gap-4">
            <Link href="/bom" className="btn btn-outline btn-sm w-16">
                返回
            </Link>
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
