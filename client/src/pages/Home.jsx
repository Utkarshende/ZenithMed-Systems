const Home = ({ onAddToCart, searchQuery }) => {
  // Mock data representing a portion of your 10,000 medicines
  const allMedicines = [
    { id: 1, name: 'Paracetamol 650mg', price: 30, cat: 'General' },
    { id: 2, name: 'Voldini Gel', price: 120, cat: 'Pain Relief' },
    { id: 3, name: 'Amoxicillin 500mg', price: 85, cat: 'Antibiotics' },
    { id: 4, name: 'Atorvastatin 10mg', price: 150, cat: 'Cardiac' },
    // Imagine 9,996 more items here...
  ];

  // Filter logic
  const filteredMeds = allMedicines.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ... Hero and Banner ... */}

      <h2 className="text-lg font-black text-slate-800 mb-6">
        {searchQuery ? `Results for "${searchQuery}"` : "Trending Near You"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {filteredMeds.length > 0 ? (
          filteredMeds.map((med) => (
            <div key={med.id} className="bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
               <div className="aspect-square bg-slate-50 rounded-lg mb-4 flex items-center justify-center text-[#10847e] font-bold">
                 {med.cat}
               </div>
               <h4 className="text-xs font-bold mb-4">{med.name}</h4>
               <div className="flex justify-between items-center mt-auto">
                  <span className="font-black text-slate-800">₹{med.price}</span>
                  <button onClick={() => onAddToCart(med)} className="text-[10px] font-black text-[#10847e] border border-[#10847e] px-3 py-1 rounded">ADD</button>
               </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center py-20 text-slate-400 font-medium">No medicines found matching your search.</p>
        )}
      </div>
    </div>
  );
};