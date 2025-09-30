import React from "react"

const ItemCardAdmin = ({ item, onEdit, onDelete }) => (
  <div className="bg-[#262626] rounded p-4 flex flex-col justify-between shadow">
    <h3 className="text-white font-semibold">{item.name}</h3>
    <p className="text-[#ababab]">Harga: Rp{Number(item.price).toLocaleString()}</p>  
    <div className="mt-2 flex justify-end gap-2">
      <button onClick={onEdit} className="px-3 py-1 bg-yellow-500 rounded">
        Edit
      </button>
      <button onClick={onDelete} className="px-3 py-1 bg-red-500 rounded">
        Hapus
      </button>
    </div>
  </div>
)

export default ItemCardAdmin