// MenuContainer.jsx
import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
// import { menus } from "../../constants"; // Hapus import ini
import BackButton from "../../components/shared/BackButton";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slice/cartSlice";
import axios from "axios"; // Tambahkan axios

const MenuContainer = () => {
    // Tambahkan state baru untuk menyimpan data menu dari API
    const [allMenus, setAllMenus] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selected, setSelected] = useState(null); // Ubah initial state menjadi null
    const [itemCount, setItemCount] = useState(0);
    const [itemId, setItemId] = useState();
    const dispatch = useDispatch();

    // Efek untuk mengambil data menu dari API
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                // Ganti URL sesuai dengan alamat API backend Anda
                const res = await axios.get("http://localhost:8000/api/menus"); 
                const data = res.data.data;

                setAllMenus(data);
                if (data.length > 0) {
                    setSelected(data[0]); // Atur menu pertama sebagai yang terpilih
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch menus:", err);
                setError("Gagal memuat data menu.");
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    const increment = (id) => {
        setItemId(id);
        setItemCount((prev) => prev + 1);
    };

    const decrement = (id) => {
        setItemId(id);
        if (itemCount <= 0) return;
        setItemCount((prev) => prev - 1);
    };

    const handleAddToCart = (item) => {
        if(itemCount === 0) return

        // PENTING: ID yang digunakan di sini adalah ID dari database (MongoDB ObjectId)
        const { _id, name, price } = item; 
        const newObj = { 
            // Gunakan _id dari database untuk konsistensi Midtrans
            _id: _id, 
            name, 
            pricePerQuantity: price, 
            quantity: itemCount, 
            price: price * itemCount
        };

        dispatch(addItems(newObj));
        setItemCount(0);
    }

    if (loading) {
        return <div className="p-10 text-white">Memuat menu...</div>;
    }

    if (error) {
        return <div className="p-10 text-red-500">{error}</div>;
    }

    // Jika allMenus atau selected masih kosong/null
    if (!selected) {
        return <div className="p-10 text-white">Tidak ada menu yang ditemukan.</div>;
    }


    return (
        <div className="flex-[3]">
            {/* Header */}
            <div className="flex items-center gap-4 px-10 pt-4">
                <BackButton />
                <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Menu</h1>
            </div>

            {/* Category Section */}
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
                {/* Gunakan allMenus */}
                {allMenus.map((menu) => { 
                    return (
                        <div
                            key={menu.id} // Tetap gunakan id karena sudah dimapping di backend
                            onClick={() => {
                                setSelected(menu);
                                setItemId(menu.id);
                                setItemCount(0);
                            }}
                            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
                            style={{ backgroundColor: menu.bgColor }}
                        >
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                                    {menu.name}
                                </h1>
                                {selected.id === menu.id && (
                                    <GrRadialSelected className="text-white" size={20} />
                                )}
                            </div>
                            <p className="text-[#ababab] text-sm font-semibold">
                                {menu.items.length} Items
                            </p>
                        </div>
                    );
                })}
            </div>

            <hr className="border-[#2a2a2a] border-t-2 mt-4" />

            {/* Item Section */}
            <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
                {/* Gunakan selected?.items */}
                {selected?.items.map((item) => { 
                    return (
                        <div
                            key={item._id} // Gunakan _id (MongoDB)
                            className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
                        >
                            {/* ... (bagian lain dari item) ... */}
                            <div className="flex items-center justify-between w-full">
                                <h1 className="text-[#f5f5f5] text-sm font-semibold">
                                    {item.name}
                                </h1>
                                <button 
                                    onClick={() => handleAddToCart(item)} 
                                    className="bg-[#2e4a40] text-[#02ca3a] p-1 rounded-full cursor-pointer"
                                >
                                    <FaShoppingCart size={20} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#ababab] text-sm font-semibold">
                                    Rp{item.price}
                                </p>
                            </div>

                            <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6">
                                <button
                                    onClick={() => decrement(item._id)} // Gunakan _id
                                    className="text-yellow-500 text-2xl"
                                >
                                    &minus;
                                </button>
                                <span className="text-white">
                                    {/* Gunakan item._id untuk perbandingan */}
                                    {itemId === item._id ? itemCount : "0"} 
                                </span>
                                <button
                                    onClick={() => increment(item._id)} // Gunakan _id
                                    className="text-yellow-500 text-2xl"
                                >
                                    &#43;
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MenuContainer;