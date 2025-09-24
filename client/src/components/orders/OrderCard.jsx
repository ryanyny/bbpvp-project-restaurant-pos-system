import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";

const OrderCard = () => {
    return (
    <div className="w-full bg-[#262626] px-4 pt-4 pb-2 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button className="bg-[#f6b100] text-black font-bold w-12 h-12 rounded-lg flex items-center justify-center text-lg">
                    RF
                </button>

                <div>
                    <h1 className="text-white font-semibold">Ryan Febriansyah</h1>
                    <p className="text-white/50 text-sm">#101 • Dine in</p>
                </div>
            </div>
            
            <div className="text-right">
                <p className="text-green-500 bg-[#2e4a40] px-3 py-1 rounded-lg flex items-center gap-2 font-medium">
                    ✅ Siap
                </p>
                <p className="text-white/50 flex items-center gap-1 justify-end text-sm mt-1">
                    🟢 Siap disajikan
                </p>
            </div>
        </div>
        
        <div className="flex justify-between items-center mt-3 text-[#ababab] text-sm">
            <p>18 Januari, 2025 13:30</p>
            <p>8 menu</p>
        </div>

        <hr className="border-gray-600 my-2" />

        <div className="flex items-center justify-between leading-none">
            <h1 className="text-[#f5f5f5] text-base font-semibold">Total</h1>
            <p className="text-[#f5f5f5] text-base font-semibold">Rp120.000</p>
        </div>
    </div>
    );
};

export default OrderCard;