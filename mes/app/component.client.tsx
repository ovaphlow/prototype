'use client'

export function BackwardButton() {
    return (
        <button className="btn btn-outline btn-sm w-16 mb-4" onClick={() => history.back()}>
            返回
        </button>
    )
}
