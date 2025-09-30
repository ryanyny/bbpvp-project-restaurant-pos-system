import React, { useState } from "react";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import TableCard from "../components/tables/TableCard";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getTables } from "../https";

const Tables = () => {
  const [status, setStatus] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => getTables(),
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  // Filter tables based on status
  const filteredTables = resData?.data?.data.filter((table) => {
    if (status === "all") return true;
    if (status === "booked") return table.status === "Terisi";
    return true;
  });

  return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Meja</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg ${
              status === "all" ? "bg-[#383838]" : ""
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg px-5 py-2 font-semibold rounded-lg ${
              status === "booked" ? "bg-[#383838]" : ""
            }`}
          >
            Dipesan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-5">
        {filteredTables?.map((table) => (
          <TableCard
            key={table._id}
            id={table._id}
            name={table.tableNo}
            status={table.status}
            initials={table?.currentOrder?.customerDetails?.name}
            seats={table.seats}
          />
        ))}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;