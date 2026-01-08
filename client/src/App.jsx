import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { 
  Beaker, Search, ShoppingCart, ShieldCheck, 
  Trash2, ChevronRight, QrCode, Lock, Truck, X, 
  MapPin, Phone, Mail, Globe, Quote, Star, Plus, Send
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, name: "Dr. Aris Thorne", role: "Hospital Director", text: "The cold-chain integrity for oncology meds is flawless.", rating: 5 },
    { id: 2, name: "Sarah Jenkins", role: "Pharma Wholesaler", text: "Nexus is our most reliable partner for bulk exports.", rating: 5 }
  ]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      const demoData = [
        { _id: '1', name: 'Sorafenib 200mg', category: 'Oncology', price: 450, composition: 'Anti-Cancer Salt', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
        { _id: '2', name: 'Atorvastatin 10mg', category: 'Cardiology', price: 120, composition: 'Heart Care Salt', image: 'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?w=400' },
        { _id: '3', name: 'Amoxicillin 500mg', category: 'General', price: 85, composition: 'Antibiotic Salt', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400' }
      ];
      setProducts(data.length > 0 ? data : demoData);
    } catch (err) { setProducts([]); }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) return prev.map(item => item._id === product._id ? {...item, qty: item.qty + 1} : item);
      return [...prev, {...product, qty: 1}];
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item._id !== id));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
        
        {/* --- DYNAMIC NAV --- */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-5 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-slate-100">
          <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 text-blue-900">
            <Beaker className="text-blue-600" size={24} strokeWidth={3} /> NEXUS.
          </Link>
          <div className="flex gap-10 items-center font-bold text-[11px] uppercase tracking-widest text-slate-500">
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#vault" className="hover:text-blue-600 transition-colors">Products</a>
            <a href="#reviews" className="hover:text-blue-600 transition-colors">Reviews</a>
            <button onClick={() => setIsCartOpen(true)} className="relative bg-blue-600 text-white p-2.5 rounded-full px-5 flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
              <ShoppingCart size={15} /> <span>{cart.length}</span>
            </button>
          </div>
        </nav>

        <main>
          {/* --- HERO: PURE SCIENCE --- */}
          <section className="h-[90vh] flex flex-col justify-center items-center text-center px-10 bg-gradient-to-b from-blue-50/50 to-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-[11px] font-black tracking-[0.6em] text-blue-600 uppercase mb-8 block">EST. 2012 • WHO-GMP CERTIFIED</span>
              <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-8 text-slate-900">
                PURE<br/><span className="text-blue-600 italic font-light">SCIENCE.</span>
              </h1>
              <p className="max-w-lg mx-auto text-slate-500 font-medium text-xs uppercase tracking-[0.3em] leading-relaxed">
                Global distribution of life-critical pharmaceutical formulations.
              </p>
            </motion.div>
          </section>

          {/* --- ABOUT: BLUE ACCENT SECTION --- */}
          <section id="about" className="py-32 px-10 bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square bg-blue-800 rounded-[4rem] overflow-hidden border-8 border-white/5">
                <img src="https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?w=800" className="w-full h-full object-cover mix-blend-overlay opacity-60" alt="Lab" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe size={150} className="text-white/10 animate-pulse" />
                </div>
              </div>
              <div>
                <h2 className="text-[11px] font-black text-blue-300 uppercase tracking-[0.4em] mb-6">Our Authority</h2>
                <h3 className="text-5xl font-black tracking-tighter uppercase mb-8 leading-tight">Decades of Medical<br/>Precision.</h3>
                <p className="text-blue-100/70 leading-relaxed mb-10 font-medium text-lg">
                  Nexus Pharma operates as a pivotal node in the global healthcare supply chain, ensuring oncology and cardiology treatments reach clinics across 50+ countries with zero compromise.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                    <ShieldCheck className="text-blue-400 mb-4" />
                    <h5 className="font-black uppercase text-xs tracking-widest">WHO-GMP Compliant</h5>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                    <Truck className="text-blue-400 mb-4" />
                    <h5 className="font-black uppercase text-xs tracking-widest">Global Logistics</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- VAULT: DEEP NAVY SECTION --- */}
          <section id="vault" className="py-32 px-10 bg-[#020617] text-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-20">
                <h2 className="text-7xl font-black tracking-tighter uppercase">Vault.</h2>
                <span className="text-blue-500 font-black text-[10px] tracking-[0.4em] uppercase mb-4 underline">Live Inventory</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {products.map(p => (
                  <motion.div whileHover={{ y: -10 }} key={p._id} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] group transition-all hover:bg-white/[0.08]">
                    <div className="bg-slate-800 rounded-3xl mb-8 overflow-hidden aspect-square">
                      <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" />
                    </div>
                    <h4 className="text-2xl font-black uppercase mb-2 tracking-tighter">{p.name}</h4>
                    <p className="text-[11px] font-black text-blue-500 mb-8 tracking-[0.2em] uppercase">{p.composition}</p>
                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                       <span className="text-3xl font-black">${p.price}</span>
                       <button onClick={() => addToCart(p)} className="bg-blue-600 text-white p-5 rounded-2xl hover:bg-white hover:text-blue-900 transition-all shadow-xl shadow-blue-900/20">
                          <Plus size={20} strokeWidth={3} />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- REVIEWS: SOFT SURGICAL BLUE SECTION --- */}
          <section id="reviews" className="py-32 px-10 bg-[#F0F7FF]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
                <div className="text-center md:text-left">
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 text-blue-900">Partner Feedback</h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Verified Global Medical Reviews</p>
                </div>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-blue-900 text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-blue-200"
                >
                  {showReviewForm ? <X size={14} /> : <Plus size={14} />} 
                  {showReviewForm ? "Close Form" : "Add My Review"}
                </button>
              </div>

              {showReviewForm && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 bg-white p-12 rounded-[3rem] border border-blue-100 shadow-xl max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-blue-500" />
                      <input type="text" placeholder="Designation" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-blue-500" />
                    </div>
                    <textarea placeholder="Your experience with Nexus Pharma..." className="w-full p-4 bg-slate-50 rounded-2xl outline-none border focus:border-blue-500 h-32" />
                    <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                      Submit Verification <Send size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-12 bg-white rounded-[4rem] border border-blue-100 shadow-sm relative group">
                    <Quote className="absolute right-10 top-10 text-blue-50" size={60} />
                    <div className="flex gap-1 mb-6 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-slate-700 text-xl font-medium italic mb-10 leading-relaxed relative z-10">"{rev.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-sm">{rev.name[0]}</div>
                      <div>
                        <h4 className="text-[12px] font-black uppercase text-blue-900">{rev.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rev.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* --- ENHANCED MEGA FOOTER --- */}
        <footer className="bg-white border-t border-slate-100 pt-32 pb-10 px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
              <div className="col-span-1 md:col-span-1">
                <Link to="/" className="text-3xl font-black tracking-tighter flex items-center gap-2 text-blue-900 mb-8">
                  <Beaker className="text-blue-600" size={30} /> NEXUS.
                </Link>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-loose">
                  Precision Pharmaceutical<br/>Distribution Network.<br/>WHO-GMP Certified House.
                </p>
              </div>
              
              <div className="space-y-8">
                <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Quick Links</h4>
                <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-600">
                  <li className="hover:text-blue-600 cursor-pointer">Product Catalog</li>
                  <li className="hover:text-blue-600 cursor-pointer">Quality Control</li>
                  <li className="hover:text-blue-600 cursor-pointer">Global Logistics</li>
                  <li className="hover:text-blue-600 cursor-pointer">Admin Portal</li>
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Contact HQ</h4>
                <div className="space-y-6 text-xs font-black uppercase tracking-widest text-slate-600">
                  <p className="flex items-center gap-3"><MapPin size={16} className="text-blue-600" /> Industrial Area, Phase-7, Mohali, India</p>
                  <p className="flex items-center gap-3"><Phone size={16} className="text-blue-600" /> +91 172 400 0000</p>
                  <p className="flex items-center gap-3"><Mail size={16} className="text-blue-600" /> info@nexuspharma.com</p>
                </div>
              </div>

              <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
                <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live Operations
                </h4>
                <p className="text-[10px] text-blue-900/60 font-bold uppercase leading-loose">
                  Our supply lines are currently active in North America, Europe, and MENA regions. Cold-chain status: 100% Secure.
                </p>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">© 2026 NEXUS PHARMA PVT LTD — ALL RIGHTS RESERVED</p>
              <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="hover:text-blue-600 cursor-pointer">LinkedIn</span>
                <span className="hover:text-blue-600 cursor-pointer">Twitter</span>
                <span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span>
              </div>
            </div>
          </div>
        </footer>

        {/* --- SECURE CHECKOUT SIDEBAR --- */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex justify-end">
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="w-full max-w-md bg-white h-full p-10 flex flex-col shadow-2xl">
                <div className="flex justify-between items-center mb-10 pb-6 border-b">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-blue-900">Checkout</h2>
                  <X className="cursor-pointer text-slate-400" onClick={() => setIsCartOpen(false)} />
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item._id} className="flex gap-4 p-5 bg-slate-50 rounded-[2rem] items-center border border-slate-100">
                      <img src={item.image} className="w-14 h-14 rounded-2xl object-cover" />
                      <div className="flex-1 text-[11px] font-black uppercase text-slate-700 leading-tight">
                        {item.name} <div className="text-blue-600 mt-1">${item.price} x {item.qty}</div>
                      </div>
                      <Trash2 size={16} className="text-red-400 cursor-pointer" onClick={() => removeFromCart(item._id)} />
                    </div>
                  ))}
                </div>

                <div className="pt-8 mt-auto space-y-6">
                  <div className="bg-emerald-50 p-6 rounded-3xl flex items-center gap-4">
                    <Lock className="text-emerald-600" size={20} />
                    <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-relaxed">Secure Transaction<br/>256-Bit Encryption</p>
                  </div>
                  <div className="flex justify-between font-black uppercase text-lg text-blue-900 px-2">
                    <span>Total Amount</span> <span>${cartTotal}</span>
                  </div>
                  <button className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;