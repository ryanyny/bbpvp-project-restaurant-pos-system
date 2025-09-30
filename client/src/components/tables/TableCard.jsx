import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateTable } from "../../redux/slice/customerSlice";

const TableCard = ({ id, name, status, initials, seats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Helper untuk inisial
  const getInitials = (name) => {
    if (!name) return null;
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const handleClick = () => {
    if (status === "Terisi") return; // block klik kalau meja terisi
    dispatch(updateTable({ tableNo: name }));
    navigate(`/menu`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#262626] px-4 py-5 rounded-lg shadow-md flex flex-col justify-between h-40 cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[#f5f5f5] text-lg font-semibold">
          Meja <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {name}
        </h1>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-lg ${
            status === "Terisi" ? "bg-[#1f3d2b] text-green-400" : "bg-[#4a3a1d] text-yellow-400"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex items-center justify-center mt-3">
        <div
          className={`rounded-full w-14 h-14 flex items-center justify-center text-white font-semibold text-lg ${
            ["AM", "PL", "SB"].includes(getInitials(initials))
              ? "bg-blue-600"
              : ["RT", "DP", "NK", "EK", "JS"].includes(getInitials(initials))
              ? "bg-green-600"
              : ["QN", "ON"].includes(getInitials(initials))
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          {getInitials(initials) || "N/A"}
        </div>
        <p className="text-[#ababab] mx-3 text-xs">
          Kursi: <span className="text-[#f5f5f5]">{seats}</span>
        </p>
      </div>
    </div>
  );
};

export default TableCard;