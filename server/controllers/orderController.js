const createHttpError = require("http-errors")
const Order = require("../models/orderModel")
const { default: mongoose } = require("mongoose")
const midtransClient = require("midtrans-client")

// Tambahkan log verifikasi di sini jika diperlukan
// console.log("Server Key Loaded:", !!process.env.MIDTRANS_SERVER_KEY)

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY
})

const addOrder = async (req, res, next) => {
    try {
        const order = new Order(req.body)
        await order.save()

        // --- LOGIC PERBAIKAN MIDTRANS STARTS HERE ---
        
        // 1. Ambil nilai total dan pajak yang tersimpan di Mongoose
        const subtotalItems = order.bills.total;
        const taxAmount = order.bills.tax; 
        const grossAmount = order.bills.totalWithTax; // Ini adalah total yang diharapkan Midtrans

        // 2. Buat item details (termasuk pembulatan harga)
        const itemDetails = order.items.map(item => ({
            id: item.id ? item.id.toString() : new mongoose.Types.ObjectId().toString(),
            price: Math.ceil(item.price), // Harga per item harus integer
            quantity: item.quantity,
            name: item.name
        }));

        // 3. Tambahkan Pajak sebagai item terpisah (WAJIB oleh Midtrans)
        if (taxAmount > 0) {
            itemDetails.push({
                id: "TAX-FEE-" + order._id.toString(), // ID unik untuk item pajak
                price: taxAmount,
                quantity: 1,
                name: "Pajak & Biaya Layanan"
            });
        }
        
        // --- LOGIC PERBAIKAN MIDTRANS ENDS HERE ---

        let parameter = {
            "transaction_details": {
                "order_id": order._id.toString(),
                "gross_amount": grossAmount, // <--- Sekarang gross_amount = (Total Items + Tax Item)
            },
            "item_details": itemDetails, // <--- Array yang sudah termasuk item pajak
            "customer_details": {
                "first_name": order.customerDetails.name,
                "email": order.customerDetails.email || "customer@gmail.com", // Ambil email dari Mongoose
                "phone": order.customerDetails.phone
            }
        }
        
        // Log parameter Midtrans sebelum dikirim
        // console.log("Midtrans Parameter:", JSON.stringify(parameter, null, 2));

        const transaction = await snap.createTransaction(parameter)
        let transactionToken = transaction.token

        res.status(201).json({success: true, message: "Order created!", data: order, snapToken: transactionToken})
    } catch (error) {
        // --- LOGGING YANG DIPERBAIKI ---
        console.error("\n==================================");
        console.error("DEBUG CRITICAL SERVER ERROR 500:");
        if (error.json) {
            console.error("Midtrans API Error (JSON Response):", error.json);
        }
        console.error("Error Stack/Message:", error.message);
        console.error("==================================\n");
        // --- END LOGGING ---
        
        // Buat error HTTP 500 jika error dari Midtrans
        const httpError = createHttpError(500, error.message);
        return next(httpError);
    }
}

const getOrderById = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            const error = createHttpError(404, "Invalid id!")

            return next(error)
        }

        const order = await Order.findById(id)
        if(!order) {
            const error = createHttpError(404, "Order not found!")

            return next(error)
        }

        res.status(200).json({success: true, data: order})
    } catch (error) {
        return next(error)
    }
}

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()

        res.status(200).json({success: true, data: orders})
    } catch (error) {
        return next(error)
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const {orderStatus} = req.body
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            const error = createHttpError(404, "Invalid id!")

            return next(error)
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {orderStatus},
            {new: true}
        )

        if(!order) {
            const error = createHttpError(404, "Order not found!")

            return next(error)
        }

        res.status(200).json({success: true, message: "Order updated", data: order})
    } catch (error) {
        return next(error)
    }
}

module.exports = {addOrder, getOrderById, getOrders, updateOrder}