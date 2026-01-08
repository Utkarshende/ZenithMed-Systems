import { Search, ShoppingCart, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => (
  <header className="bg-white border-b sticky top-0 z-[100]">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-black text-[#10847e] tracking-tight">
          KALP<span className="text-[#f87272]">PHARMA</span>
        </Link>
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-400 border-l pl-6">
          <MapPin size={16} /> Select Pincode <ChevronRight size={14} />
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-10 relative">
        <input 
          type="text" 
          placeholder="Search for Medicines (e.g. Paracetamol)"
          className="w-full bg-[#f3f7fb] border-none rounded-lg py-3 px-12 text-sm focus:ring-2 focus:ring-[#10847e] outline-none"
        />
        <Search className="absolute left-4 top-3 text-slate-400" size={18} />
      </div>

      <div className="flex items-center gap-6 text-sm font-bold">
        <button className="relative p-2">
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#f87272] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>
    </div>
  </header>
);

export default Navbar;