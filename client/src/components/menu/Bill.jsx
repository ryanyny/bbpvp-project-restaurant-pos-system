import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { getTotalPrice } from "../../redux/slice/cartSlice";
import { formatRupiah } from "../../utils";

const Bill = ({ tableList }) => {
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = Math.ceil((total * taxRate) / 100);
  const totalPriceWithTax = Math.ceil(total + tax);

  const tableNo = useSelector((state) => state.customer.tableNo);
  const tableId = tableList?.find((t) => t.tableNo === tableNo)?._id;

  const [paymentMethod, setPaymentMethod] = useState(""); // tunai / online
  const [orderId, setOrderId] = useState(null);

  const handlePaymentMethod = (method) => setPaymentMethod(method);

  // Bayar tunai
  const handleCashPayment = async () => {
    if (!cartData.length || totalPriceWithTax <= 0) {
      toast.error("Keranjang kosong atau total harga nol.");
      return;
    }

    try {
      const orderData = {
        customerDetails: {
          name: "John Doe",
          phone: "085750003456",
          guests: 2,
          email: "customer@example.com",
        },
        orderStatus: "dibayar",
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData.map((item) => ({
          item: item._id,
          name: item.name,
          quantity: item.quantity,
          price: Math.ceil(item.unitPrice),
        })),
        table: tableId, // penting! biar backend update meja
      };

      const res = await axios.post(
        "http://localhost:8000/api/orders",
        orderData,
        { withCredentials: true }
      );

      setOrderId(res.data.data._id);
      toast.success("✅ Pembayaran tunai berhasil!");
    } catch (err) {
      toast.error("❌ Gagal memproses pembayaran tunai!");
      console.error(err);
    }
  };

  // Bayar online
  const handleOnlinePayment = async () => {
    const subtotal = cartData.reduce((s, it) => s + (it.totalPrice || 0), 0);
    const tax = Math.ceil((subtotal * taxRate) / 100);
    const totalWithTax = Math.ceil(subtotal + tax);

    if (!cartData.length || totalWithTax <= 0) {
      toast.error("Keranjang kosong atau total harga nol.");
      return;
    }

    try {
      const orderData = {
        customerDetails: {
          name: "John Doe",
          phone: "085750003456",
          guests: 2,
          email: "customer@example.com",
        },
        orderStatus: "tertunda",
        bills: {
          total: subtotal,
          tax: tax,
          totalWithTax: totalWithTax,
        },
        items: cartData.map((item) => ({
          item: item._id,
          name: item.name,
          quantity: item.quantity,
          price: Math.ceil(item.unitPrice),
        })),
        table: tableId, // penting!
      };

      const res = await axios.post(
        "http://localhost:8000/api/orders",
        orderData,
        { withCredentials: true }
      );

      setOrderId(res.data.data._id);
      const { snapToken } = res.data;

      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          toast.success("✅ Pembayaran berhasil!");
          console.log("Payment success:", result);
        },
        onPending: function (result) {
          toast.info("⚠️ Pembayaran pending, tunggu konfirmasi.");
          console.log("Payment pending:", result);
        },
        onError: function (result) {
          toast.error("❌ Pembayaran gagal!");
          console.log("Payment error:", result);
        },
        onClose: function () {
          toast.warning("⚠️ Pembayaran dibatalkan oleh pengguna.");
          console.log("Payment popup closed");
        },
      });
    } catch (error) {
      console.error(
        "Payment error:",
        error.response ? error.response.data : error.message
      );
      toast.error("❌ Gagal memproses pembayaran online!");
    }
  };

  const handlePay = () => {
    if (!paymentMethod) {
      toast.warning("Pilih metode pembayaran dulu!");
      return;
    }
    if (paymentMethod === "tunai") handleCashPayment();
    if (paymentMethod === "online") handleOnlinePayment();
  };

  // Cetak struk
  const handlePrintReceipt = () => {
    if (!cartData.length) {
      toast.warning("Keranjang kosong, tidak bisa cetak struk!");
      return;
    }

    const printWindow = window.open("", "PRINT", "height=600,width=400");
    printWindow.document.write("<h1>Struk Pembayaran</h1>");
    printWindow.document.write(`<p>Tanggal: ${new Date().toLocaleString()}</p>`);
    printWindow.document.write("<hr>");

    cartData.forEach((item) => {
      printWindow.document.write(
        `<p>${item.name} x${item.quantity} = Rp${item.unitPrice * item.quantity}</p>`
      );
    });

    const subtotal = cartData.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const tax = Math.ceil((subtotal * taxRate) / 100);
    const totalWithTax = subtotal + tax;

    printWindow.document.write("<hr>");
    printWindow.document.write(`<p>Subtotal: Rp${subtotal}</p>`);
    printWindow.document.write(`<p>Pajak: Rp${tax}</p>`);
    printWindow.document.write(`<p>Total: Rp${totalWithTax}</p>`);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Barang ({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">{formatRupiah(total)}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Pajak ({taxRate}%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">{formatRupiah(tax)}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2 border-t border-[#333] pt-2">
        <p className="text-sm text-[#f5f5f5] font-semibold mt-2">Total Bayar</p>
        <h1 className="text-[#f5f5f5] text-lg font-extrabold">
          {formatRupiah(totalPriceWithTax)}
        </h1>
      </div>

      {/* Pilih Metode */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => handlePaymentMethod("tunai")}
          className={`px-4 py-3 w-full rounded-lg font-semibold ${
            paymentMethod === "tunai" ? "bg-green-600 text-white" : "bg-[#1f1f1f] text-[#ababab]"
          }`}
        >
          Tunai
        </button>
        <button
          onClick={() => handlePaymentMethod("online")}
          className={`px-4 py-3 w-full rounded-lg font-semibold ${
            paymentMethod === "online" ? "bg-blue-600 text-white" : "bg-[#1f1f1f] text-[#ababab]"
          }`}
        >
          Online
        </button>
      </div>

      {/* Bayar / Cetak */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={handlePrintReceipt}
          className="bg-[#025cca] px-2 py-2 w-full rounded-lg text-[#f5f5f5] font-semibold text-md"
        >
          Cetak Struk
        </button>
        <button
          onClick={handlePay}
          className="bg-[#f6b100] px-2 py-2 w-full rounded-lg text-[#1f1f1f] font-semibold text-md"
        >
          Bayar
        </button>
      </div>
    </>
  );
};

export default Bill;