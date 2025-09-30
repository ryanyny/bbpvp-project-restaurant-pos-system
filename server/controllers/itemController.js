const mongoose = require("mongoose");
const Item = require("../models/itemModel");

const createItem = async (req, res) => {
  try {
    const { name, price, description, menuId } = req.body;

    if (!name || !price || !menuId) {
      return res.status(400).json({ error: "name, price, menuId wajib diisi" });
    }

    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ error: "menuId tidak valid" });
    }

    const item = await Item.create({
      name,
      price: Number(price),
      description,
      menuId,
    });

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("menuId");
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { name, price, description, menuId } = req.body;

    if (!name || !price || !menuId) {
      return res.status(400).json({ error: "name, price, menuId wajib diisi" });
    }
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return res.status(400).json({ error: "menuId tidak valid" });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, price: Number(price), description, menuId },
      { new: true }
    );

    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ success: true, message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createItem, getItems, updateItem, deleteItem };