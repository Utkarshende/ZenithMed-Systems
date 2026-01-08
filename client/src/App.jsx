import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { 
  Pill, Search, LogOut, LayoutDashboard, 
  MapPin, Star, ArrowUpRight, Menu, Beaker, Globe, Shield, Zap, Quote, X, CheckCircle 
} from 'lucide-react';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PriceModal from './components/PriceModal';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Dr. Julian Voss", role: "Chief Pharmacist, Berlin", text: "The supply chain reliability for Oncology meds is unmatched.", rating: 5 },
    { id: 2, name: "Maria Garcia", role: "Wholesale Director, Madrid", text: "Seamless export documentation and perfect cold-chain maintenance.", rating: 5 }
  ]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: '', text: '', rating: 5 });

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(Array.isArray(data) ? data : (data.products || []));
    } catch (err) { setProducts([]); }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { ...newReview, id: Date.now() }]);
    toast.success("Review submitted for verification!");
    setShowReviewModal(false);
    setNewReview({ name: '', role: '', text: '', rating: 5 });
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        
        {/* NAV */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-6 flex justify-between items-center bg-white/60 backdrop-blur-xl border-b border-slate-100">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
            <Beaker className="text-blue-600" size={20} /> Nexus.
          </Link>
          <div className="flex gap-8 items-center font-bold text-[9px] uppercase tracking-[0.2em]">
            <Link to="/contact">Contact</Link>
            {isAdmin ? <Link to="/admin" className="text-blue-600">Dashboard</Link> : <Link to="/login">Admin</Link>}
            <Menu size={18} />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main>
              {/* HERO */}
              <section className="h-[80vh] flex flex-col justify-center items-center text-center px-10">
                <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase mb-6 block">Global Pharma Leaders</span>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9]">PURE<br/><span className="text-slate-300 italic font-light">SCIENCE.</span></h1>
              </section>

              {/* STATS */}
              <section className="py-20 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-10 px-10 border-y border-slate-100">
                {[{i: Shield, t: "WHO-GMP", d: "Certified global standards."}, {i: Globe, t: "50+ Countries", d: "Global export footprint."}, {i: Zap, t: "Fast Track", d: "Express medical logistics."}].map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-3">
                    <s.i className="text-blue-600" size={24} />
                    <h3 className="text-[10px] font-black uppercase tracking-widest">{s.t}</h3>
                    <p className="text-slate-400 text-[11px]">{s.d}</p>
                  </div>
                ))}
              </section>

              {/* --- REVIEWS SECTION --- */}
              <section className="py-32 px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-end mb-16">
                    <div>
                      <h2 className="text-5xl font-black tracking-tighter uppercase">Feedback.</h2>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Verified Partner Relations</p>
                    </div>
                    <button 
                      onClick={() => setShowReviewModal(true)}
                      className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                    >
                      Write Review <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((rev) => (
                      <motion.div whileHover={{ y: -5 }} key={rev.id} className="p-10 border border-slate-100 rounded-[2.5rem] bg-slate-50 relative overflow-hidden">
                        <Quote className="absolute -right-4 -top-4 text-slate-100" size={120} />
                        <div className="relative z-10">
                          <div className="flex gap-1 mb-6">
                            {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="#2563EB" className="text-blue-600" />)}
                          </div>
                          <p className="text-slate-600 font-medium italic mb-8 leading-relaxed">"{rev.text}"</p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-xs uppercase">
                              {rev.name[0]}
                            </div>
                            <div>
                              <h4 className="text-xs font-black uppercase flex items-center gap-1">
                                {rev.name} <CheckCircle size={12} className="text-emerald-500" />
                              </h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{rev.role}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* PRODUCT VAULT */}
              <section className="py-32 px-10 bg-[#0F172A] rounded-t-[5vw] text-white">
                <h2 className="text-6xl font-black tracking-tighter uppercase mb-20 text-center">Vault.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {filteredProducts.map(p => (
                    <div key={p._id} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all">
                      <div className="aspect-square bg-slate-800 rounded-2xl mb-6 overflow-hidden">
                        <img src={p.image} className="w-full h-full object-cover opacity-80" alt={p.name} />
                      </div>
                      <h3 className="text-2xl font-black uppercase mb-4">{p.name}</h3>
                      <button onClick={() => setSelectedProduct(p)} className="w-full py-4 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest">Get Quote</button>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {/* --- REVIEW MODAL --- */}
        <AnimatePresence>
          {showReviewModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-12 rounded-[3rem] w-full max-w-lg shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black tracking-tighter uppercase">Partner Feedback</h2>
                  <X className="cursor-pointer" onClick={() => setShowReviewModal(false)} />
                </div>
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  <input required placeholder="Full Name" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-sm" onChange={(e) => setNewReview({...newReview, name: e.target.value})} />
                  <input required placeholder="Medical Title / Company" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-sm" onChange={(e) => setNewReview({...newReview, role: e.target.value})} />
                  <textarea required placeholder="Share your experience with Nexus..." className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-sm min-h-[120px]" onChange={(e) => setNewReview({...newReview, text: e.target.value})} />
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200">Submit Verification</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="bg-white py-20 px-10 border-t border-slate-100 text-center">
          <h2 className="text-8xl font-black tracking-tighter uppercase mb-10 leading-none">Nexus.</h2>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">© 2026 Nexus Pharma Pvt Ltd</p>
        </footer>

        {selectedProduct && <PriceModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </div>
    </Router>
  );
};

export default App;