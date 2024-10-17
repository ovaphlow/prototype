'use client'

import { useState } from 'react'
import { Procedure, saveProcedure, updateProcedure } from './api'

export function Form({ initial }: { initial: Procedure }) {
    const [procedure, setProcedure] = useState<Procedure>(initial)
    const [detail, setDetail] = useState({
        name: '',
        seq: '',
    })

    const handleSubmitProcedure = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!procedure.id || procedure.id === '0') {
            await saveProcedure({ ...procedure, detail: JSON.stringify(detail) })
        } else {
            await updateProcedure(procedure.id, { ...procedure, detail: JSON.stringify(detail) })
        }
        alert('保存成功')
    }

    return (
        <form onSubmit={handleSubmitProcedure} className="flex flex-col gap-4">
            <input
                type="text"
                className="input input-bordered"
                placeholder="编号"
                value={procedure.sn}
                onChange={(e) => setProcedure((prev: typeof procedure) => ({ ...prev, sn: e.target.value }))}
            />
            <input
                type="text"
                className="input input-bordered"
                placeholder="名称"
                value={detail.name}
                onChange={(e) => setDetail((prev: typeof detail) => ({ ...prev, name: e.target.value }))}
            />
            <input
                type="text"
                className="input input-bordered"
                placeholder="顺序"
                value={detail.seq}
                onChange={(e) => setDetail((prev: typeof detail) => ({ ...prev, seq: e.target.value }))}
            />
            <button type="submit" className="btn btn-primary">
                保存
            </button>
        </form>
    )
}
