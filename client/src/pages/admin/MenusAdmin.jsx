import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // import toast
import { getMenus, addMenu, updateMenu, deleteMenu } from "../../https";
import Modal from "../../components/shared/Modal";

export default function MenusAdmin() {
  const [menus, setMenus] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", bgColor: "#1a1a1a" });

  const fetchMenus = async () => {
    try {
      const res = await getMenus();
      const data = res.data?.data || [];
      setMenus(data);
    } catch (err) {
      console.error("Error fetching menus:", err);
      setMenus([]);
      toast.error("Gagal fetch menu!");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleOpenModal = (menu = null) => {
    if (menu) {
      setEditing(menu);
      setForm({
        name: menu.name,
        bgColor: menu.bgColor,
        id: menu.id || menu._id,
      });
    } else {
      setEditing(null);
      setForm({ name: "", bgColor: "#1a1a1a" });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
  setModalOpen(false);
  setEditing(null);
  setForm({ name: "", bgColor: "#1a1a1a" });
};

  const handleSave = async () => {
    if (!form.name) return toast.error("Nama menu wajib diisi!");

    try {
      if (editing) {
        const menuId = editing.id || editing._id;
        if (!menuId) return toast.error("ID menu tidak ditemukan");
        await updateMenu(menuId, form);
        toast.success("Menu berhasil diupdate!");
      } else {
        await addMenu(form);
        toast.success("Menu berhasil ditambahkan!");
      }

      await fetchMenus();
      setModalOpen(false);
      setForm({ name: "", bgColor: "#1a1a1a" });
      setEditing(null);
    } catch (err) {
      console.error("Error saving menu:", err);
      toast.error(err.response?.data?.error || "Gagal simpan menu");
    }
  };

  const handleDelete = async (menu) => {
    const menuId = menu.id || menu._id;
    if (!menuId) return toast.error("ID menu tidak ditemukan");

    try {
      await deleteMenu(menuId);
      await fetchMenus();
      toast.success("Menu berhasil dihapus!");
    } catch (err) {
      console.error("Error deleting menu:", err);
      toast.error(err.response?.data?.error || "Gagal hapus menu");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Menus Admin</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 rounded text-white"
        onClick={() => handleOpenModal()}
      >
        Tambah Menu
      </button>

      <table className="w-full text-left border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 border border-gray-700">Nama</th>
            <th className="p-2 border border-gray-700">Warna</th>
            <th className="p-2 border border-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(menus) && menus.length > 0 ? (
            menus.map((menu) => (
              <tr key={menu.id || menu._id} className="hover:bg-gray-800">
                <td className="p-2 border border-gray-700">{menu.name}</td>
                <td className="p-2 border border-gray-700">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: menu.bgColor }}
                  />
                </td>
                <td className="p-2 border border-gray-700">
                  <button
                    className="px-2 py-1 bg-yellow-500 rounded mr-2"
                    onClick={() => handleOpenModal(menu)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 rounded"
                    onClick={() => handleDelete(menu)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-400 italic">
                Belum ada menu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
  isOpen={modalOpen}
  onClose={closeModal} // <--- ini fix tombol X
  title={editing ? "Edit Menu" : "Tambah Menu"}
      >
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded bg-gray-900 text-white w-full mb-2"
        />
        <input
          type="color"
          value={form.bgColor}
          onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <button
          className="w-full px-4 py-2 bg-blue-500 rounded text-white"
          onClick={handleSave}
        >
          {editing ? "Update" : "Tambah"}
        </button>
      </Modal>
    </div>
  );
}