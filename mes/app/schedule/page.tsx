import Link from 'next/link'
import { getScheduleList, Schedule } from './api'
import { format } from 'date-fns'
import IconPlay from '@/icon/play'

export default async function Page() {
    const scheduleList = await getScheduleList()

    return (
        <div className="flex flex-col p-4">
            <div className="bg-base-200 m-4 p-4 rounded shadow border border-slate-600">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">生产计划</h2>
                    <span>
                        {/* <Link href="/schedule/0" className="btn btn-secondary btn-sm">
                            新建
                        </Link> */}
                    </span>
                </div>
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td></td>
                            <td>#</td>
                            <td>订单</td>
                            <td>产品</td>
                            <td>开始日期</td>
                            <td>车间</td>
                            <td>生产线</td>
                            <td>原材料</td>
                            <td>产出品</td>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleList.map((schedule: Schedule, index: number) => (
                            <tr key={schedule.id}>
                                <td>
                                    <Link href="" className="btn btn-outline btn-sm btn-success">
                                        <IconPlay size={16} color="white" />
                                        分配
                                    </Link>
                                </td>
                                <td>{index + 1}</td>
                                <td>{schedule.order_id}</td>
                                <td>{schedule.product_id}</td>
                                <td>{format(schedule.starting_date, 'yyyy-MM-dd')}</td>
                                <td>{JSON.parse(schedule.detail).workshop}</td>
                                <td>{JSON.parse(schedule.detail).line}</td>
                                <td>{schedule.bom_id_raw}</td>
                                <td>{schedule.bom_id_semi}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
