import { Form } from '../component.client'

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params
    console.info(params)

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-200 m-4 p-4 rounded shadow border border-slate-600 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">生产计划</h2>
                </div>
                <Form
                    initial={{
                        id: '',
                        time: '',
                        state: '',
                        product_id: '',
                        workshop: '',
                        line: '',
                        starting_date: '',
                        detail: '{}',
                    }}
                />
            </div>
        </div>
    )
}
