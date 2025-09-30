import { useEffect, useState } from "react";
import { getOrders } from "../../https";
import Modal from "../../components/shared/Modal";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: "Pending" });

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const handleUpdate = async () => {
  //   try {
  //     await updateOrder(editing._id, form);
  //     fetchOrders();
  //     setModalOpen(false);
  //     setEditing(null);
  //     setForm({ status: "Pending" });
  //   } catch (err) {
  //     console.error("Error updating order:", err);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteOrder(id);
  //     fetchOrders();
  //   } catch (err) {
  //     console.error("Error deleting order:", err);
  //   }
  // };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders Admin</h2>

      <table className="w-full text-left border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 border border-gray-700">Customer</th>
            <th className="p-2 border border-gray-700">Table</th>
            <th className="p-2 border border-gray-700">Items</th>
            <th className="p-2 border border-gray-700">Total</th>
            <th className="p-2 border border-gray-700">Status</th>
            <th className="p-2 border border-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-800">
              <td className="p-2 border border-gray-700">{order.customerName}</td>
              <td className="p-2 border border-gray-700">{order.table?.tableNo}</td>
              <td className="p-2 border border-gray-700">
                {order.items.map((it) => it.item?.name).join(", ")}
              </td>
              <td className="p-2 border border-gray-700">{order.totalPrice}</td>
              <td className="p-2 border border-gray-700">{order.status}</td>
              <td className="p-2 border border-gray-700">
                <button
                  className="px-2 py-1 bg-yellow-500 rounded mr-2"
                  onClick={() => {
                    // setEditing(order);
                    setForm({ status: order.status });
                    setModalOpen(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="px-2 py-1 bg-red-500 rounded"
                  // onClick={() => handleDelete(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          // setEditing(null);
        }}
        title="Update Order Status"
      >
        <select
          value={form.status}
          onChange={(e) => setForm({ status: e.target.value })}
          className="p-2 border rounded bg-gray-900 text-white w-full mb-2"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          className="w-full px-4 py-2 bg-blue-500 rounded text-white"
          // onClick={handleUpdate}
        >
          Update
        </button>
      </Modal>
    </div>
  );
}