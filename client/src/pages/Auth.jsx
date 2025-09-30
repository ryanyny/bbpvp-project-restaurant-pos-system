import React, {useState} from "react"
import resto from "../assets/images/resto.jpg"
import logo from "../assets/images/logo.png"
import Register from "../components/auth/Register"
import Login from "../components/auth/Login"

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        <img
          className="w-full h-full object-cover"
          src={resto}
          alt="Restaurant Image" />

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Sajikan makanan terbaik kepada pelanggan dengan layanan yang cepat dan ramah, maka mereka akan terus datang kembali."
          <br />
          <span className="block mt-4 text-yellow-400">
            - Ryan Febriansyah (CEO RestoHub)
          </span>
        </blockquote>
      </div>

      <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-10">
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Restro Logo"
            className="h-14 w-14 border-2 rounded-full p-1" />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            RestoHub
          </h1>
        </div>

        <h2 className="text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10">
          {isRegister ? "Daftar Karyawan" : "Masuk Karyawan"}
        </h2>

        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}
            <a
              onClick={() => setIsRegister(!isRegister)}
              className="text-yellow-400 font-semibold hover:underline"
              href="#">
              {isRegister ? "Masuk" : "Daftar"}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth