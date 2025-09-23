import React from "react"

const Home = () => {
    return (
        <div>
            <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
                {/* Left div */}
                <div className="flex-[3] bg-red-600"></div>

                {/* Right div */}
                <div className="flex-[2] bg-blue-600"></div>
            </section>
        </div>
    )
}

export default Home