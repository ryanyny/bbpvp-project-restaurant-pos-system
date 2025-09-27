import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";

const Orders = () => {
  const [status, setStatus] = useState("all");

  // Dummy data orders
  const ordersData = [
    { id: 1, name: "Ryan Febriansyah", orderNo: "#101", status: "ready", total: 120000, date: "18 Januari, 2025 13:30", items: 8 },
    { id: 2, name: "Budi Santoso", orderNo: "#102", status: "process", total: 95000, date: "18 Januari, 2025 13:45", items: 5 },
    { id: 3, name: "Siti Aminah", orderNo: "#103", status: "finished", total: 45000, date: "18 Januari, 2025 14:00", items: 3 },
    { id: 4, name: "Andi", orderNo: "#104", status: "ready", total: 200000, date: "18 Januari, 2025 14:10", items: 10 },
  ];

  // Filter sesuai status
  const filteredOrders = status === "all" 
    ? ordersData 
    : ordersData.filter(order => order.status === status);

  return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Pesanan</h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-around gap-4">
          <button 
            onClick={() => setStatus("all")} 
            className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838]"} rounded-lg px-5 py-2 font-semibold`}>
            Semua
          </button>
          <button 
            onClick={() => setStatus("process")} 
            className={`text-[#ababab] text-lg ${status === "process" && "bg-[#383838]"} rounded-lg px-5 py-2 font-semibold`}>
            Proses
          </button>
          <button 
            onClick={() => setStatus("ready")} 
            className={`text-[#ababab] text-lg ${status === "ready" && "bg-[#383838]"} rounded-lg px-5 py-2 font-semibold`}>
            Siap
          </button>
          <button 
            onClick={() => setStatus("finished")} 
            className={`text-[#ababab] text-lg ${status === "finished" && "bg-[#383838]"} rounded-lg px-5 py-2 font-semibold`}>
            Selesai
          </button>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-20 overflow-y-auto scrollbar-hide">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3">Tidak ada pesanan</p>
        )}
      </div>
      
      <BottomNav />
    </section>
  );
};

export default Orders;