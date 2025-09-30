const Table = require("../models/tableModel");
const mongoose = require("mongoose");

// Create Table
const createTable = async (req, res) => {
  try {
    const { tableNo, seats } = req.body;

    if (!tableNo || !seats)
      return res.status(400).json({ error: "tableNo & seats wajib diisi" });

    const existing = await Table.findOne({ tableNo });
    if (existing)
      return res.status(400).json({ error: "tableNo sudah ada" });

    const table = await Table.create({ tableNo, seats });
    res.status(201).json({ success: true, data: table });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Tables
const getTables = async (req, res) => {
  try {
    const tables = await Table.find().populate("currentOrder");
    res.json({ success: true, data: tables });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Table
const updateTable = async (req, res) => {
  try {
    const { tableNo, seats, status, currentOrder } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "ID tidak valid" });

    if (status && !["Tersedia", "Terisi"].includes(status))
      return res.status(400).json({ error: "status tidak valid" });

    const table = await Table.findByIdAndUpdate(
      id,
      { tableNo, seats, status, currentOrder: currentOrder || null },
      { new: true }
    );

    if (!table) return res.status(404).json({ error: "Table tidak ditemukan" });
    res.json({ success: true, data: table });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Table
const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "ID tidak valid" });

    const table = await Table.findByIdAndDelete(id);
    if (!table) return res.status(404).json({ error: "Table tidak ditemukan" });

    res.json({ success: true, message: "Table deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTable, getTables, updateTable, deleteTable };