// src/components/Navbar.jsx
import React from "react";
import { ShoppingCart, Search, X } from "lucide-react";

const Navbar = ({
  cart = [],
  onCartClick = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
}) => {
  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 text-[#10847e] font-black text-2xl tracking-tighter cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          NEXUS<span className="text-slate-800">PHARMA</span>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by Medicine name or Salt composition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 py-3.5 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#10847e]"
          />
          {searchQuery && (
            <X
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>

        {/* Cart Button */}
        <div className="flex items-center gap-4">
          <div
            onClick={onCartClick}
            className="relative cursor-pointer bg-[#10847e] text-white p-3 rounded-2xl hover:bg-[#0d6b66] transition-all flex items-center gap-3"
          >
            <ShoppingCart size={20} />
            <span className="font-bold text-sm hidden md:block">₹{cart.reduce((acc, item) => acc + (item.price * item.qty), 0)}</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full border-2 border-white">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
