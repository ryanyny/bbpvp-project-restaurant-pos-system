import React from "react"
import BottomNav from "../components/shared/BottomNav"
import BackButton from "../components/shared/BackButton"
import { MdRestaurantMenu } from "react-icons/md"
import MenuContainer from "../components/menu/MenuContainer"

const Menu = () => {
    return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
        <main className="flex-1 overflow-y-auto pb-20">
            <section className="flex gap-6 px-6">
                {/* Left div */}
                <div className="flex-[3]">
                    <div className="flex items-center justify-between px-10 py-4">
                        <div className="flex items-center gap-4">
                            <BackButton />
                            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Menu</h1>
                        </div>
                        
                        <div className="flex items-center justify-around gap-4">
                            <div className="flex items-center gap-3 cursor-pointer">
                                <MdRestaurantMenu className="text-[#f5f5f5] text-4xl" />
                                <div className="flex flex-col items-start">
                                    <h1 className="text-md text-[#f5f5f5] font-semibold">Customer Name</h1>
                                    <p className="text-xs text-[#ababab] font-medium">Table No: 2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MenuContainer />
                </div>

                {/* Right div */}
                <div className="flex-[1] hidden lg:block"></div>
            </section>
        </main>
        <BottomNav />
    </section>
    )
}

export default Menu