import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Search, LayoutDashboard, Pill, LogIn } from 'lucide-react';

// Components (Make sure these files exist in your folders)
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ProductCard from './components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Professional Search Logic (Handles Local Filtering)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.composition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        // Handle pagination object if it exists {products: [], pages: X}
        setProducts(data.products || data); 
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* --- Professional Header --- */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href='/'}>
              <div className="bg-blue-600 p-2 rounded-xl text-white"><Pill size={24} /></div>
              <h1 className="text-2xl font-black tracking-tight">NEXUS<span className="text-blue-600 text-sm align-top ml-1">PHARMA</span></h1>
            </div>

            {/* --- Search Bar --- */}
            <div className="relative w-full max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search by medicine name or salt composition..."
                className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <a href="/login" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
                <LogIn size={20} /> Login
              </a>
            </div>
          </div>
        </nav>

        {/* --- Main Content --- */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={
              <>
                <div className="mb-8">
                  <h2 className="text-4xl font-black mb-2">Available <span className="text-blue-600">Inventory</span></h2>
                  <p className="text-slate-500 font-medium">Browse our WHO-GMP certified pharmaceutical range.</p>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
                    {[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-200 rounded-3xl" />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(p => <ProductCard key={p._id} product={p} />)}
                  </div>
                )}
              </>
            } />
            
            <Route path="/login" element={<Login />} />
            
            {/* --- Protected Admin Route --- */}
            <Route path="/admin" element={
              localStorage.getItem('isAdmin') === 'true' ? <AdminDashboard /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;