const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        bgColor: {
            type: String,
            default: "#1a1a1a",
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu",
            default: null,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Menu", menuSchema)