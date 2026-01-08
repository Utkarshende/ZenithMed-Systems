import { useState, useEffect } from 'react';

const Home = ({ onAddToCart, searchQuery }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        // Calling your backend API
        const response = await fetch(`http://localhost:5000/api/medicines?query=${searchQuery}`);
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Wait 300ms after user stops typing to call API
    const timeoutId = setTimeout(fetchMedicines, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ... Hero sections ... */}
      
      {loading ? (
        <div className="text-center py-20 font-bold text-[#10847e]">Searching database...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {medicines.map((med) => (
             <div key={med._id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                {/* Product Card Content */}
                <h4 className="text-xs font-bold mb-4">{med.name}</h4>
                <div className="flex justify-between items-center">
                   <span className="font-black">₹{med.price}</span>
                   <button onClick={() => onAddToCart(med)} className="text-[10px] font-black text-[#10847e] border border-[#10847e] px-3 py-1 rounded">ADD</button>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;