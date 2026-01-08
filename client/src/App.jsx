import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Beaker, ShoppingCart, Trash2, X, MapPin, Phone, Mail, 
  Star, Plus, Send, Zap, ShieldCheck, Heart, Info, CreditCard, Bitcoin
} from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMedInfo, setSelectedMedInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');

  // Expanded Product Data
  const products = [
    { id: '1', name: 'Sorafenib', category: 'Oncology', price: 450, desc: 'Blocks signals that help cancer cells multiply.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    { id: '2', name: 'Atorvastatin', category: 'Cardiology', price: 120, desc: 'Reduces LDL cholesterol by inhibiting liver enzymes.', image: 'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?w=400' },
    { id: '3', name: 'Amoxicillin', category: 'Antibiotics', price: 85, desc: 'Destroys the cell walls of harmful bacteria.', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400' },
    { id: '4', name: 'Enoxaparin', category: 'Cardiology', price: 210, desc: 'Prevents blood clots by neutralizing clotting factors.', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1598377?w=400' },
    { id: '5', name: 'Erlotinib', category: 'Oncology', price: 890, desc: 'Targeted therapy for lung cancer protein pathways.', image: 'https://images.unsplash.com/photo-1550573105-df5286595462?w=400' },
    { id: '6', name: 'Azithromycin', category: 'Antibiotics', price: 65, desc: 'Stops bacterial protein synthesis.', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400' }
  ];

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      return [...prev, {...product, qty: 1}];
    });
    // Playful Toast
    toast.success(`${product.name} added to your vault!`, {
      icon: '💊',
      style: { borderRadius: '20px', background: '#0F172A', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
        
        {/* NAV */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-5 flex justify-between items-center bg-white/90 backdrop-blur-md border-b">
          <Link to="/" className="text-2xl font-black flex items-center gap-2 text-blue-900">
            <Beaker className="text-blue-600" /> NEXUS.
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="bg-blue-600 text-white p-3 rounded-full px-6 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
            <ShoppingCart size={16} /> <span className="font-black text-sm">{cart.length}</span>
          </button>
        </nav>

        <main className="pt-24">
          {/* PRODUCT VAULT */}
          <section className="py-20 px-10 bg-[#020617] text-white rounded-b-[4rem]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-16">The Vault.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map(p => (
                  <motion.div key={p.id} whileHover={{ y: -10 }} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] group relative">
                    {/* Playful Image Click */}
                    <div 
                      className="cursor-pointer relative overflow-hidden rounded-2xl aspect-square mb-6"
                      onClick={() => setSelectedMedInfo(p)}
                    >
                      <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Info className="text-white" size={40} />
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-black uppercase mb-2">{p.name}</h4>
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">{p.category}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-white">${p.price}</span>
                      <button 
                        onClick={() => addToCart(p)}
                        className="bg-blue-600 text-white p-4 rounded-xl hover:bg-white hover:text-blue-900 transition-all active:scale-90"
                      >
                        <Plus size={20} strokeWidth={3} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PLAYFUL DESCRIPTION MODAL */}
          <AnimatePresence>
            {selectedMedInfo && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
                <motion.div initial={{ scale: 0.8, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} className="bg-white p-10 rounded-[3rem] max-w-md text-center relative">
                  <button onClick={() => setSelectedMedInfo(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"><X /></button>
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center text-blue-600">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-4">{selectedMedInfo.name}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8">
                    {selectedMedInfo.desc}
                  </p>
                  <button onClick={() => {addToCart(selectedMedInfo); setSelectedMedInfo(null);}} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest">Add To My Order</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* CHECKOUT SIDEBAR */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex justify-end">
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="w-full max-w-md bg-white h-full p-10 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Your Checkout</h2>
                  <X className="cursor-pointer" onClick={() => setIsCartOpen(false)} />
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl items-center border">
                      <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 text-xs font-black uppercase">{item.name} <span className="text-blue-600">${item.price}</span></div>
                      <Trash2 size={16} className="text-red-400 cursor-pointer" onClick={() => removeFromCart(item.id)} />
                    </div>
                  ))}
                </div>

                {/* PAYMENT PLATFORMS */}
                <div className="py-6 border-t mt-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Select Payment Logic</h4>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                      onClick={() => setPaymentMethod('online')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'online' ? 'border-blue-600 bg-blue-50' : 'border-slate-100'}`}
                    >
                      <CreditCard className="text-blue-600" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Online Platform</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100'}`}
                    >
                      <Truck className="text-emerald-600" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Cash Delivery</span>
                    </button>
                  </div>

                  {paymentMethod === 'online' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mb-6">
                      <div className="flex-1 p-3 bg-slate-50 rounded-xl border flex justify-center"><CreditCard size={20} className="text-slate-400" /></div>
                      <div className="flex-1 p-3 bg-slate-50 rounded-xl border flex justify-center text-blue-600 font-black text-[10px] py-4">STRIPE</div>
                      <div className="flex-1 p-3 bg-slate-50 rounded-xl border flex justify-center"><Bitcoin size={20} className="text-orange-400" /></div>
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-black uppercase text-xs">Total Due</span>
                    <span className="text-2xl font-black text-blue-600">${cartTotal}</span>
                  </div>
                  <button className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100">Confirm Order</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="bg-slate-50 py-32 px-10 border-t">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-6">Nexus.</h2>
              <div className="text-[10px] font-black uppercase text-slate-400 space-y-3">
                <p className="flex items-center gap-2"><MapPin size={14} className="text-blue-600" /> Mohali, Punjab, India</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-blue-600" /> +91 172 400 0000</p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
               <ShieldCheck className="text-emerald-500 mb-4" />
               <h4 className="text-[10px] font-black uppercase mb-2">Safe Data Guarantee</h4>
               <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-loose">We use AES-256 bit encryption to ensure your medical orders remain confidential.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;