import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { 
  Beaker, Search, ShoppingCart, ShieldCheck, CreditCard, 
  Trash2, ChevronRight, QrCode, Lock, Truck, X, CheckCircle2,
  MapPin, Phone, Mail, Award, Activity, Zap, Globe, Quote
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      const demoData = [
        { _id: '1', name: 'Sorafenib 200mg', category: 'Oncology', price: 450, composition: 'Nexavar Salt', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
        { _id: '2', name: 'Atorvastatin 10mg', category: 'Cardiology', price: 120, composition: 'Lipitor Salt', image: 'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?w=400' },
        { _id: '3', name: 'Amoxicillin 500mg', category: 'Antibiotics', price: 80, composition: 'Bacterial salt', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400' }
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
      <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
        
        {/* --- LUXURY NAV --- */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-6 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b">
          <Link to="/" className="text-xl font-black tracking-tighter flex items-center gap-2">
            <Beaker className="text-blue-600" size={22} /> NEXUS.
          </Link>
          <div className="flex gap-8 items-center font-bold text-[10px] uppercase tracking-widest">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#vault" className="hover:text-blue-600">Vault</a>
            <button onClick={() => setIsCartOpen(true)} className="relative bg-slate-900 text-white p-2 rounded-full px-4 flex items-center gap-2">
              <ShoppingCart size={14} /> <span>{cart.length}</span>
            </button>
          </div>
        </nav>

        {/* --- LANDING CONTENT --- */}
        <main>
          {/* HERO */}
          <section className="h-screen flex flex-col justify-center items-center text-center px-10">
            <span className="text-[10px] font-black tracking-[0.6em] text-blue-600 uppercase mb-6 block">Global Export Authority</span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6">
              PURE<br/><span className="text-slate-300 italic font-light">SCIENCE.</span>
            </h1>
            <p className="max-w-md mx-auto text-slate-400 font-medium text-[10px] uppercase tracking-[0.4em]">Life-saving formulations delivered worldwide.</p>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="py-32 px-10 bg-slate-50 border-y">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-6">Our Legacy</h2>
                <h3 className="text-5xl font-black tracking-tighter uppercase mb-8">Bridging Science & Humanity.</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Nexus Pharma is a WHO-GMP certified distributor. We specialize in cold-chain logistics for oncology, cardiology, and critical care medicines. Your health security is our primary directive.
                </p>
                <div className="flex gap-4">
                   <div className="bg-white p-4 rounded-2xl border flex items-center gap-3">
                      <ShieldCheck className="text-blue-600" /> <span className="text-[10px] font-black">WHO-GMP</span>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border flex items-center gap-3">
                      <Globe className="text-blue-600" /> <span className="text-[10px] font-black">50+ COUNTRIES</span>
                   </div>
                </div>
              </div>
              <div className="aspect-video bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-100">
                 <img src="https://images.unsplash.com/photo-1579165466511-703358f96cb9?w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Lab" />
              </div>
            </div>
          </section>

          {/* PRODUCT VAULT */}
          <section id="vault" className="py-32 px-10 bg-[#0F172A] rounded-t-[5vw] text-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black tracking-tighter uppercase mb-16">Vault.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map(p => (
                  <div key={p._id} className="bg-white/5 border border-white/5 p-8 rounded-[3rem] group">
                    <img src={p.image} className="w-full aspect-square object-cover rounded-3xl mb-6 opacity-80 group-hover:opacity-100" />
                    <h4 className="text-xl font-black uppercase mb-2">{p.name}</h4>
                    <p className="text-[10px] font-black text-blue-400 mb-6 tracking-widest uppercase">{p.composition}</p>
                    <div className="flex justify-between items-center">
                       <span className="text-2xl font-black">${p.price}</span>
                       <button onClick={() => addToCart(p)} className="bg-white text-slate-900 p-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                          <ShoppingCart size={18} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="py-32 px-10 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
              <Quote size={40} className="text-blue-600 mb-8" />
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">Verified Feedback</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                 <div className="p-10 bg-slate-50 rounded-[3rem] border">
                    <p className="italic text-slate-600 mb-6 font-medium">"Nexus provided seamless logistics for our hospital group in Berlin. The temperature control was perfect."</p>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Dr. Julian Voss — Berlin Health</h5>
                 </div>
                 <div className="p-10 bg-slate-50 rounded-[3rem] border">
                    <p className="italic text-slate-600 mb-6 font-medium">"Top-tier documentation and fast export processing. Highly recommend for bulk sourcing."</p>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Maria Garcia — Wholesaler</h5>
                 </div>
              </div>
            </div>
          </section>
        </main>

        {/* --- HIGH END FOOTER --- */}
        <footer className="bg-white py-32 px-10 border-t border-slate-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
                <Beaker className="text-blue-600" /> NEXUS.
              </h2>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10">© 2026 Nexus Pharma Pvt Ltd</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Global HQ</h4>
              <div className="text-xs font-bold uppercase tracking-widest space-y-3">
                <p className="flex items-center gap-2"><MapPin size={14} /> Phase 7, Industrial Area, Mohali, India</p>
                <p className="flex items-center gap-2"><Phone size={14} /> +91 172 400 0000</p>
                <p className="flex items-center gap-2"><Mail size={14} /> info@nexuspharma.com</p>
              </div>
            </div>
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] text-center">
               <ShieldCheck className="mx-auto mb-4 text-blue-400" />
               <h4 className="text-[10px] font-black uppercase mb-2">Encrypted Transactions</h4>
               <p className="text-[9px] text-white/40 leading-relaxed uppercase tracking-widest">Your clinical information and payment data is protected by bank-grade security protocols.</p>
            </div>
          </div>
        </footer>

        {/* --- CHECKOUT DRAWER --- */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex justify-end">
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="w-full max-w-md bg-white h-full p-8 flex flex-col shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Your Order</h2>
                  <X className="cursor-pointer" onClick={() => {setIsCartOpen(false); setCheckoutStep(1);}} />
                </div>

                {checkoutStep === 1 && (
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item._id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl items-center">
                        <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 text-xs font-bold uppercase">{item.name} <span className="text-blue-600">x{item.qty}</span></div>
                        <Trash2 size={16} className="text-red-400 cursor-pointer" onClick={() => removeFromCart(item._id)} />
                      </div>
                    ))}
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div className="flex-1 space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-xl flex items-center gap-2 mb-4">
                       <ShieldCheck className="text-emerald-600" size={16} />
                       <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest">Information is Safe With Us</span>
                    </div>
                    <input type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-xl outline-none" />
                    <input type="text" placeholder="Shipping Address" className="w-full p-4 bg-slate-50 rounded-xl outline-none" />
                    <input type="tel" placeholder="Contact Number" className="w-full p-4 bg-slate-50 rounded-xl outline-none" />
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <QrCode size={120} className="mb-6 text-slate-900" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Scan for UPI / Bank Payment</p>
                    <p className="text-3xl font-black text-blue-600">${cartTotal}</p>
                  </div>
                )}

                <div className="pt-8 border-t mt-auto">
                  <div className="flex justify-between mb-6 font-black uppercase text-xs">
                    <span>Total Cost</span> <span>${cartTotal}</span>
                  </div>
                  <button onClick={() => checkoutStep < 3 ? setCheckoutStep(checkoutStep + 1) : (toast.success("Order Placed!"), setIsCartOpen(false))} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">
                    {checkoutStep === 1 ? "Checkout" : checkoutStep === 2 ? "Continue to Payment" : "Confirm Payment"}
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