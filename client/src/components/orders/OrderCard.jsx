import React from "react"

const OrderCard = ({ order }) => {
  return (
    <div className="w-full bg-[#262626] px-4 pt-4 pb-2 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="bg-[#f6b100] text-black font-bold w-12 h-12 rounded-lg flex items-center justify-center text-lg">
            {order.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </button>

          <div>
            <h1 className="text-white font-semibold">{order.name}</h1>
            <p className="text-white/50 text-sm">{order.orderNo} • Di tempat</p>
          </div>
        </div>

        <div className="text-right">
          <p
            className={`px-3 py-1 rounded-lg flex items-center gap-2 font-medium
            ${order.status === "ready" && "text-green-500 bg-[#2e4a40]"}
            ${order.status === "process" && "text-yellow-500 bg-[#4a4430]"}
            ${order.status === "finished" && "text-gray-400 bg-[#333333]"}
          `}>
            {order.status === "ready" && "✅ Siap"}
            {order.status === "process" && "⏳ Proses"}
            {order.status === "finished" && "✔️ Selesai"}
          </p>
          <p className="text-white/50 flex items-center gap-1 justify-end text-sm mt-1">
            {order.status === "ready" && "🟢 Siap disajikan"}
            {order.status === "process" && "🟡 Sedang dimasak"}
            {order.status === "finished" && "⚪ Pesanan selesai"}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 text-[#ababab] text-sm">
        <p>{order.date}</p>
        <p>{order.items} menu</p>
      </div>

      <hr className="border-gray-600 my-2" />

      <div className="flex items-center justify-between leading-none">
        <h1 className="text-[#f5f5f5] text-base font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-base font-semibold">
          Rp{order.total.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  )
}

export default OrderCard