// controllers/menuController.js
const Menu = require('../models/menuModel');
const Item = require('../models/itemModel');

const getAllMenusWithItems = async (req, res, next) => {
    try {
        // 1. Ambil semua kategori Menu
        const menus = await Menu.find({});

        // 2. Ambil semua Item
        const items = await Item.find({});

        // 3. Gabungkan Item ke dalam kategori Menu yang sesuai (seperti di constants Anda)
        const combinedMenus = menus.map(menu => {
            const menuObject = menu.toObject();
            menuObject.items = items.filter(item => 
                item.menuId.equals(menu._id)
            ).map(item => item.toObject()); // Pastikan menggunakan toObject() jika diperlukan
            
            // Ubah _id item menjadi id agar konsisten dengan struktur frontend lama
            menuObject.items = menuObject.items.map(item => ({
                ...item,
                id: item._id.toString()
            }));

            // Ubah _id menu menjadi id
            menuObject.id = menuObject._id.toString();
            delete menuObject._id;

            return menuObject;
        });

        res.status(200).json({ success: true, data: combinedMenus });
    } catch (error) {
        console.error('Error fetching menus and items:', error);
        next(error);
    }
};

// Fungsi untuk membuat Kategori Baru (Menu)
const createMenu = async (req, res, next) => {
    try {
        const { name, bgColor } = req.body;
        // Opsional: Cek apakah menu sudah ada
        const existingMenu = await Menu.findOne({ name });
        if (existingMenu) {
            return res.status(400).json({ success: false, message: 'Menu category already exists' });
        }

        const menu = new Menu({ name, bgColor });
        await menu.save();
        res.status(201).json({ success: true, data: menu });
    } catch (error) {
        // console.error('Error creating menu:', error);
        next(error);
    }
};

// Fungsi untuk membuat Item (Produk) Baru
const createItem = async (req, res, next) => {
    try {
        const { name, price, description, menuId } = req.body;

        // Pastikan menuId yang ditautkan itu ada
        const menuExists = await Menu.findById(menuId);
        if (!menuExists) {
            return res.status(404).json({ success: false, message: 'Menu ID not found' });
        }

        const item = new Item({ name, price, description, menuId });
        await item.save();
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        // console.error('Error creating item:', error);
        next(error);
    }
};

// Update Menu
const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bgColor } = req.body;

    const menu = await Menu.findByIdAndUpdate(
      id,
      { name, bgColor },
      { new: true }
    );

    if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });

    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    next(err);
  }
};

// Delete Menu
const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByIdAndDelete(id);

    if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });

    res.status(200).json({ success: true, message: "Menu deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllMenusWithItems, createMenu, createItem, updateMenu, deleteMenu };