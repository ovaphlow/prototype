'use client'

import { useActionState, useEffect, startTransition } from 'react'
import { activeOrder, Order, saveOrder, Schedule, suspendOrder } from './api'
import { useFormStatus } from 'react-dom'
import { redirect } from 'next/navigation'
import IconStop from '@/icon/stop'
import IconPlay from '@/icon/play'
import Link from 'next/link'

export function ScheduleForm({ initial }: { initial: Schedule }) {
    return (
        <form className="flex flex-col gap-2 w-full">
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
            <div className="grid gap-1 w-full">
                <label htmlFor="workshop">车间</label>
                <input
                    type="text"
                    name="workshop"
                    id="workshop"
                    defaultValue={JSON.parse(initial.detail).workshop || ''}
                    className="input input-bordered"
                />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="line">生产线</label>
                <input
                    type="text"
                    name="line"
                    id="line"
                    defaultValue={JSON.parse(initial.detail).line || ''}
                    className="input input-bordered"
                />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="bom_raw">原材料</label>
                <input
                    type="text"
                    name="bom_raw"
                    id="bom_raw"
                    defaultValue={JSON.parse(initial.detail).line || ''}
                    className="input input-bordered"
                />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="bom_semi">产出品</label>
                <input
                    type="text"
                    name="bom_semi"
                    id="bom_semi"
                    defaultValue={JSON.parse(initial.detail).line || ''}
                    className="input input-bordered"
                />
            </div>
            <button className="btn btn-primary">提交</button>
            <p className="text-center">
                <Link href="/order" className="btn btn-link px-2 py-1">
                    返回至订单
                </Link>
                <Link href="/schedule" className="btn btn-link px-2 py-1">
                    返回至生产计划
                </Link>
            </p>
        </form>
    )
}

export function ActiveButton({ id }: { id: string }) {
    const [state, action] = useActionState(activeOrder, { type: '', title: '', status: 0, detail: '', instance: '' })

    useEffect(() => {
        if (state.status === 0 || state.status >= 400) return
        location.reload()
    }, [state])

    return (
        <button onClick={() => startTransition(() => action(id))} className="btn btn-outline btn-success btn-sm">
            <IconPlay size={16} color="white" />
            激活
        </button>
    )
}

export function SuspendButton({ id }: { id: string }) {
    const [state, action] = useActionState(suspendOrder, { type: '', title: '', status: 0, detail: '', instance: '' })

    useEffect(() => {
        if (state.status === 0 || state.status >= 400) return
        location.reload()
    }, [state])

    return (
        <button onClick={() => startTransition(() => action(id))} className="btn btn-outline btn-error btn-sm">
            <IconStop size={16} color="white" />
            挂起
        </button>
    )
}

export function OrderForm({ initial }: { initial: Order }) {
    const [state, formAction] = useActionState(saveOrder, { type: '', title: '', status: 0, detail: '', instance: '' })

    useEffect(() => {
        if (state.status === 0 || state.status >= 400) return
        const timer = setTimeout(() => {
            redirect('/order')
        }, 3000)
        return () => clearTimeout(timer)
    }, [state])

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <div className="grid gap-1 w-full">
                <label htmlFor="product_id">产品</label>
                <input
                    type="text"
                    name="product_id"
                    id="product_id"
                    placeholder="产品"
                    defaultValue={initial.product_id}
                    className="input input-bordered"
                />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="quantity">数量</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="数量"
                    defaultValue={JSON.parse(initial.detail).quantity || 1}
                    className="input input-bordered"
                />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="due_date">交付日期</label>
                <input
                    type="date"
                    name="due_date"
                    id="due_date"
                    defaultValue={initial.due_date}
                    className="input input-bordered"
                />
            </div>
            <SubmitButton />
            <p role="status" className="text-center">
                {state?.title}
            </p>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending} className="btn btn-primary">
            保存
        </button>
    )
}
