'use client'

export default function Error({ error }: { error: Error & { digset?: string } }) {
    return (
        <div className="flex flex-col p-4">
            <p className="font-bold text-xl">出错啦！</p>
            <p className="italic">{error.message}</p>
            <p>
                <br />
                <button type="button" className="btn btn-accent" onClick={() => location.reload()}>
                    重新加载
                </button>
            </p>
        </div>
    )
}
