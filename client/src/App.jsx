import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Pill, Search, LogIn, LogOut, LayoutDashboard, Package, ArrowUpRight } from 'lucide-react';

// Sub-components
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import PriceModal from './components/PriceModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Price Modal

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data.products || data);
    } catch (err) {
      console.error("Connection Error:", err);
    }
  };

  // Logic: Filters products by both Search and Category
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.composition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#FDFDFF]">
        {/* --- PROFESSIONAL NAVBAR --- */}
        <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-[100] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                <Pill size={22} />
              </div>
              <span className="font-black text-2xl tracking-tighter">NEXUS<span className="text-blue-600 text-sm align-top ml-0.5">PHARMA</span></span>
            </Link>

            <div className="flex items-center gap-4">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="text-slate-600 font-bold hover:text-blue-600 flex items-center gap-2">
                    <LayoutDashboard size={18} /> Admin Panel
                  </Link>
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-red-100">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-slate-100">
                  <LogIn size={18} /> Admin Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-6 py-12">
              {/* --- HERO & SEARCH --- */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="max-w-xl">
                  <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                    Premium <span className="text-blue-600">Pharmaceutical</span> Solutions.
                  </h2>
                  <p className="text-slate-500 font-medium text-lg italic">Exporting health, importing trust across the globe.</p>
                </div>
                
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search medicines or salt..."
                    className="w-full bg-white border-2 border-slate-100 py-4 pl-12 pr-4 rounded-[1.5rem] focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all shadow-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* --- CATEGORY SELECTOR --- */}
              <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
                {['All', 'Oncology', 'Cardiology', 'Antibiotics', 'Nephrology', 'General'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* --- PRODUCT GRID --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(p => (
                  <div key={p._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col">
                    <div className="h-56 bg-slate-100 relative overflow-hidden">
                      <img 
                        src={p.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=600'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={p.name}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{p.name}</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase mb-6">{p.packaging || 'Export Pack'}</p>
                      
                      <div className="bg-slate-50 p-4 rounded-2xl mb-8 flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Salt Composition</p>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed italic">{p.composition}</p>
                      </div>

                      <button 
                        onClick={() => setSelectedProduct(p)}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-blue-50/50"
                      >
                        Get Best Price <ArrowUpRight size={18}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-40">
                  <Package className="mx-auto text-slate-200 mb-4" size={64}/>
                  <p className="text-slate-400 font-bold">No formulations found in this category.</p>
                </div>
              )}
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>

        {/* --- MODAL INJECTION --- */}
        {selectedProduct && (
          <PriceModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </Router>
  );
};

export default App;