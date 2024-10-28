'use server'

export async function list() {
    return [
        { id: 1, title: 'title1', content: 'content1' },
        { id: 2, title: 'title2', content: 'content2' },
        { id: 3, title: 'title3', content: 'content3' },
    ]
}

export async function create(
    prevState: { type: string; title: string; status: number; detail: string; instance: string },
    formData: FormData,
) {
    const raw = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
    }
    console.info(raw)

    if (!raw['title']) {
        console.info(raw['title'])
        return { type: 'about:blank', title: 'Title不能为空', status: 400, detail: '', instance: '' }
    }

    return { type: 'about:blank', title: '数据已提交至服务器 稍后自动跳转', status: 201, detail: '', instance: '' }
}
