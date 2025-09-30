import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTables, addTable, updateTable, deleteTable } from "../../https";
import Modal from "../../components/shared/Modal";

export default function TablesAdmin() {
  const [tables, setTables] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [form, setForm] = useState({ tableNo: "", seats: "", status: "Tersedia", currentOrder: "" });

  const fetchTables = async () => {
    try {
      const res = await getTables();
      setTables(res.data?.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchTables(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    if (!form.tableNo || !form.seats) return toast.error("Isi tableNo & seats!");
    try {
      await addTable({ tableNo: Number(form.tableNo), seats: Number(form.seats) });
      toast.success("Table berhasil ditambahkan!");
      setModalOpen(false);
      setForm({ tableNo: "", seats: "", status: "Tersedia", currentOrder: "" });
      fetchTables();
    } catch (err) { toast.error(err.response?.data?.error || "Gagal tambah table"); }
  };

  const handleUpdate = async () => {
    if (!form.tableNo || !form.seats) return toast.error("Isi tableNo & seats!");
    try {
      await updateTable(editingTable._id, {
        tableNo: Number(form.tableNo),
        seats: Number(form.seats),
        status: form.status,
        currentOrder: form.currentOrder || null
      });
      toast.success("Table berhasil diperbarui!");
      setModalOpen(false);
      setEditingTable(null);
      fetchTables();
    } catch (err) { toast.error(err.response?.data?.error || "Gagal update table"); }
  };

  const handleDelete = async (id) => {
    try { await deleteTable(id); toast.success("Table berhasil dihapus!"); fetchTables(); }
    catch (err) { toast.error(err.response?.data?.error || "Gagal hapus table"); }
  };

  const openAddModal = () => { setForm({ tableNo: "", seats: "", status: "Tersedia", currentOrder: "" }); setEditingTable(null); setModalOpen(true); };
  const openEditModal = (t) => { setForm({ tableNo: t.tableNo, seats: t.seats, status: t.status, currentOrder: t.currentOrder?._id || "" }); setEditingTable(t); setModalOpen(true); };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tables Admin</h2>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={openAddModal}>Tambah Table</button>

      {tables.length > 0 ? (
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">TableNo</th>
              <th className="p-2 border border-gray-700">Seats</th>
              <th className="p-2 border border-gray-700">Status</th>
              <th className="p-2 border border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(t => (
              <tr key={t._id} className="hover:bg-gray-800">
                <td className="p-2 border border-gray-700">{t.tableNo}</td>
                <td className="p-2 border border-gray-700">{t.seats}</td>
                <td className="p-2 border border-gray-700">{t.status}</td>
                <td className="p-2 border border-gray-700">
                  <button className="px-2 py-1 bg-yellow-500 mr-2 rounded" onClick={() => openEditModal(t)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 rounded" onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p className="text-gray-400">Belum ada table</p>}

      {modalOpen && (
        <Modal title={editingTable ? "Edit Table" : "Tambah Table"} onClose={() => setModalOpen(false)} isOpen={modalOpen}>
          <input type="number" name="tableNo" placeholder="Table No" value={form.tableNo} onChange={handleChange} className="p-2 border rounded w-full mb-2 bg-gray-900 text-white"/>
          <input type="number" name="seats" placeholder="Seats" value={form.seats} onChange={handleChange} className="p-2 border rounded w-full mb-2 bg-gray-900 text-white"/>
          {editingTable && (
            <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded w-full mb-2 bg-gray-900 text-white">
              <option value="Tersedia">Tersedia</option>
              <option value="Terisi">Terisi</option>
            </select>
          )}
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded" onClick={editingTable ? handleUpdate : handleAdd}>
            {editingTable ? "Update" : "Tambah"}
          </button>
        </Modal>
      )}
    </div>
  );
}