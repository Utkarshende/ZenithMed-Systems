import { Search, Filter } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) => {
  const categories = ['All', 'Oncology', 'Cardiology', 'Antibiotics', 'Nephrology', 'Vaccines'];

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
        <input
          type="text"
          placeholder="Search by medicine name or salt composition (e.g. Nivolumab)..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Filter size={18} className="text-slate-400 mr-2" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;