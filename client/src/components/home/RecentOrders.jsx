import React from "react"
import {FaSearch} from "react-icons/fa"
import OrderList from "./OrderList"

const RecentOrders = () => {
    return (
        <div className="px-6 mt-6">
            <div className="bg-[#1a1a1a] w-full rounded-2xl shadow-md h-[500px] flex flex-col">
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                    <h1 className="text-white text-lg font-semibold">Pesanan Terbaru</h1>
                </div>

                <div className="flex items-center gap-3 bg-[#1f1f1f] rounded-xl px-5 py-3 mx-6 mt-4">
                    <FaSearch className="text-white/60" />
                    <input
                        type="text"
                        placeholder="Cari pesanan terbaru"
                        className="bg-transparent outline-none text-white/80 flex-1 placeholder-white/40" />
                    </div>

                <div className="mt-4 px-6 flex-1 overflow-y-auto scrollbar-hide">
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                </div>
            </div>
        </div>
    )
}

export default RecentOrders