import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { 
  Pill, Search, LogIn, LogOut, LayoutDashboard, 
  MapPin, Star, ArrowUpRight, Plus, Menu 
} from 'lucide-react';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PriceModal from './components/PriceModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// UX: Smooth scroll and perspective helper
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

  const categories = [
    { id: 'All', label: 'Vault', icon: '💎' },
    { id: 'Oncology', label: 'Oncology', icon: '🎗️' },
    { id: 'Cardiology', label: 'Cardiology', icon: '❤️' },
    { id: 'Antibiotics', label: 'Antibiotics', icon: '🦠' },
    { id: 'Nephrology', label: 'Nephrology', icon: '🧪' },
    { id: 'Gastroenterology', label: 'Gastro', icon: '🍏' },
  ];

  // Custom Cursor Logic
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
    
    // Check if data is the array itself, or if it's inside an object property
    if (Array.isArray(data)) {
      setProducts(data);
    } else if (data.products && Array.isArray(data.products)) {
      setProducts(data.products);
    } else {
      setProducts([]); // Fallback to empty array to prevent crash
    }
  } catch (err) { 
    console.error("Fetch error:", err);
    setProducts([]); // Prevent crash on network error
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
      
      {/* 1. AWWARDS CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-blue-600 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />

      <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        
        {/* --- MINIMAL NAV --- */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-8 flex justify-between items-center mix-blend-difference text-white">
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase">Nexus.</Link>
          <div className="flex gap-10 items-center font-bold text-xs uppercase tracking-widest">
            <Link to="/contact" className="hover:line-through transition-all">Inquiry</Link>
            {isAdmin ? (
              <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="hover:line-through">Logout</button>
            ) : (
              <Link to="/login" className="hover:line-through">Access</Link>
            )}
            <Menu size={20} className="cursor-pointer" />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main>
              {/* --- 2. THE HERO (Editorial Style) --- */}
              <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-10">
                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center z-10"
                >
                  <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter uppercase mb-4">
                    Pure<br/><span className="text-blue-600 italic">Science.</span>
                  </h1>
                  <p className="max-w-md mx-auto text-slate-500 font-medium text-lg">
                    Global pharmaceutical distribution with clinical-grade precision.
                  </p>
                </motion.div>

                {/* Decorative background numbers */}
                <div className="absolute bottom-10 left-10 text-[10vw] font-black opacity-[0.03] select-none">001</div>
              </section>

              {/* --- 3. THE CATALOG (3D Cards) --- */}
              <section className="py-40 px-10 bg-[#0F172A] rounded-t-[5vw] text-white">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <h2 className="text-7xl font-black tracking-tighter">THE<br/>VAULT.</h2>
                    <div className="relative w-full max-w-sm">
                       <input 
                        type="text" 
                        placeholder="Search formulations..."
                        className="w-full bg-transparent border-b-2 border-white/20 py-4 outline-none focus:border-blue-500 transition-all text-xl"
                        onChange={(e) => setSearchTerm(e.target.value)}
                       />
                    </div>
                  </div>

                  {/* Categories Strip */}
                  <div className="flex gap-4 mb-20 overflow-x-auto no-scrollbar pb-4">
                    {categories.map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-10 py-4 rounded-full border font-bold text-xs uppercase tracking-widest transition-all ${activeCategory === cat.id ? 'bg-white text-slate-900' : 'border-white/20 hover:border-white'}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Product Grid with Perspective */}
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <AnimatePresence>
                      {filteredProducts.map((p, idx) => (
                        <motion.div 
                          key={p._id}
                          layout
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          whileHover={{ rotateX: 5, rotateY: -5, z: 50 }}
                          className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-700 cursor-none"
                        >
                          <div className="aspect-square overflow-hidden rounded-2xl mb-8">
                            <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                          </div>
                          <h3 className="text-3xl font-black mb-2">{p.name}</h3>
                          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">{p.category}</p>
                          <button 
                            onClick={() => setSelectedProduct(p)}
                            className="w-full py-5 border border-white/20 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] group-hover:bg-blue-600 group-hover:border-blue-600 transition-all"
                          >
                            Request Access
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

        {/* --- 4. THE FOOTER (Dark Corporate) --- */}
        <footer className="bg-white py-40 px-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-[12vw] font-black tracking-tighter text-slate-900 leading-none mb-20">NEXUS.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-20 text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
              <div className="space-y-4">
                <p className="text-slate-900">Office</p>
                <p>Industrial Phase VII,<br/>Punjab, India</p>
              </div>
              <div className="space-y-4">
                <p className="text-slate-900">Digital</p>
                <p>Instagram / LinkedIn / X</p>
              </div>
              <div className="space-y-4 text-right">
                <p className="text-slate-900">Contact</p>
                <p>Hello@nexuspharma.com</p>
              </div>
            </div>
          </div>
        </footer>

        {selectedProduct && <PriceModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
    </Router>
  );
};

export default App;