import { Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        
        {/* Logo */}
        <div className="text-2xl font-black text-[#10847e] cursor-pointer">
          Pharma<span className="text-slate-800">Easy</span>
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search medicines, healthcare products..."
            className="w-full bg-slate-100 py-3 pl-11 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-[#10847e]"
          />
        </div>

        {/* Cart */}
        <button className="flex items-center gap-2 bg-[#10847e] text-white px-4 py-3 rounded-xl hover:bg-[#0d6b66]">
          <ShoppingCart size={18} />
          <span className="font-semibold hidden md:block">Cart</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
