import React from "react"
import { useSelector } from "react-redux"
import { getTotalPrice } from "../../redux/slice/cartSlice"

const Bill = () => {
    const cartData = useSelector(state => state.cart)
    const total = useSelector(getTotalPrice)
    const taxRate = 1
    const tax = (total * taxRate) / 100
    const totalPriceWithTax = total + tax

    return (
    <>
    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Items ({cartData.length})</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp{total.toFixed(2)}</h1>
    </div>

    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Pajak (5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp{tax.toFixed(2)}</h1>
    </div>

    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Total dengan Pajak</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp{totalPriceWithTax.toFixed(2)}</h1>
    </div>

    <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">Tunai</button>
        <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">Online</button>
    </div>

    <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-2 py-2 w-full rounded-lg text-[#f5f5f5] font-semibold text-md">Cetak Struk</button>
        <button className="bg-[#f6b100] px-2 py-2 w-full rounded-lg text-[#1f1f1f] font-semibold text-md">Kirim</button>
    </div>
    </>
    )
}

export default Bill