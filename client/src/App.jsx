import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { 
  Pill, Search, LogOut, LayoutDashboard, 
  MapPin, Star, ArrowUpRight, Menu, Beaker, Globe, Shield, Zap, Quote, X, CheckCircle, Phone, Mail, Send, Award, Activity
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
    { id: 1, name: "Dr. Julian Voss", role: "Berlin Health", text: "Global logistics at its finest.", rating: 5 },
    { id: 2, name: "Maria Garcia", role: "Madrid Pharma", text: "Consistent quality and documentation.", rating: 5 }
  ]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

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

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesCategory && p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
        
        {/* --- NAVIGATION --- */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-6 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-slate-100 font-bold text-[10px] uppercase tracking-widest">
          <Link to="/" className="text-xl font-black tracking-tighter flex items-center gap-2">
            <Beaker className="text-blue-600" size={22} /> NEXUS.
          </Link>
          <div className="flex gap-8 items-center">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#vault" className="hover:text-blue-600">Vault</a>
            <a href="#contact" className="hover:text-blue-600">Inquiry</a>
            {isAdmin ? <Link to="/admin" className="text-blue-600">Admin</Link> : <Link to="/login">Login</Link>}
            <Menu size={18} />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main>
              {/* --- HERO --- */}
              <section className="h-[80vh] flex flex-col justify-center items-center text-center px-10">
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
                  NEXUS<br/><span className="text-blue-600 italic">PHARMA.</span>
                </h1>
                <p className="max-w-md text-slate-400 font-medium text-[10px] uppercase tracking-[0.4em]">Global Health Solutions & Clinical Logistics</p>
              </section>

              {/* --- 1. ABOUT SECTION --- */}
              <section id="about" className="py-32 px-10 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                  <div>
                    <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-6">Who We Are</h2>
                    <h3 className="text-5xl font-black tracking-tighter uppercase mb-8">Architects of<br/>Modern Medicine.</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                      Nexus Pharma is a premier WHO-GMP certified pharmaceutical export house specializing in high-potency formulations, oncology treatments, and critical care medicine. Since 2012, we have bridged the gap between advanced manufacturing and global accessibility.
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed italic">
                      "Our mission is to ensure that geography never limits a patient's access to life-saving science."
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
                       <Award className="text-blue-600 mb-4" />
                       <h4 className="text-[10px] font-black uppercase">Certified</h4>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 mt-10 flex flex-col items-center text-center">
                       <Globe className="text-blue-600 mb-4" />
                       <h4 className="text-[10px] font-black uppercase">Global</h4>
                    </div>
                  </div>
                </div>
              </section>

              {/* --- 2. PRODUCTS & SERVICES --- */}
              <section className="py-32 px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.4em] mb-16 text-center">Services & Expertise</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 border border-slate-100 rounded-[3rem] hover:bg-slate-50 transition-all">
                      <Activity className="text-blue-600 mb-6" />
                      <h4 className="text-xl font-black uppercase mb-4">Oncology Care</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">Specialized distribution of anti-cancer treatments with complete temperature-controlled handling.</p>
                    </div>
                    <div className="p-10 border border-slate-100 rounded-[3rem] hover:bg-slate-50 transition-all">
                      <Shield className="text-blue-600 mb-6" />
                      <h4 className="text-xl font-black uppercase mb-4">Bulk Sourcing</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">Strategic procurement for hospital groups and government contracts worldwide.</p>
                    </div>
                    <div className="p-10 border border-slate-100 rounded-[3rem] hover:bg-slate-50 transition-all">
                      <Zap className="text-blue-600 mb-6" />
                      <h4 className="text-xl font-black uppercase mb-4">Cold Chain</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">End-to-end medical logistics ensuring potency remains intact from factory to pharmacy.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* --- 3. VAULT (MEDICINE LIST) --- */}
              <section id="vault" className="py-32 px-10 bg-[#0F172A] rounded-t-[5vw] text-white">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <h2 className="text-6xl font-black tracking-tighter uppercase">Vault.</h2>
                    <div className="relative w-full max-w-sm">
                       <Search className="absolute left-0 top-4 text-white/30" size={20} />
                       <input 
                        type="text" 
                        placeholder="Search Salts..."
                        className="w-full bg-transparent border-b border-white/20 py-4 pl-10 outline-none focus:border-blue-500 transition-all text-xl"
                        onChange={(e) => setSearchTerm(e.target.value)}
                       />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredProducts.map(p => (
                      <div key={p._id} className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10">
                        <h3 className="text-2xl font-black uppercase mb-6 leading-none">{p.name}</h3>
                        <p className="text-white/40 text-[11px] font-medium leading-relaxed italic mb-8 h-12 line-clamp-2">{p.composition}</p>
                        <button onClick={() => setSelectedProduct(p)} className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all">Request Quote</button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* --- 4. MESSAGE BOX / INQUIRY --- */}
              <section id="contact" className="py-32 px-10 bg-white">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-[4rem] p-16 text-white text-center">
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Looking for a specific salt?</h2>
                  <p className="text-white/40 mb-10 uppercase tracking-widest text-[10px]">Tell us what you need, and our experts will source it for you.</p>
                  <form className="flex flex-col md:flex-row gap-4">
                    <input type="text" placeholder="I am looking for..." className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500" />
                    <button className="bg-blue-600 px-10 py-5 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-3">
                      Send Request <Send size={14} />
                    </button>
                  </form>
                </div>
              </section>

              {/* --- 5. RATINGS & REVIEWS --- */}
              <section className="py-32 px-10 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-5xl font-black tracking-tighter uppercase mb-16 text-center">Global Partner Feedback.</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {reviews.map(rev => (
                      <div key={rev.id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex gap-1 mb-6 text-blue-600">
                          <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" />
                        </div>
                        <p className="text-slate-600 font-medium italic mb-8 leading-relaxed">"{rev.text}"</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-xs">{rev.name[0]}</div>
                          <div>
                            <h4 className="text-[11px] font-black uppercase">{rev.name}</h4>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{rev.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        {/* --- 6. HIGH-END FOOTER --- */}
        <footer className="bg-white py-32 px-10 border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start mb-20">
              <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-8">Nexus.</h2>
                <div className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-400 leading-relaxed">
                   <p className="flex items-center gap-3"><MapPin size={14} className="text-blue-600" /> Phase 7, Industrial Area, Mohali, Punjab, IN</p>
                   <p className="flex items-center gap-3"><Phone size={14} className="text-blue-600" /> +91 172 400 0000</p>
                   <p className="flex items-center gap-3"><Mail size={14} className="text-blue-600" /> hello@nexuspharma.com</p>
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Navigation</h4>
                  <ul className="text-[10px] font-bold uppercase space-y-2 text-slate-500">
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#vault">Product Vault</a></li>
                    <li><a href="#contact">Inquire</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Compliance</h4>
                  <ul className="text-[10px] font-bold uppercase space-y-2 text-slate-500">
                    <li>WHO-GMP</li>
                    <li>ISO 9001:2015</li>
                    <li>CDSCO Certified</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-10 border-t border-slate-100 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
              <p>© 2026 NEXUS PHARMA PVT LTD</p>
              <div className="flex gap-8">
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
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