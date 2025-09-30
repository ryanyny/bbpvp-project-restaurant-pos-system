const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        availability: {
            type: Boolean,
        default: true,
        },
        menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Item", itemSchema)