import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api/products';

const Home = ({ onAddToCart, searchQuery }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}?query=${searchQuery || ''}`);
        const data = await res.json();
        setMedicines(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch medicines:", err);
        toast.error("Failed to fetch medicines from server");
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(fetchMedicines, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center py-20 font-bold text-blue-600">
          Loading medicines...
        </div>
      ) : medicines.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-bold">
          No medicines found
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {medicines.map((med) => (
            <ProductCard key={med._id} med={med} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
