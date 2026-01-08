const categories = [
  "All",
  "Oncology",
  "Cardiology",
  "Antibiotics",
  "General",
  "Nephrology"
];

const CategoryBar = () => {
  return (
    <div className="flex gap-4 overflow-x-auto mb-10 pb-2">
      {categories.map(cat => (
        <button
          key={cat}
          className="px-6 py-2 bg-white rounded-full shadow text-sm font-bold text-slate-600 hover:bg-[#10847e] hover:text-white transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
