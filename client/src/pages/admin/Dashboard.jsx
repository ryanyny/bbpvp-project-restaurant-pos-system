import React, {useState} from "react"
import ItemsAdmin from "./ItemsAdmin"
import MenusAdmin from "./MenusAdmin"
import TablesAdmin from "./TablesAdmin"
import OrdersAdmin from "./OrdersAdmin"

const Dashboard = () => {
  const [tab, setTab] = useState("kategori")

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white p-4">
      <nav className="flex gap-4 mb-4">
        {["kategori", "menu", "meja"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-blue-500" : "bg-gray-700"
            }`}>
            {t.toUpperCase()}
          </button>
        ))}
      </nav>

      <div className="mt-4">
        {tab === "kategori" && <ItemsAdmin />}
        {tab === "menu" && <MenusAdmin />}
        {tab === "meja" && <TablesAdmin />}
      </div>
    </div>
  )
}

export default Dashboard