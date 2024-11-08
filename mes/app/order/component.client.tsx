'use client'

import { useActionState, useEffect, startTransition } from 'react'
import { activeOrder, Order, saveOrder, suspendOrder } from './api'
import { useFormStatus } from 'react-dom'
import { redirect } from 'next/navigation'
import IconStop from '@/icon/stop'
import IconPlay from '@/icon/play'

export function ActiveButton({ id }: { id: string }) {
    const [state, action] = useActionState(activeOrder, { type: '', title: '', status: 0, detail: '', instance: '' })

    useEffect(() => {
        if (state.status === 0 || state.status >= 400) return
        location.reload()
    }, [state])

    return (
        <button
            onClick={() => startTransition(() => action(id))}
            className="btn btn-outline btn-success btn-sm"
        >
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
        <button
            onClick={() => startTransition(() => action(id))}
            className="btn btn-outline btn-error btn-sm"
        >
            <IconStop size={16} color="white" />
            挂起
        </button>
    )
}

export function Form({ initial }: { initial: Order }) {
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
            <p role="status" className="text-center">{state?.title}</p>
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
