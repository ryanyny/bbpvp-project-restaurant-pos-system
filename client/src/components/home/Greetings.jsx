import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const userData = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
      2,
      "0"
    )}, ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  // Fungsi baru buat greeting berdasarkan jam
  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour >= 4 && hour < 12) return "Selamat pagi";
    if (hour >= 12 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 18) return "Selamat sore";
    return "Selamat malam";
  };

  return (
    <div className="flex justify-between items-center px-6 mt-6">
      <div>
        <h1 className="text-white text-2xl font-semibold">
          {getGreeting()},{" "}
          <span className="text-[#f6b100]">
            {userData.name || "Nama Pengguna"}
          </span>
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Berikan layanan terbaik anda untuk pelanggan 😄
        </p>
      </div>

      <div className="text-right">
        <h1 className="text-white text-3xl font-bold tracking-wide">
          {formatTime(dateTime)}
        </h1>
        <p className="text-white/60 text-sm">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;