import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
    return (
        <div className="bg-[#1a1a1a] flex-1 py-6 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
                <h1 className="text-white/90 text-base font-semibold">{title}</h1>
                <div
                    className={`${
                        title === "Total Pendapatan" ? "bg-[#02ca3a]" : "bg-[#f6b100]"
                    } p-3 rounded-xl text-white text-xl`}>
                        {icon}
                </div>
            </div>

            <div className="mt-5">
                <h1 className="text-white text-3xl font-bold">
                    {title === "Total Pendapatan" ? `Rp${number}` : number}
                </h1>
                <p className="text-sm mt-2 text-white/70">
                    <span className="text-[#02ca3a] font-semibold">{footerNum}%</span>{" "}
                        dari kemarin
                    </p>
            </div>
        </div>
    )
}

export default MiniCard