import React from "react"
import BottomNav from "../components/shared/BottomNav"
import CustomerInfo from "../components/menu/CustomerInfo"
import CartItems from "../components/menu/CartItems"
import Bill from "../components/menu/Bill"
import MenuContainer from "../components/menu/MenuContainer"

const Menu = () => {
    return (
        <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
            <main className="flex-1 overflow-y-auto pb-20">
                <section className="flex gap-6 px-6">
                    <MenuContainer />

                    <div className="flex-[1] bg-[#1a1a1a] mt-4 mr-3 hidden rounded-lg pt-2 lg:block">
                        <CustomerInfo />

                        <hr className="border-[#2a2a2a] border-t-2" />

                        <CartItems />

                        <hr className="border-[#2a2a2a] border-t-2" />

                        <Bill />
                    </div>
                </section>
            </main>

            <BottomNav />
        </section>
    )
}

export default Menu