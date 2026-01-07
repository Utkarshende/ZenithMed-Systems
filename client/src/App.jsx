import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Pill, Search, LogIn, LogOut, LayoutDashboard, Truck, CreditCard, Wallet, MapPin, Star } from 'lucide-react';

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

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data.products || data);
    } catch (err) { console.error(err); }
  };

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
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        {/* --- NAVIGATION --- */}
        <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                <Pill size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter">NEXUS<span className="text-blue-600">PHARMA</span></span>
            </Link>

            <div className="flex items-center gap-4">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="text-slate-600 font-bold hover:text-blue-600 flex items-center gap-2 transition-colors">
                    <LayoutDashboard size={18} /> Admin
                  </Link>
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-red-100 transition-all">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all">
                  <LogIn size={18} /> Admin Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                  <div className="max-w-xl">
                    <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                      Global <span className="text-blue-600">Pharma</span> Logistics.
                    </h2>
                    <p className="text-slate-500 font-medium text-lg italic">Certified export quality formulations for international trade.</p>
                  </div>
                  <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search medicine or salt..."
                      className="w-full bg-white border border-slate-200 py-4 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* --- CATEGORIES --- */}
                <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
                  {['All', 'Oncology', 'Cardiology', 'Antibiotics', 'Nephrology', 'General'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* --- PRODUCT GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                  {filteredProducts.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
              </main>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        {/* --- PROFESSIONAL FOOTER --- */}
        <footer className="bg-slate-900 text-white pt-2">
          {/* PAYMENT & DELIVERY SECTION */}
          <section className="bg-blue-600 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 bg-white/10 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="bg-white p-3 rounded-xl text-blue-600"><Truck size={28} /></div>
                <div>
                  <h4 className="font-black text-lg">Global Delivery</h4>
                  <p className="text-blue-100 text-sm">WHO-GMP standard shipping</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="bg-white p-3 rounded-xl text-blue-600"><CreditCard size={28} /></div>
                <div>
                  <h4 className="font-black text-lg">Online Payments</h4>
                  <p className="text-blue-100 text-sm">Secure Net-Banking & Wire Transfer</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm transition-all hover:bg-white/20">
                <div className="bg-white p-3 rounded-xl text-blue-600"><Wallet size={28} /></div>
                <div>
                  <h4 className="font-black text-lg">Cash on Delivery</h4>
                  <p className="text-blue-100 text-sm">Available for domestic bulk orders</p>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN FOOTER DATA */}
          <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">Nexus<span className="text-blue-500">Pharma</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Leading pharmaceutical export house specializing in high-quality oncology, cardiology, and generic formulations.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all border border-white/5"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all border border-white/5"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-white/5"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Explore</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
                <li><Link to="/" className="hover:text-blue-500">Catalog</Link></li>
                <li><a href="#" className="hover:text-blue-500">Wholesale</a></li>
                <li><a href="#" className="hover:text-blue-500">Supply Chain</a></li>
                <li><Link to="/login" className="hover:text-blue-500">Staff Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2"><MapPin size={20} className="text-blue-500" /> Location</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Nexus HQ Tower, Industrial Zone,<br />
                Phase VII, Mohali, India<br />
                Pin - 160055
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex text-yellow-500 mb-4 gap-1">
                <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
              </div>
              <p className="text-slate-300 text-xs italic leading-relaxed">
                "Fastest delivery of critical medicines. Their support for oncology procurement is world-class."
              </p>
              <p className="text-slate-500 text-[10px] font-black uppercase mt-4 tracking-widest">— Healthcare Partners UK</p>
            </div>
          </div>

          <div className="border-t border-white/5 py-8 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 Nexus Pharma Global | Excellence in Healthcare
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;