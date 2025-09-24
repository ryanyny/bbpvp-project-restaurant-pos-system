import React from "react"
import { useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { MdOutlineReorder, MdTableBar } from "react-icons/md"
import { CiCircleMore } from "react-icons/ci"
import {BiSolidDish} from "react-icons/bi"

const BottomNav = () => {
    const navigate = useNavigate()

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around z-50">
            <button onClick={() => navigate("/")} className="flex items-center justify-center text-[#f5f5f5] bg-[#343434] w-[200px] rounded-[20px]">
                <FaHome className="inline-mr-2" size={20} />Beranda
            </button>
            <button onClick={() => navigate("/orders")} className="flex items-center justify-center text-[#ababab]">
                <MdOutlineReorder className="inline-mr-2" size={20} />Pesanan
            </button>
            <button onClick={() => navigate("/tables")} className="flex items-center justify-center text-[#ababab]">
                <MdTableBar className="inline-mr-2" size={20} />Meja
            </button>
            <button className="flex items-center justify-center text-[#ababab]">
                <CiCircleMore className="inline-mr-2" size={20} />Lainnya
            </button>

            <button className="absolute bottom-6 bg-[#f6b100] text-[#f5f5f5] rounded-full p-3 items-center">
                <BiSolidDish size={30} />
            </button>
        </div>
    )
}

export default BottomNav