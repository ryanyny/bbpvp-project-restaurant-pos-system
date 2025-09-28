// models/itemModel.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true // Tautkan item ke kategori Menu
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);