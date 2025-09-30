import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getItems, addItem, updateItem, deleteItem, getMenus } from "../../https";
import Modal from "../../components/shared/Modal";

export default function ItemsAdmin() {
  const [items, setItems] = useState([]);
  const [menus, setMenus] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", menuId: "" });

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal fetch items");
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await getMenus();
      setMenus(res.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal fetch menus");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchMenus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.menuId) return toast.error("Pilih menu dulu!");
    try {
      await addItem({
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        menuId: form.menuId.toString(),
      });
      toast.success("Item berhasil ditambahkan!");
      setModalOpen(false);
      setForm({ name: "", description: "", price: "", menuId: "" });
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Gagal tambah item");
    }
  };

  const handleUpdate = async () => {
    if (!form.menuId) return toast.error("Pilih menu dulu!");
    try {
      await updateItem(editingItem._id, {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        menuId: form.menuId.toString(),
      });
      toast.success("Item berhasil diperbarui!");
      setModalOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Gagal update item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Item berhasil dihapus!");
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Gagal hapus item");
    }
  };

  const openAddModal = () => {
    setForm({ name: "", description: "", price: "", menuId: "" });
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      menuId: item.menuId?._id?.toString() || "",
    });
    setEditingItem(item);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Kategori Admin</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 rounded text-white"
        onClick={openAddModal}
      >
        Tambah Kategori
      </button>

      {items.length > 0 ? (
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">Nama</th>
              <th className="p-2 border border-gray-700">Deskripsi</th>
              <th className="p-2 border border-gray-700">Harga</th>
              <th className="p-2 border border-gray-700">Menu</th>
              <th className="p-2 border border-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-800">
                <td className="p-2 border border-gray-700">{item.name}</td>
                <td className="p-2 border border-gray-700">{item.description}</td>
                <td className="p-2 border border-gray-700">{item.price}</td>
                <td className="p-2 border border-gray-700">{item.menuId?.name || "-"}</td>
                <td className="p-2 border border-gray-700">
                  <button
                    className="px-2 py-1 bg-yellow-500 rounded mr-2"
                    onClick={() => openEditModal(item)}
                  >
                    Ubah
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 rounded"
                    onClick={() => handleDelete(item._id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-400">Belum ada item</p>
      )}

      {modalOpen && (
        <Modal
          title={editingItem ? "Ubah Kategori" : "Tambah Kategori"}
          onClose={() => setModalOpen(false)}
          isOpen={modalOpen}
        >
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
            className="p-2 border rounded bg-gray-900 text-white w-full mb-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Deskripsi"
            value={form.description}
            onChange={handleChange}
            className="p-2 border rounded bg-gray-900 text-white w-full mb-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Harga"
            value={form.price}
            onChange={handleChange}
            className="p-2 border rounded bg-gray-900 text-white w-full mb-2"
          />
          <select
            value={form.menuId}
            onChange={(e) => setForm({ ...form, menuId: e.target.value })}
            className="p-2 border rounded bg-gray-900 text-white w-full mb-2"
          >
            <option value="">-- pilih menu --</option>
            {menus.map((menu) => (
              <option key={menu._id} value={menu._id?.toString()}>
                {menu.name}
              </option>
            ))}
          </select>
          <button
            className="w-full px-4 py-2 bg-blue-500 rounded text-white"
            onClick={editingItem ? handleUpdate : handleAdd}
          >
            {editingItem ? "Ubah" : "Tambah"}
          </button>
        </Modal>
      )}
    </div>
  );
}