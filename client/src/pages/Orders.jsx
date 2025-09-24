import React from "react"
import { useState } from "react"
import BottomNav from "../components/shared/BottomNav"
import OrderCard from "../components/orders/OrderCard"
import BackButton from "../components/shared/BackButton"

const Orders = () => {
    const [status, setStatus] = useState("semua")

    return (
        <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
            <div className="flex items-center justify-between px-10 py-4">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Pesanan</h1>
                </div>

                <div className="flex items-center justify-around gap-4">
                    <button 
                        onClick={() => setStatus("semua")} 
                        className={`text-[#ababab] text-lg ${status === "semua" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>
                        Semua
                    </button>
                    <button 
                        onClick={() => setStatus("proses")} 
                        className={`text-[#ababab] text-lg ${status === "proses" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>
                        Proses
                    </button>
                    <button 
                        onClick={() => setStatus("siap")} 
                        className={`text-[#ababab] text-lg ${status === "siap" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>
                        Siap
                    </button>
                    <button 
                        onClick={() => setStatus("selesai")} 
                        className={`text-[#ababab] text-lg ${status === "selesai" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>
                        Selesai
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16 py-4 overflow-y-auto scrollbar-hide flex-1">
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
            
            <BottomNav />
        </section>
    )
}

export default Orders