const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Contoh: 'Makanan Utama', 'Minuman', dll.
    bgColor: { type: String, default: '#1a1a1a' }, // Untuk tampilan di frontend
    // Tidak perlu items di sini, items akan berada di ItemModel
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);