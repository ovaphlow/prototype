'use client'

import Link from 'next/link'
import { Schedule } from './api'

export function Form({ initial }: { initial: Schedule }) {
    return (
        <form className="flex flex-col gap-2 w-full">
            <div className="grid gap-1 w-full">
                <label htmlFor="product_id">产品</label>
                <input
                    type="text"
                    name="product_id"
                    id="product_id"
                    defaultValue={initial.product_id}
                    readOnly
                    className="input input-bordered"
                />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="workshop">车间</label>
                <input
                    type="text"
                    name="workshop"
                    id="workshop"
                    defaultValue={initial.workshop}
                    className="input input-bordered"
                />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="line">生产线</label>
                <input type="text" name="line" id="line" defaultValue={initial.line} className="input input-bordered" />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="starting_date">日期</label>
                <input
                    type="date"
                    name="starting_date"
                    id="starting_date"
                    defaultValue={initial.starting_date || new Date().toISOString().split('T')[0]}
                    className="input input-bordered"
                />
            </div>
            <button className="btn btn-primary">提交</button>
            <p className="text-center">
                <button onClick={() => history.back()} className="btn btn-link px-2 py-1">
                    返回至订单
                </button>
                <Link href="/schedule" className="btn btn-link px-2 py-1">
                    返回至生产计划
                </Link>
            </p>
        </form>
    )
}
