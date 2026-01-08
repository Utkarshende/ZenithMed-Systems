import { Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <h1 className="text-2xl font-black text-[#10847e]">
          pharm<span className="text-slate-800">easy</span>
        </h1>

        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            placeholder="Search medicines & health products"
            className="w-full bg-[#f3f7fb] pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#10847e]"
          />
        </div>

        <button className="relative bg-[#10847e] text-white px-4 py-3 rounded-xl flex items-center gap-2">
          <ShoppingCart size={18} /> Cart
        </button>
      </div>
    </header>
  );
};

export default Navbar;
