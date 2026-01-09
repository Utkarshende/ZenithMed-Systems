const categories = [
  "All",
  "Medicine",
  "Healthcare",
  "Lab Tests",
  "Wellness",
  "Skin Care",
  "Baby Care",
];

const CategoryBar = () => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex gap-4 overflow-x-auto scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold border border-slate-200 hover:border-[#10847e] hover:text-[#10847e]"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
