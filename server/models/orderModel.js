const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
})

const orderSchema = new mongoose.Schema(
    {
        customerDetails: {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true,
            },
            guests: {
                type: Number,
                required: true,
            },
            email: {
                type: String,
                required: false,
            },
        },
        orderStatus: {
            type: String,
            enum: ["tertunda", "memasak", "disajikan", "dibayar", "dibatalkan"],
            default: "tertunda",
        },
        orderDate: {
            type: Date,
            default: Date.now(),
        },
        bills: {
            total: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        totalWithTax: {
            type: Number,
            required: true,
        },
    },

    items: [orderItemSchema],
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
    },
},
{timestamps: true}
)

module.exports = mongoose.model("Order", orderSchema)