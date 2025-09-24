import React, { useState } from "react"
import BackButton from "../components/shared/BackButton"
import BottomNav from "../components/shared/BottomNav"
import TableCard from "../components/tables/TableCard"
import { tables } from "../constants"

const Tables = () => {
    const [status, setStatus] = useState("all")
    
    const filteredTables = status === "all" 
    ? tables 
    : tables.filter((t) => t.status.toLowerCase() === status)
    
    return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
        <div className="flex items-center justify-between px-10 py-4">
            <div className="flex items-center gap-4">
                <BackButton />
                <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Meja</h1>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg ${
                    status === "all" && "bg-[#383838]"
                    }`}>
                        Semua
                </button>
                <button onClick={() => setStatus("booked")} className={`text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg ${
                    status === "booked" && "bg-[#383838]"
                    }`}>
                        Dipesan
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredTables.map((table) => (
                <TableCard 
                    key={table.id}
                    name={table.name}
                    status={table.status}
                    initials={table.initial} />
                    ))}
        </div>
        
        <BottomNav />
    </section>
    )
}

export default Tables