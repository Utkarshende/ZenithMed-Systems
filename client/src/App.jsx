import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { 
  Pill, Search, LogOut, LayoutDashboard, 
  MapPin, Star, ArrowUpRight, Menu, Globe, Beaker 
} from 'lucide-react';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PriceModal from './components/PriceModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const categories = [
    { id: 'All', label: 'Vault', icon: '💎' },
    { id: 'Oncology', label: 'Oncology', icon: '🎗️' },
    { id: 'Cardiology', label: 'Cardiology', icon: '❤️' },
    { id: 'Antibiotics', label: 'Antibiotics', icon: '🦠' },
    { id: 'Nephrology', label: 'Nephrology', icon: '🧪' },
    { id: 'Gastroenterology', label: 'Gastro', icon: '🍏' },
  ];

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      const validatedData = Array.isArray(data) ? data : (data.products || []);
      setProducts(validatedData);
    } catch (err) { setProducts([]); }
  };

  const changeLanguage = (langCode) => {
    const selectField = document.querySelector('.goog-te-combo');
    if (selectField) {
      selectField.value = langCode;
      selectField.dispatchEvent(new Event('change'));
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Router>
      <ScrollToTop />
      <Toaster position="bottom-right" />
      
      {/* CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 border-2 border-blue-600 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: 'spring', damping: 30, stiffness: 250 }}
      />

      <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
        
        {/* --- LUXURY NAV --- */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-6 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-slate-100">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
            <Beaker className="text-blue-600" size={20} /> Nexus.
          </Link>
          
          <div className="flex gap-8 items-center font-bold text-[9px] uppercase tracking-[0.25em]">
            <div id="google_translate_element" className="hidden"></div>
            <div className="relative group cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Globe size={12} /> Language
              <div className="absolute right-0 top-full mt-4 bg-white p-5 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-slate-50 w-36">
                <div className="flex flex-col gap-3 text-slate-900">
                  <button onClick={() => changeLanguage('en')} className="text-left hover:text-blue-600">English</button>
                  <button onClick={() => changeLanguage('es')} className="text-left hover:text-blue-600">Español</button>
                  <button onClick={() => changeLanguage('fr')} className="text-left hover:text-blue-600">Français</button>
                </div>
              </div>
            </div>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            {isAdmin ? <Link to="/admin" className="text-blue-600">Dashboard</Link> : <Link to="/login">Access</Link>}
            <Menu size={18} className="cursor-pointer" />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main>
              {/* --- HERO SECTION --- */}
              <section className="h-screen flex flex-col justify-center items-center relative px-10">
                {/* Background Molecule Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
                      className="absolute text-blue-100"
                      style={{ 
                        top: `${20 + (i * 15)}%`, 
                        left: `${10 + (i * 15)}%` 
                      }}
                    >
                      <Pill size={100 + (i * 20)} />
                    </motion.div>
                  ))}
                </div>

                <motion.div style={{ y: y1, opacity }} className="text-center z-10">
                  <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase mb-4 block"
                  >
                    Clinical Excellence
                  </motion.span>
                  <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter uppercase mb-6">
                    PURE<br/><span className="text-slate-400 font-light italic">SCIENCE.</span>
                  </h1>
                  <p className="max-w-md mx-auto text-slate-500 font-medium text-sm leading-relaxed">
                    Advancing global healthcare through precision-engineered pharmaceutical distribution.
                  </p>
                  
                  <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Scroll to Explore</span>
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                  </div>
                </motion.div>
              </section>

              {/* --- CATALOG --- */}
              <section className="py-32 px-6 md:px-10 bg-[#0F172A] rounded-t-[3rem] text-white relative z-20">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                      <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-2">Vault.</h2>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Inventory Index 2026</p>
                    </div>
                    <div className="relative w-full max-w-sm">
                       <Search className="absolute left-0 top-4 text-white/20" size={18} />
                       <input 
                        type="text" 
                        placeholder="Search Salts..."
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-8 outline-none focus:border-blue-500 transition-all text-lg"
                        onChange={(e) => setSearchTerm(e.target.value)}
                       />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex gap-4 mb-20 overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-8 py-3 rounded-xl border text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-white/40 hover:text-white hover:border-white'}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Products */}
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                      {filteredProducts.map((p) => (
                        <motion.div 
                          key={p._id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -10 }}
                          className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all"
                        >
                          <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-8 bg-slate-800">
                            <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" alt={p.name} />
                          </div>
                          <h3 className="text-2xl font-black uppercase mb-1">{p.name}</h3>
                          <p className="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-6">{p.category}</p>
                          <div className="h-[1px] w-full bg-white/10 mb-6"></div>
                          <p className="text-white/40 text-[10px] font-medium leading-relaxed mb-8 h-10 overflow-hidden italic">
                            {p.composition}
                          </p>
                          <button 
                            onClick={() => setSelectedProduct(p)}
                            className="w-full py-4 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                          >
                            Inquire Now
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </section>
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>

        <footer className="bg-white py-24 px-10 border-t border-slate-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="text-center md:text-left">
                <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">Nexus.</h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Global Pharma Network</p>
             </div>
             <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Link to="/" className="hover:text-blue-600 transition-colors">Vault</Link>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">Inquiry</Link>
                <Link to="/login" className="hover:text-blue-600 transition-colors">Privacy</Link>
             </div>
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">© 2026 Nexus Pharma</p>
          </div>
        </footer>

        {selectedProduct && <PriceModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
    </Router>
  );
};

export default App;