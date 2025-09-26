import React from "react"

const Bill = () => {
    return (
    <>
    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Items (4)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp30.000</h1>
    </div>

    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Pajak (5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp30.000</h1>
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