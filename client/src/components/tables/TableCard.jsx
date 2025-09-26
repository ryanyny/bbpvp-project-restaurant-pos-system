import React from "react"
import { useNavigate } from "react-router-dom"

const TableCard = ({ name, status, initials, seats }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if(status === "Booked") return

        navigate(`/menu`)
    }
    return (
    <div onClick={handleClick} className="bg-[#262626] px-4 py-5 rounded-lg shadow-md flex flex-col justify-between h-40">
        <div className="flex items-center justify-between">
            <h1 className="text-[#f5f5f5] text-lg font-semibold">{name}</h1>
            <span className={`text-sm font-medium px-2 py-1 rounded-lg ${status === "Booked" ? "bg-[#1f3d2b] text-green-400": "bg-[#4a3a1d] text-yellow-400"}`}>
                {status}
            </span>
        </div>

        <div className="flex items-center justify-center">
            <div className={`rounded-full w-14 h-14 flex items-center justify-center text-white font-semibold text-lg ${
                initials === "AM" || initials === "PL" || initials === "SB"
                    ? "bg-blue-600" : initials === "RT" || initials === "DP" || initials === "NK" || initials === "EK" || initials === "JS"
                    ? "bg-green-600" : initials === "QN" || initials === "ON"
                    ? "bg-yellow-600" : "bg-red-600"
                }`}>
                    {initials}
            </div>
            <p className="text-[#ababab] text-xs">Kursi: <span className="text-[#f5f5f5]">{seats}</span></p>
        </div>
    </div>
    )
}

export default TableCard