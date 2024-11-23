import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'MES by ovaphlow',
    description: 'mes system',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="zh" data-theme="night">
            <body className="flex min-h-screen">
                <aside className="w-64 bg-slate-800 fixed h-full overflow-y-auto">
                    <h1 className="text-4xl font-bold p-3" style={{ height: '64px' }}>
                        MES
                    </h1>
                    <ul className="menu rounded-box w-64">
                        <li>
                            <h2 className="menu-title">首页</h2>
                            <ul>
                                <li>
                                    <Link href="/">DASHBOARD</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="menu-title">系统</h2>
                            <ul>
                                <li>
                                    <a>组织结构</a>
                                </li>
                                <li>
                                    <a>人员及角色</a>
                                </li>
                                <li>
                                    <a>设备资源</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="menu-title">产品</h2>
                            <ul>
                                <li>
                                    <Link href="/product">产品定义</Link>
                                </li>
                                <li>
                                    <Link href="/bom">物料结构(BOM)</Link>
                                </li>
                                <li>
                                    <Link href="/process-route">工艺路线</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="menu-title">生产计划与调度</h2>
                            <ul>
                                <li>
                                    <Link href="/order">订单</Link>
                                </li>
                                <li>
                                    <Link href="/schedule">生产计划</Link>
                                </li>
                                <li>
                                    <Link href="/dispatch">调度指令</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="menu-title">生产过程</h2>
                            <ul>
                                <li>
                                    <a>在制品</a>
                                </li>
                                <li>
                                    <a>设备运行数据</a>
                                </li>
                                <li>
                                    <a>质量检测</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h2 className="menu-title">库存</h2>
                            <ul>
                                <li>
                                    <a>原材料</a>
                                </li>
                                <li>
                                    <a>半成品</a>
                                </li>
                                <li>
                                    <a>成品</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                <main className="flex flex-col flex-1" style={{ marginLeft: '256px' }}>
                    <header className="bg-base-300">
                        <div className="navbar">
                            <div className="navbar-start"></div>
                            <div className="navbar-center">
                                <a className="btn btn-ghost text-xl">USER</a>
                            </div>
                            <div className="navbar-end">
                                <button className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <span className="badge badge-xs badge-primary indicator-item"></span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </header>
                    <div className="flex-1">{children}</div>
                    <footer className="footer footer-center bg-base-300 text-base-content p-4">
                        <aside>
                            <p>Copyright © {new Date().getFullYear()} - All right reserved by ovaphlow.</p>
                        </aside>
                    </footer>
                </main>
            </body>
        </html>
    )
}
