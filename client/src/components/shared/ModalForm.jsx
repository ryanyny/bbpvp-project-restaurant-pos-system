import React, {
  useState,
  useEffect} from "react"

const ModalForm = ({ title, initialData = {}, menus = [], onClose, onSubmit }) => {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Nama Item"
            className="p-2 rounded bg-[#262626] text-white"
          />
          <input
            name="price"
            type="number"
            value={form.price || ""}
            onChange={handleChange}
            placeholder="Harga"
            className="p-2 rounded bg-[#262626] text-white"
          />
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="p-2 rounded bg-[#262626] text-white"
          />
          <select
            name="menuId"
            value={form.menuId || ""}
            onChange={handleChange}
            className="p-2 rounded bg-[#262626] text-white"
            required
          >
            <option value="">-- Pilih Menu --</option>
            {menus.map((menu) => (
              <option key={menu._id} value={menu._id}>
                {menu.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm