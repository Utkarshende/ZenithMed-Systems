import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5000";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      
      {/* HERO */}
      <div className="bg-gradient-to-r from-[#10847e] to-[#0d6b66] text-white rounded-3xl p-10 mb-10">
        <h2 className="text-4xl font-black mb-4">
          India’s Most Trusted Online Pharmacy
        </h2>
        <p className="opacity-90">
          Genuine medicines • Fast delivery • Best prices
        </p>
      </div>

      <CategoryBar />

      {/* PRODUCTS */}
      <h3 className="text-xl font-black mb-6 text-slate-800">
        Popular Medicines
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </main>
  );
};

export default Home;
