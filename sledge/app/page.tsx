import { IconTicket } from "@/components/Icons"

export default function Home() {
    return (
        <>
            <Carousel />
            <QuickNav />
            <div>1123</div>
        </>
    )
}

function QuickNav() {
    const iconColor = 'rgb(167 139 250)'

    return (
        <div className="flex justify-around p-3">
            <div className="flex flex-col items-center">
                <div className="bg-base-300 rounded-full w-12 h-12 items-center justify-center">
                    <IconTicket size={'2rem'} color={iconColor} />
                </div>
                <span className="text-sm">景区票务</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-base-300 rounded-full w-12 h-12 flex items-center justify-center"></div>
                <span className="text-sm">酒店民宿</span>
            </div>
        </div>
    )
}

function Carousel() {
    return (
        <div className="carousel w-full" style={{ height: '10rem' }}>
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle btn-sm">
                        ❮
                    </a>
                    <a href="#slide2" className="btn btn-circle btn-sm">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle btn-sm">
                        ❮
                    </a>
                    <a href="#slide3" className="btn btn-circle btn-sm">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle btn-sm">
                        ❮
                    </a>
                    <a href="#slide4" className="btn btn-circle btn-sm">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle btn-sm">
                        ❮
                    </a>
                    <a href="#slide1" className="btn btn-circle btn-sm">
                        ❯
                    </a>
                </div>
            </div>
        </div>
    )
}
