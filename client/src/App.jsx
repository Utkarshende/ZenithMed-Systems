import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Pill, Search, LogIn, LogOut, LayoutDashboard, 
  Truck, CreditCard, Wallet, MapPin, Star, ArrowUpRight 
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PriceModal from './components/PriceModal';

// Helper: Auto-scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'All', label: 'All Meds', icon: '📋' },
    { id: 'Oncology', label: 'Oncology', icon: '🎗️' },
    { id: 'Cardiology', label: 'Cardiology', icon: '❤️' },
    { id: 'Antibiotics', label: 'Antibiotics', icon: '🦠' },
    { id: 'Nephrology', label: 'Nephrology', icon: '🧪' },
    { id: 'Gastroenterology', label: 'Gastro', icon: '🍏' },
    { id: 'General', label: 'General', icon: '💊' }
  ];

  useEffect(() => {
    // Check if admin is logged in on mount
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data);
    } catch (err) { console.error("Fetch error:", err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.href = '/'; // Hard redirect to reset state
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.composition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans selection:bg-blue-100">
        
        {/* --- DYNAMIC NAVIGATION --- */}
        <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-[100] px-8 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 180 }} className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-200">
                <Pill size={26} />
              </motion.div>
              <span className="font-black text-2xl tracking-tighter uppercase text-slate-900">NEXUS<span className="text-blue-600">PHARMA</span></span>
            </Link>

            <div className="flex items-center gap-6">
              <Link to="/contact" className="text-slate-500 font-bold hover:text-blue-600 transition-colors hidden md:block">Contact</Link>
              
              {/* --- CONDITIONAL ADMIN BUTTONS --- */}
              {isAdmin ? (
                <div className="flex items-center gap-3">
                  <Link to="/admin" className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-100 transition-all border border-blue-100">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all border border-red-100">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-600 transition-all">
                  Client Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main className="flex-grow">
              {/* --- HERO SECTION --- */}
              <section className="max-w-7xl mx-auto px-8 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                  <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                    Global <span className="text-blue-600">Pharma</span> Sourcing.
                  </h1>
                  <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto mb-10">
                    Reliable pharmaceutical export partner for high-potency formulations.
                  </p>
                  
                  <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                    <input 
                      type="text" 
                      placeholder="Search by medicine or formula..."
                      className="w-full bg-white border-2 border-slate-100 py-6 pl-16 pr-8 rounded-[2.5rem] focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none shadow-2xl shadow-slate-100 text-lg font-medium transition-all"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </motion.div>

                {/* --- CATEGORIES --- */}
                <div id="catalog" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 overflow-x-auto pb-6 no-scrollbar">
                    {categories.map((cat) => (
                      <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] font-bold text-sm transition-all whitespace-nowrap border-2 ${activeCategory === cat.id ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200' : 'bg-white border-slate-50 text-slate-400 hover:border-blue-100 shadow-sm'}`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  <AnimatePresence>
                    {filteredProducts.map(p => (
                      <motion.div 
                        key={p._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-[3rem] border border-slate-50 shadow-sm hover:shadow-2xl transition-all group overflow-hidden"
                      >
                        <div className="h-64 bg-slate-100 relative overflow-hidden">
                          <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                          <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white">
                              {p.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-10 flex flex-col h-full">
                          <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{p.name}</h3>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">{p.packaging}</p>
                          <div className="bg-slate-50 p-6 rounded-3xl mb-8 flex-1">
                             <p className="text-[10px] font-black text-slate-300 uppercase mb-2">Composition</p>
                             <p className="text-sm font-bold text-slate-600 italic leading-relaxed">{p.composition}</p>
                          </div>
                          <button 
                            onClick={() => setSelectedProduct(p)} 
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
                          >
                            Get Price <ArrowUpRight size={18}/>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>

        {/* --- FOOTER --- */}
        <footer className="bg-slate-900 text-white pt-24 pb-12 rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="space-y-8">
              <h3 className="text-3xl font-black tracking-tighter uppercase italic">Nexus<span className="text-blue-500">Pharma</span></h3>
              <p className="text-slate-400 font-medium leading-relaxed">Top-tier pharmaceutical distribution and global logistics solutions.</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all border border-white/5 hover:scale-110"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all border border-white/5 hover:scale-110"><i className="fab fa-instagram"></i></a>
              </div>
            </div>

            <div>
              <h4 className="text-blue-500 font-black uppercase tracking-widest mb-8">Resources</h4>
              <ul className="space-y-4 text-slate-300 font-bold uppercase text-xs tracking-widest">
                <li><a href="#catalog" className="hover:text-white transition-all">Formulations</a></li>
                <li><Link to="/contact" className="hover:text-white transition-all">Bulk Export</Link></li>
                <li><Link to="/login" className="hover:text-white transition-all">Portal Access</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-blue-500 font-black uppercase tracking-widest mb-8">Location</h4>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">
                Industrial Area Phase-1,<br />Chandigarh/Mohali HQ,<br />India
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
              <div className="flex text-yellow-500 mb-4 gap-1"><Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/></div>
              <p className="text-slate-300 italic text-sm">"The standard for pharmaceutical export in the region."</p>
              <p className="text-slate-500 text-[10px] font-black uppercase mt-4 tracking-widest">— Global Med Group</p>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">
            © 2026 Nexus Pharma | Quality Matters
          </div>
        </footer>

        {selectedProduct && <PriceModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
    </Router>
  );
};

export default App;