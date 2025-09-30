const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const midtransClient = require("midtrans-client");
const Order = require("../models/orderModel");
const Table = require("../models/tableModel");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// Tambah order
const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Update meja kalau ada
    if (order.table) {
      await Table.findByIdAndUpdate(order.table, {
        status: "Terisi",
        currentOrder: order._id,
      });
    }

    // Prepare item details untuk Midtrans
    const itemDetails = order.items.map((it) => ({
      id: it.item ? it.item.toString() : new mongoose.Types.ObjectId().toString(),
      price: Math.ceil(it.price),
      quantity: it.quantity,
      name: it.name,
    }));

    const taxAmount = Number(order.bills.tax || 0);
    if (taxAmount > 0) {
      itemDetails.push({
        id: "TAX-FEE-" + order._id.toString(),
        price: Math.ceil(taxAmount),
        quantity: 1,
        name: "Pajak & Biaya Layanan",
      });
    }

    const computedGross = itemDetails.reduce(
      (s, it) => s + Number(it.price) * Number(it.quantity),
      0
    );

    order.bills.totalWithTax = computedGross;
    await order.save();

    const parameter = {
      transaction_details: {
        order_id: order._id.toString(),
        gross_amount: computedGross,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: order.customerDetails.name,
        email: order.customerDetails.email || "customer@gmail.com",
        phone: order.customerDetails.phone,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    res.status(201).json({
      success: true,
      message: "Order created!",
      data: order,
      snapToken: transactionToken,
    });
  } catch (error) {
    console.error("DEBUG SERVER ERROR 500:", error);
    const httpError = createHttpError(500, error.message);
    return next(httpError);
  }
};

// Update order (termasuk status)
const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid id!"));
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }

    // Reset meja kalau order selesai atau dibatalkan
    if (["dibayar", "dibatalkan"].includes(orderStatus) && order.table) {
      await Table.findByIdAndUpdate(order.table, {
        status: "Tersedia",
        currentOrder: null,
      });
    }

    res.status(200).json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    return next(error);
  }
};

// Get order by id
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid id!"));
    }

    const order = await Order.findById(id);
    if (!order) {
      return next(createHttpError(404, "Order not found!"));
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    return next(error);
  }
};

// Get all orders
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder };