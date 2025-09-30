import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { register } from "../../https";

const Register = ({ setIsRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
    enqueueSnackbar(`Role diubah ke ${selectedRole}`, { variant: "info" });
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message || "Register berhasil!", { variant: "success" });

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });

      setTimeout(() => {
        setIsRegister(false);
      }, 1500);
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Terjadi kesalahan. Coba lagi.";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role) {
      enqueueSnackbar("Pilih dulu jabatan karyawan!", { variant: "warning" });
      return;
    }
    registerMutation.mutate(formData);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        {/* Nama */}
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Nama Karyawan
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama karyawan"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Email Karyawan
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email karyawan"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            No Telp Karyawan
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Masukkan no telp karyawan"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Kata Sandi
          </label>
          <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan kata sandi"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Pilih Jabatan Karyawan
          </label>
          <div className="flex items-center gap-3 mt-4">
            {["admin", "kasir", "waiter"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-medium transition-colors ${
                  formData.role === role ? "bg-indigo-700 text-white" : ""
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-colors"
        >
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Register;