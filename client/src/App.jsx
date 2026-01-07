import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Pill, Search, LogIn, LogOut, LayoutDashboard, SlidersHorizontal } from 'lucide-react';

// Pages & Components
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ProductCard from './components/ProductCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync Admin Status
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  // Fetch Inventory
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data.products || data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Logic: Filter by Category AND Search Term
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.composition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* --- DYNAMIC HEADER --- */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                <Pill size={22} />
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900">NEXUS<span className="text-blue-600">PHARMA</span></span>
            </Link>

            <div className="flex items-center gap-4">
              {isAdmin ? (
                <div className="flex items-center gap-3">
                  <Link to="/admin" className="hidden md:flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600 transition-colors">
                    <LayoutDashboard size={18} /> Admin Panel
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all border border-red-100"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-200">
                  <LogIn size={18} /> Admin Access
                </Link>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          {/* --- MAIN CATALOG VIEW --- */}
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 mb-2 italic">Global <span className="text-blue-600">Formulations</span></h2>
                  <p className="text-slate-500 font-medium max-w-md leading-relaxed">High-quality pharmaceutical products certified for international standards.</p>
                </div>

                {/* --- Search Bar --- */}
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name or salt..."
                    className="w-full bg-white border border-slate-200 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* --- Category Tabs --- */}
              <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                  {['All', 'Oncology', 'Cardiology', 'Antibiotics', 'Nephrology', 'General'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeCategory === cat ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="ml-auto text-slate-400 font-bold text-xs uppercase tracking-widest hidden md:block">
                  {filteredProducts.length} Products Found
                </div>
              </div>

              {/* --- Grid View --- */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[1,2,3,4].map(i => <div key={i} className="h-80 bg-slate-200 rounded-[2rem] animate-pulse" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredProducts.map(p => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;