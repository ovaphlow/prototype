import { ScheduleForm } from '@/app/order/component.client'
import Link from 'next/link'

export default async function Page({ params }: { params: Promise<{ orderId: string; scheduleId: string }> }) {
    const { orderId, scheduleId } = await params

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-200 m-4 p-4 rounded shadow border border-slate-600 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">生产计划</h1>
                    <Link href="/order" className="btn btn-outline btn-sm w-16 mb-4">
                        返回
                    </Link>
                </div>
                <ScheduleForm
                    initial={{
                        id: '',
                        time: '',
                        state: '',
                        starting_date: '',
                        order_id: orderId,
                        product_id: '',
                        bom_id_raw: '',
                        bom_id_semi: '',
                        detail: '{}',
                    }}
                />
            </div>
        </div>
    )
}
