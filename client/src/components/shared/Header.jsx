import React from 'react'

const Header = () => {
    return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <img src="" className="h-8 w-8" alt="Resto Logo" />
            <h1 className="text-lg font-semibold text-[#f5f5f5]">Resto</h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]">
            <FaSearch className="text-[#f5f5f5]" />
            <input type="text" placeholder="Search" className="bg-[#1f1f1f] outline-none text-[#f5f5f5]" />
        </div>
    </header>
)
}

export default Header