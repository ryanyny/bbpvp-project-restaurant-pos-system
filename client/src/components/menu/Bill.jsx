// components/Bill.jsx

import React from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { getTotalPrice } from "../../redux/slice/cartSlice"

const Bill = () => {
    const cartData = useSelector(state => state.cart)
    const total = useSelector(getTotalPrice)
    const taxRate = 5.25
    
    // PERBAIKAN: Pembulatan harga untuk menghindari desimal di Midtrans
    const tax = Math.ceil((total * taxRate) / 100) 
    const totalPriceWithTax = Math.ceil(total + tax)

    const formatRupiah = (num) => new Intl.NumberFormat("id-ID").format(num)

    const handleOnlinePayment = async () => {
        // Cek keranjang kosong
        if (cartData.length === 0 || totalPriceWithTax <= 0) {
            console.error("Keranjang kosong atau total harga nol. Tidak dapat memproses pembayaran.")
            return
        }

        try {
            const orderData = {
                customerDetails: {
                    name: "John Doe",
                    phone: "085750003456",
                    guests: "2",
                    email: "customer@example.com", // <-- PERBAIKAN: Tambahkan email
                },
                orderStatus: "pending",
                bills: {
                    total: total, // Total asli sebelum dibulatkan, Mongoose akan membulatkan
                    tax: tax,
                    totalWithTax: totalPriceWithTax, // <-- Nilai final yang dibulatkan (INTEGER)
                },
                items: cartData,
            }

            const res = await axios.post("http://localhost:8000/api/orders", orderData, {withCredentials: true})
            const {snapToken} = res.data

            window.snap.pay(snapToken, {
                onSuccess: function(result) {
                    console.log("Payment success:", result)
                },
                onPending: function(result) {
                    console.log("Payment pending:", result)
                },
                onError: function(result) {
                    console.log("Payment error:", result)
                },
                onClose: function() {
                    console.log("Payment popup closed")
                },
            })
        } catch (error) {
            // Tampilkan error dari backend
            console.error("Payment error:", error.response ? error.response.data : error.message)
        }
    }

    return (
    <>
    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Items ({cartData.length})</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp{formatRupiah(total)}</h1>
    </div>

    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Pajak (5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp{formatRupiah(tax)}</h1>
    </div>

    <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Total dengan Pajak</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">Rp{totalPriceWithTax}</h1>
    </div>

    <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">Tunai</button>
        <button onClick={handleOnlinePayment} className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">Online</button>
    </div>

    <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-2 py-2 w-full rounded-lg text-[#f5f5f5] font-semibold text-md">Cetak Struk</button>
        <button className="bg-[#f6b100] px-2 py-2 w-full rounded-lg text-[#1f1f1f] font-semibold text-md">Kirim</button>
    </div>
    </>
    )
}

export default Bill