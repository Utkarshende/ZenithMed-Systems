import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Pill, Search, LogIn, LogOut, LayoutDashboard, 
  Truck, CreditCard, Wallet, MapPin, Star, Package, ArrowUpRight, ChevronRight 
} from 'lucide-react';

// Components
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PriceModal from './components/PriceModal';

// UX Helper: Auto-scroll to top on page change
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
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(data);
    } catch (err) { console.error(err); }
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
      <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-600">
        
        {/* --- LUXURY NAV --- */}
        <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-[100] px-8 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-200">
                <Pill size={26} />
              </motion.div>
              <span className="font-black text-2xl tracking-tighter uppercase text-slate-900">NEXUS<span className="text-blue-600">PHARMA</span></span>
            </Link>

            <div className="flex items-center gap-8">
              <Link to="/contact" className="text-slate-500 font-bold hover:text-blue-600 transition-colors hidden md:block">Support</Link>
              {isAdmin ? (
                <Link to="/admin" className="bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-100 transition-all">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-7 py-3 rounded-2xl font-bold shadow-lg hover:shadow-slate-300 transition-all">
                  Admin Access
                </Link>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main className="flex-grow">
              {/* --- HERO --- */}
              <section className="max-w-7xl mx-auto px-8 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
                  <h1 className="text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                    Next-Gen <span className="text-blue-600">Medicine</span> <br/> Sourcing.
                  </h1>
                  <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                    Reliable global supply chain for high-potency formulations and critical care products.
                  </p>
                  
                  {/* SEARCH BAR UX */}
                  <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                    <input 
                      type="text" 
                      placeholder="Search by brand name or salt composition..."
                      className="w-full bg-white border-2 border-slate-100 py-6 pl-16 pr-8 rounded-[2.5rem] focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all shadow-2xl shadow-slate-100 text-lg font-medium"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </motion.div>

                {/* CATEGORIES - UX: Integrated with subtle bounce */}
                <div id="catalog" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 overflow-x-auto pb-6 no-scrollbar">
                    {categories.map((cat, index) => (
                      <motion.button 
                        key={cat.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] font-bold text-sm transition-all whitespace-nowrap border-2 ${activeCategory === cat.id ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-200 -translate-y-1' : 'bg-white border-slate-50 text-slate-400 hover:border-blue-100 hover:text-blue-600 shadow-sm'}`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        {cat.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* PRODUCT GRID - UX: Animate presence */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  <AnimatePresence>
                    {filteredProducts.map(p => (
                      <motion.div 
                        key={p._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-[3rem] border border-slate-50 shadow-sm hover:shadow-2xl transition-all group overflow-hidden"
                      >
                        <div className="h-64 bg-slate-100 relative overflow-hidden">
                          <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
                          <div className="absolute top-6 left-6">
                            <span className="bg-white/80 backdrop-blur-md text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                              {p.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-10">
                          <h3 className="text-2xl font-black text-slate-900 mb-2">{p.name}</h3>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">{p.packaging}</p>
                          <div className="bg-slate-50 p-6 rounded-3xl mb-8">
                             <p className="text-[10px] font-black text-slate-300 uppercase mb-2">Formula</p>
                             <p className="text-sm font-bold text-slate-600 italic leading-relaxed">{p.composition}</p>
                          </div>
                          <button onClick={() => setSelectedProduct(p)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                            Quote Inquiry <ArrowUpRight size={18}/>
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
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* --- FOOTER --- */}
        <footer className="bg-slate-900 text-white rounded-t-[5rem] mt-20 p-12 lg:p-24">
          {/* Workable Links are already in your previous logic - integrated below */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-20">
            <div className="space-y-8">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Nexus<span className="text-blue-500">Pharma</span></h3>
              <p className="text-slate-400 font-medium leading-relaxed">Leading the global pharmaceutical landscape with certified logistics and top-tier formulations.</p>
              <div className="flex gap-4">
                {['facebook-f', 'instagram', 'linkedin-in'].map(icon => (
                  <a key={icon} href="#" className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all border border-white/5"><i className={`fab fa-${icon}`}></i></a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-blue-500 font-black uppercase tracking-widest mb-8">Explore</h4>
              <ul className="space-y-4 text-slate-300 font-bold uppercase text-sm tracking-widest">
                <li><a href="#catalog" className="hover:text-blue-500 transition-all">Catalog</a></li>
                <li><Link to="/contact" className="hover:text-blue-500 transition-all">Bulk Inquiry</Link></li>
                <li><Link to="/login" className="hover:text-blue-500 transition-all">Admin Access</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-blue-500 font-black uppercase tracking-widest mb-8">Location</h4>
              <p className="text-slate-400 font-medium leading-relaxed">
                Nexus HQ Tower, Industrial Zone,<br />Mohali, Punjab, India
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-500 font-bold text-xs uppercase cursor-pointer border-b border-blue-500/20 pb-1 w-fit">
                <MapPin size={14}/> Google Maps
              </div>
            </div>

            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5">
               <div className="flex text-yellow-500 mb-4 gap-1"><Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/></div>
               <p className="text-slate-300 italic text-sm">"The most reliable export partner for cardiology medicines."</p>
               <p className="text-slate-500 text-[10px] font-black uppercase mt-4 tracking-[0.2em]">— EuroHealth Global</p>
            </div>
          </div>
        </footer>

        {/* MODAL */}
        {selectedProduct && <PriceModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
    </Router>
  );
};

export default App;