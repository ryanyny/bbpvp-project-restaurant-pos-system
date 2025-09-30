import React, {useState, useEffect} from "react"
import BottomNav from "../components/shared/BottomNav"
import OrderCard from "../components/orders/OrderCard"
import BackButton from "../components/shared/BackButton"
import { getOrders } from "../https"

const Orders = () => {
  const [status, setStatus] = useState("all")
  const [ordersData, setOrdersData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrders();
        if (res.data && res.data.success) {
          const formatted = res.data.data.map((o) => ({
            id: o._id,
            name: o.customerDetails.name,
            orderNo: `#${o._id.slice(-4)}`,
            status:
              o.orderStatus === "tertunda"
                ? "process"
                : o.orderStatus === "memasak"
                ? "process"
                : o.orderStatus === "disajikan"
                ? "ready"
                : o.orderStatus === "dibayar"
                ? "finished"
                : "finished",
            total: o.bills.totalWithTax,
            date: new Date(o.orderDate).toLocaleString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            items: o.items.length,
          }))
          setOrdersData(formatted)
        } else {
          setError("Gagal mengambil data pesanan")
        }
      } catch (err) {
        setError(err.message || "Terjadi kesalahan server")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders =
    status === "all"
      ? ordersData
      : ordersData.filter((order) => order.status === status)

  return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Pesanan
          </h1>
        </div>

        <div className="flex items-center justify-around gap-4">
          {["all", "process", "ready", "finished"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`text-[#ababab] text-lg ${
                status === s && "bg-[#383838]"
              } rounded-lg px-5 py-2 font-semibold`}>
              {s === "all"
                ? "Semua"
                : s === "process"
                ? "Proses"
                : s === "ready"
                ? "Siap"
                : "Selesai"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-20 overflow-y-auto scrollbar-hide">
        {loading ? (
          <p className="text-gray-400 text-center col-span-3">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center col-span-3">{error}</p>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-3">
            Tidak ada pesanan
          </p>
        )}
      </div>

      <BottomNav />
    </section>
  )
}

export default Orders