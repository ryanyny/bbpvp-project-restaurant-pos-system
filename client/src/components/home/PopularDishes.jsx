import React from "react"
import { popularDishes } from "../../constants"

const PopularDishes = () => {
    return (
    <div className="mt-6 pr-6">
        <div className="bg-[#1a1a1a] w-full rounded-2xl shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <h1 className="text-white text-lg font-semibold">Hidangan Terpopuler</h1>
            </div>

            {/* List */}
            <div className="py-4">
                {popularDishes.map((dish) => (
                    <div
                        key={dish.id}
                        className="flex items-center gap-4 bg-[#1f1f1f] rounded-xl px-5 py-3 mx-6 mb-4 hover:bg-[#2a2a2a] transition">
                        <h1 className="text-white/70 font-bold text-lg w-8 text-center">
                            {dish.id < 10 ? `0${dish.id}` : dish.id}
                        </h1>
                        <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <h1 className="text-white font-semibold">{dish.name}</h1>
                                <p className="text-sm text-white/60">{dish.numberOfOrders}{' '}
                                    <span className="text-white/40">pesanan</span>
                                </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default PopularDishes
