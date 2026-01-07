import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-blue-900 text-center uppercase tracking-tighter">
          NexusPharma <span className="text-blue-500">Core</span>
        </h1>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Medicinal Directory</h2>
          <p className="text-slate-500">Access thousands of verified pharmaceutical formulations.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;