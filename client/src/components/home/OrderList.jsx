import React from "react"
import { FaCheckDouble, FaCircle } from "react-icons/fa"

const OrderList = () => {
    return (
    <div className="flex items-center gap-4 mb-4 p-3 bg-[#1f1f1f] rounded-xl hover:bg-[#2a2a2a] transition">
        <button className="bg-[#f6b100] text-black font-bold w-12 h-12 rounded-lg flex items-center justify-center text-lg">
            RF
        </button>

        <div className="flex-1 flex justify-between items-center">
            <div>
                <h1 className="text-white text-base font-semibold">Ryan Febriansyah</h1>
                <p className="text-white/50 text-sm">8 menu</p>
            </div>

            <div>
                <span className="text-[#f6b100] font-medium border border-[#f6b100] rounded-lg px-3 py-1 text-xs">
                    Meja no: 3
                </span>
            </div>

            <div className="text-sm">
                <p className="text-green-500 flex items-end gap-2 font-medium">
                    <FaCheckDouble />Siap
                </p>
                <p className="text-white/50 flex items-center gap-1">
                    <FaCircle className="text-green-500 text-xs" />Siap disajikan
                </p>
            </div>
        </div>
    </div>
    )
}

export default OrderList