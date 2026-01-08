import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Search, ShoppingCart, Pill, ShieldCheck, Mail, Phone, MapPin, Trash2, Plus, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  // --- STATE MANAGEMENT ---
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Oncology', 'Cardiology', 'General', 'Gastroenterology'];

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchMeds = async () => {
      setLoading(true);
      try {
        const catParam = activeCategory !== 'All' ? `&category=${activeCategory}` : '';
        // Adjusted to your modular backend route: /api/products
        const response = await fetch(`http://localhost:5000/api/products?query=${searchQuery}${catParam}`);
        const data = await response.json();
        setMedicines(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchMeds, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, activeCategory]);

  // --- ACTIONS ---
  const addToCart = (med) => {
    setCart([...cart, med]);
    toast.success(`${med.name} added to cart!`, {
      style: { background: '#10847e', color: '#fff', borderRadius: '10px' }
    });
  };

  return (
    <div className="font-sans bg-[#f3f7fb] text-slate-900 scroll-smooth">
      <Toaster position="top-right" />

      {/* --- 1. NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#10847e] font-black text-2xl tracking-tighter">
            <Pill size={32} /> NEXUS PHARMA
          </div>
          
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search 10,000+ medicines..." 
              className="w-full bg-slate-100 border-none py-3 pl-12 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-[#10847e] transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <ShoppingCart size={24} className="text-slate-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
            <button className="hidden md:block bg-[#10847e] text-white px-6 py-2.5 rounded-xl font-bold text-sm">Login</button>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <header className="bg-gradient-to-r from-[#10847e] to-[#0d6b66] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Your Health, <br /> Delivered in Record Time.
            </h1>
            <p className="text-emerald-100 text-lg mb-8 opacity-90">
              Nexus Pharma provides access to 10,000+ authentic medicines with 100% cold-chain integrity.
            </p>
            <div className="flex gap-4">
              <a href="#products" className="bg-white text-[#10847e] px-8 py-4 rounded-2xl font-black shadow-xl">Order Now</a>
              <a href="#about" className="bg-transparent border border-white/30 px-8 py-4 rounded-2xl font-bold">Learn More</a>
            </div>
          </motion.div>
          <div className="hidden md:flex justify-center">
            <ShieldCheck size={300} className="text-white/20" />
          </div>
        </div>
      </header>

      {/* --- 3. PRODUCT SECTION --- */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Category Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-6 ml-2">Browse Categories</h3>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeCategory === cat ? 'bg-[#10847e] text-white shadow-lg' : 'hover:bg-white text-slate-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8">
               <h2 className="text-3xl font-black text-slate-800">Medicines Catalogue</h2>
               <span className="text-sm font-bold text-slate-400">{medicines.length} results</span>
            </div>

            {loading ? (
              <div className="h-96 flex items-center justify-center font-bold text-[#10847e] animate-pulse">Syncing with Nexus Vault...</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {medicines.map(med => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={med._id} 
                      className="bg-white p-5 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-blue-100 transition-all cursor-pointer group"
                    >
                      <div className="aspect-square bg-slate-50 rounded-2xl mb-4 flex items-center justify-center text-3xl text-[#10847e] font-black group-hover:bg-[#10847e] group-hover:text-white transition-colors">
                        {med.name.charAt(0)}
                      </div>
                      <h4 className="font-bold text-slate-800 line-clamp-1 mb-1">{med.name}</h4>
                      <p className="text-[10px] font-black text-[#10847e] uppercase tracking-widest mb-4 opacity-60">{med.category}</p>
                      <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                        <span className="text-xl font-black">₹{med.price}</span>
                        <button 
                          onClick={() => addToCart(med)}
                          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-[#10847e] transition-colors"
                        >
                          ADD +
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- 4. ABOUT SECTION --- */}
      <section id="about" className="bg-white py-24 px-6 border-y border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-800 mb-8">Why Nexus Pharma?</h2>
          <div className="grid md:grid-cols-3 gap-12 text-left mt-16">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><ShieldCheck /></div>
              <h3 className="font-bold text-lg text-slate-800">100% Authentic</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Direct sourcing from WHO-GMP certified laboratories ensures every dose is genuine.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center"><Pill /></div>
              <h3 className="font-bold text-lg text-slate-800">Cold Chain Export</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Specialized logistics for temperature-sensitive oncology and cardiology formulations.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center"><ArrowRight /></div>
              <h3 className="font-bold text-lg text-slate-800">Global Reach</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Delivering critical healthcare formulations to over 40 countries within 72 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. CONTACT SECTION --- */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6">Need a bulk <br /> formulation quote?</h2>
            <p className="text-slate-400 mb-12">Our pharmacists and export specialists are available 24/7 for consultation.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <Mail className="text-[#10847e]" /> support@nexuspharma.com
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <Phone className="text-[#10847e]" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <MapPin className="text-[#10847e]" /> Mumbai, India
              </div>
            </div>
          </div>
          <form className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#10847e]" />
            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#10847e]" />
            <textarea placeholder="Your Message" rows="4" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#10847e]"></textarea>
            <button className="w-full bg-[#10847e] py-4 rounded-2xl font-black uppercase tracking-widest">Send Inquiry</button>
          </form>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer className="bg-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 font-black text-xl tracking-tighter grayscale">
            <Pill size={24} /> NEXUS PHARMA
          </div>
          <div className="text-slate-400 text-xs font-medium">
            © 2026 Nexus Pharma Solutions. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-500">
             <a href="#" className="hover:text-[#10847e]">Privacy</a>
             <a href="#" className="hover:text-[#10847e]">Terms</a>
             <a href="#" className="hover:text-[#10847e]">License</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;