'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { create } from '../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export function Form() {
    const [state, formAction] = useActionState(create, { type: '', title: '', status: 0, detail: '', instance: '' })

    useEffect(() => {
        if (state.status === 0 || state.status >= 400) return
        const timer = setTimeout(() => {
            redirect('/')
        }, 3000)
        return () => clearTimeout(timer)
    }, [state])

    return (
        <form action={formAction} className="flex flex-col gap-4 w-96">
            <div className="flex justify-between items-end">
                <h1 className="text-2xl font-bold italic text-slate-400">CREATE</h1>
                <Link href="/" className="text-slate-400">
                    返回
                </Link>
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="title" className="font-bold">
                    Title
                </label>
                <input type="text" name="title" id="title" className="border-2 rounded p-1" />
            </div>
            <div className="grid gap-1 w-full">
                <label htmlFor="content" className="font-bold">
                    Content
                </label>
                <input type="text" name="content" id="content" className="border-2 rounded p-1" />
            </div>
            <SubmitButton />
            <p role="status">{state?.title}</p>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className="border bg-violet-600 px-4 py-2 text-white font-bold rounded"
        >
            Submit
        </button>
    )
}
