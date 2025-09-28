const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
    tableNo: {type: Number, required: true, unique: true},
    status: {
        type: String,
        default: "Tersedia",
    },
    seats: {
        type: Number,
        required: true
    },
    currentOrder: {type: mongoose.Schema.Types.ObjectId, ref: "Order"}
}, {timestamps: true})

module.exports = mongoose.model("Table", tableSchema)