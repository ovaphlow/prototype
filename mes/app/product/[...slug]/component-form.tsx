'use client'

import { useState } from 'react'
import { ProductDetailProps } from './page'
import { Product } from '../page'
import Link from 'next/link'
import { saveProduct, updateProduct } from '../api'

export function Form({ initialProduct }: ProductDetailProps) {
    const [product, setProduct] = useState<Product>(initialProduct)
    const [detail, setDetail] = useState(product.id && product.id !== '0' ? JSON.parse(product.detail) : {
        sn: '',
        spec: '',
        model: '',
        version: '',
    })

    const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!product.id || product.id === '0') {
            await saveProduct(Object.assign(product, { state: '{}', detail: JSON.stringify(detail) }))
        } else {
            await updateProduct(product.id, Object.assign(product, { detail: JSON.stringify(detail) }))
        }
        alert('保存成功')
    }

    return (
        <form onSubmit={handleSubmitProduct} className="flex flex-col gap-4">
            <Link href="/product" className="btn btn-outline btn-sm w-16">
                返回
            </Link>
            <label className="input input-bordered flex items-center gap-2">
                产品名称
                <input type="text" name="name" className="grow" value={product.name} onChange={handleChangeProduct} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                编号
                <input
                    type="text"
                    name="sn"
                    className="grow"
                    value={detail.sn}
                    onChange={(e) => setDetail((prev: typeof detail) => Object.assign({ ...prev, sn: e.target.value }))}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                规格
                <input
                    type="text"
                    name="spec"
                    className="grow"
                    value={detail.spec}
                    onChange={(e) => setDetail((prev: typeof detail) => Object.assign({ ...prev, spec: e.target.value }))}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                型号
                <input
                    type="text"
                    name="model"
                    className="grow"
                    value={detail.model}
                    onChange={(e) => setDetail((prev: typeof detail) => Object.assign({ ...prev, model: e.target.value }))}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                版本
                <input
                    type="text"
                    name="version"
                    className="grow"
                    value={detail.version}
                    onChange={(e) => setDetail((prev: typeof detail) => Object.assign({ ...prev, version: e.target.value }))}
                />
            </label>
            <div className="flex flex-row justify-center gap-4">
                <button type="submit" className="btn btn-primary w-24">
                    提交
                </button>
            </div>
        </form>
    )
}