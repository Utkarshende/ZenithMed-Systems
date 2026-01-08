import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { 
  Beaker, Search, ShoppingCart, ShieldCheck, CreditCard, 
  Trash2, ChevronRight, QrCode, Lock, Truck, X, CheckCircle2 
} from 'lucide-react';

// Logic for API - Replace with your actual backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Details, 3: Payment, 4: Success

  // Categories & Sub-categories
  const categories = [
    { id: 'All', label: 'All Medicines' },
    { id: 'Oncology', label: 'Cancer Care', subs: ['Chemotherapy', 'Targeted Therapy'] },
    { id: 'Cardiology', label: 'Heart', subs: ['Beta Blockers', 'Statins'] },
    { id: 'Antibiotics', label: 'Infections', subs: ['Antivirals', 'Antifungals'] },
    { id: 'Critical', label: 'Critical Care', subs: ['ICU Meds', 'Emergency'] },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      // Fallback for demo if API fails
      const demoData = [
        { _id: '1', name: 'Sorafenib 200mg', category: 'Oncology', price: 450, composition: 'Anti-cancer', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
        { _id: '2', name: 'Atorvastatin 10mg', category: 'Cardiology', price: 120, composition: 'Cholesterol control', image: 'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?auto=format&fit=crop&q=80&w=400' }
      ];
      setProducts(data.length > 0 ? data : demoData);
    } catch (err) { setProducts([]); }
  };

  // --- CART LOGIC ---
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) return prev.map(item => item._id === product._id ? {...item, qty: item.qty + 1} : item);
      return [...prev, {...product, qty: 1}];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item._id !== id));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const filteredProducts = products.filter(p => 
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-slate-900">
        
        {/* --- NAVIGATION --- */}
        <nav className="fixed top-0 w-full z-[100] px-6 py-4 bg-white/80 backdrop-blur-md border-b flex justify-between items-center">
          <Link to="/" className="text-xl font-black tracking-tighter flex items-center gap-2">
            <Beaker className="text-blue-600" /> NEXUS PHARMA
          </Link>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2">
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* --- MAIN PAGE --- */}
        <div className="pt-24 px-6 max-w-7xl mx-auto">
          {/* SEARCH & CATEGORY BAR */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search for medicines or salt composition..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
            {filteredProducts.map(p => (
              <motion.div key={p._id} layout className="border rounded-[2rem] p-6 hover:shadow-xl transition-all group">
                <div className="aspect-square rounded-2xl bg-slate-100 mb-6 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-black uppercase truncate">{p.name}</h3>
                <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase">{p.composition}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-black text-blue-600">${p.price}</span>
                  <button 
                    onClick={() => addToCart(p)}
                    className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- SIDE CART & CHECKOUT OVERLAY --- */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex justify-end"
            >
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Your Order</h2>
                  <X className="cursor-pointer" onClick={() => {setIsCartOpen(false); setCheckoutStep(1);}} />
                </div>

                {/* STEPS INDICATOR */}
                <div className="flex gap-2 mb-8">
                  {[1, 2, 3].map(step => (
                    <div key={step} className={`h-1 flex-1 rounded-full ${checkoutStep >= step ? 'bg-blue-600' : 'bg-slate-100'}`} />
                  ))}
                </div>

                {/* STEP 1: CART ITEMS */}
                {checkoutStep === 1 && (
                  <div className="flex-1 overflow-y-auto space-y-4">
                    {cart.map(item => (
                      <div key={item._id} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm uppercase">{item.name}</h4>
                          <p className="text-blue-600 font-black text-sm">${item.price} x {item.qty}</p>
                        </div>
                        <Trash2 className="text-red-400 cursor-pointer" size={18} onClick={() => removeFromCart(item._id)} />
                      </div>
                    ))}
                    {cart.length === 0 && <p className="text-center text-slate-400 py-20 font-bold uppercase text-xs">Cart is empty</p>}
                  </div>
                )}

                {/* STEP 2: CUSTOMER DETAILS */}
                {checkoutStep === 2 && (
                  <div className="flex-1 space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3 mb-6">
                      <ShieldCheck className="text-emerald-600" />
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Your information is safe with us. End-to-end encrypted.</p>
                    </div>
                    <input type="text" placeholder="Receiver's Full Name" className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20" />
                    <input type="text" placeholder="Delivery Address" className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20" />
                    <input type="tel" placeholder="Phone Number" className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-600/20" />
                    <div className="p-4 border-2 border-dashed rounded-2xl text-center">
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Delivery Method</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-bold uppercase">Standard</button>
                        <button className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-bold uppercase">Express</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: PAYMENT (QR & OPTIONS) */}
                {checkoutStep === 3 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h3 className="font-black uppercase mb-6">Choose Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                      <button className="p-4 border-2 border-blue-600 rounded-2xl flex flex-col items-center gap-2">
                        <QrCode className="text-blue-600" />
                        <span className="text-[10px] font-bold uppercase">Pay Online</span>
                      </button>
                      <button className="p-4 border-2 border-slate-100 rounded-2xl flex flex-col items-center gap-2">
                        <Truck className="text-slate-400" />
                        <span className="text-[10px] font-bold uppercase">Cash on Delivery</span>
                      </button>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] w-full">
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-4 tracking-widest">Scan QR to pay via UPI/Bank</p>
                      <div className="w-40 h-40 bg-white mx-auto mb-4 border-4 border-white shadow-xl flex items-center justify-center">
                        <QrCode size={120} className="text-slate-900" />
                      </div>
                      <p className="font-black text-xl text-blue-600">${cartTotal}</p>
                    </div>
                  </div>
                )}

                {/* SUCCESS STEP */}
                {checkoutStep === 4 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 size={80} className="text-emerald-500 mb-6" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Order Placed!</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 uppercase tracking-widest text-[10px]">Your medicine is being packed and will be shipped within 24 hours.</p>
                    <button onClick={() => {setIsCartOpen(false); setCheckoutStep(1); setCart([]);}} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest">Done</button>
                  </div>
                )}

                {/* FOOTER ACTIONS */}
                {checkoutStep < 4 && (
                  <div className="pt-6 border-t mt-auto">
                    <div className="flex justify-between mb-6">
                      <span className="font-bold text-slate-400 uppercase text-xs">Total Amount</span>
                      <span className="font-black text-xl text-blue-600">${cartTotal}</span>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep(prev => prev + 1)}
                      disabled={cart.length === 0}
                      className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      {checkoutStep === 1 ? 'Checkout Now' : checkoutStep === 2 ? 'Continue to Payment' : 'Confirm Order'}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- HIGH END FOOTER --- */}
        <footer className="bg-slate-50 py-24 px-6 border-t mt-40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
                <Beaker className="text-blue-600" /> NEXUS.
              </h2>
              <div className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <p className="flex items-center gap-3"><MapPin size={14} /> Mohali Industrial Area, Punjab, India</p>
                <p className="flex items-center gap-3"><Lock size={14} /> SSL Secured & Encrypted Payments</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Company</h4>
              <Link to="/about" className="text-xs font-bold uppercase hover:text-blue-600">Our Heritage</Link>
              <Link to="/compliance" className="text-xs font-bold uppercase hover:text-blue-600">WHO-GMP Guidelines</Link>
            </div>
            <div className="bg-white p-8 rounded-3xl border flex flex-col items-center text-center">
              <ShieldCheck className="text-blue-600 mb-4" />
              <h4 className="text-[10px] font-black uppercase mb-2">Data Privacy</h4>
              <p className="text-[9px] text-slate-400 leading-relaxed uppercase tracking-widest">We never share your medical history. Your data is strictly used for order delivery.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;