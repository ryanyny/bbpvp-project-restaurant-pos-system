import React from "react"
import { BsCashCoin } from "react-icons/bs"
import { GrInProgress } from "react-icons/gr"
import BottomNav from "../components/shared/BottomNav"
import Greetings from "../components/home/Greetings"
import MiniCard from "../components/home/MiniCard"
import RecentOrders from "../components/home/RecentOrders"
import PopularDishes from "../components/home/PopularDishes"

const Home = () => {
  return (
    <div className="bg-[#1f1f1f] min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <section className="flex gap-6 px-6">
          {/* Left div */}
          <div className="flex-[3]">
            <Greetings />

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <MiniCard
                title="Total Pendapatan"
                icon={<BsCashCoin />}
                number={512}
                footerNum={1.6} />
              <MiniCard
                title="Sedang Proses"
                icon={<GrInProgress />}
                number={16}
                footerNum={3.6} />
            </div>

            <RecentOrders />
          </div>

          {/* Right div */}
          <div className="flex-[2] hidden lg:block">
            <PopularDishes />
          </div>
        </section>
      </main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}

export default Home