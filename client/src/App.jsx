import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Beaker, ShoppingCart, Trash2, X, MapPin, Phone, Mail, 
  Star, Plus, Send, Zap, ShieldCheck, Info, Search, 
  ChevronRight, Lock, Globe, Menu, PlayCircle
} from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);

  // --- COMPREHENSIVE MEDICINE LIST ---
  const medicineDatabase = [
    { id: 1, name: 'Sorafenib 200mg', cat: 'Oncology', price: 450, stock: 12, desc: 'Targeted therapy for liver and kidney cancer cells.', work: 'Inhibits intracellular and cell surface kinases.' },
    { id: 2, name: 'Atorvastatin 10mg', cat: 'Cardiology', price: 120, stock: 45, desc: 'Used to lower cholesterol and prevent heart disease.', work: 'Reduces LDL by inhibiting HMG-CoA reductase.' },
    { id: 3, name: 'Amoxicillin 500mg', cat: 'Antibiotics', price: 85, stock: 100, desc: 'Standard treatment for bacterial infections.', work: 'Inhibits bacterial cell wall synthesis.' },
    { id: 4, name: 'Enoxaparin 60mg', cat: 'Cardiology', price: 210, stock: 5, desc: 'Anticoagulant used to prevent blood clots.', work: 'Binds to antithrombin III to accelerate neutralization.' },
    { id: 5, name: 'Erlotinib 150mg', cat: 'Oncology', price: 890, stock: 8, desc: 'Specialized lung cancer treatment.', work: 'Blocks epidermal growth factor receptor (EGFR).' },
    { id: 6, name: 'Azithromycin 250mg', cat: 'Antibiotics', price: 65, stock: 80, desc: 'Fast-acting antibiotic for respiratory issues.', work: 'Prevents bacteria from producing essential proteins.' }
  ];

  // Workable Search Logic
  const filteredMeds = medicineDatabase.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (p) => {
    setCart([...cart, { ...p, qty: 1 }]);
    toast.success(`${p.name} added to secure cart`);
  };

  return (
    <Router>
      <Toaster position="bottom-center" />
      <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white">
        
        {/* --- GLOBAL NAVBAR --- */}
        <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 md:px-12 py-5 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-black tracking-tighter text-blue-900 flex items-center gap-2">
              <Beaker className="text-blue-600" strokeWidth={3} /> NEXUS.
            </Link>
            <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* WORKABLE SEARCH BAR */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search Medicine..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-xs font-bold w-48 focus:w-64 transition-all focus:ring-2 focus:ring-blue-500/20"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-slate-900">
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home filteredMeds={filteredMeds} addToCart={addToCart} setSelectedMed={setSelectedMed} />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products filteredMeds={filteredMeds} addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* --- MEGA FOOTER --- */}
        <footer className="bg-[#020617] text-white pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1">
              <h2 className="text-3xl font-black mb-6 italic tracking-tighter">NEXUS.</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-loose">WHO-GMP Certified Pharma Distributor. Trusted by clinics across 50 countries.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Connect</h4>
              <p className="flex items-center gap-2 text-xs font-bold"><MapPin size={14} /> Industrial Area, Mohali, India</p>
              <p className="flex items-center gap-2 text-xs font-bold"><Phone size={14} /> +91 172 400 0000</p>
              <p className="flex items-center gap-2 text-xs font-bold"><Mail size={14} /> orders@nexuspharma.com</p>
            </div>
            <div className="col-span-1 md:col-span-2 bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20"><ShieldCheck size={100} /></div>
              <h4 className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lock size={12} /> Highly Secure Transaction Environment
              </h4>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-[0.2em] leading-relaxed">We use 256-bit SSL encryption to ensure that your medical history and payment information remain safe with us.</p>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
            © 2026 NEXUS PHARMA PVT LTD • GOVERNMENT REGISTERED
          </div>
        </footer>

        {/* --- PRODUCT QUICK VIEW MODAL --- */}
        <AnimatePresence>
          {selectedMed && (
            <div className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-10 rounded-[3rem] max-w-md w-full relative">
                <button onClick={() => setSelectedMed(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900"><X /></button>
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Info /></div>
                <h3 className="text-2xl font-black uppercase mb-2">{selectedMed.name}</h3>
                <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">{selectedMed.cat}</p>
                <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                  <p className="text-[11px] font-bold text-slate-600 uppercase mb-2">Mechanism of Action:</p>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{selectedMed.work}</p>
                </div>
                <button onClick={() => {addToCart(selectedMed); setSelectedMed(null);}} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px]">Add to Secure Order</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

// --- HOME PAGE COMPONENT ---
const Home = ({ filteredMeds, addToCart, setSelectedMed }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* CINEMATIC VIDEO HERO */}
      <section className="relative h-[90vh] bg-slate-900 flex items-center justify-center overflow-hidden">
        <video 
          id="heroVideo"
          autoPlay loop muted playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-scientists-working-in-a-lab-41372-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-white/10"></div>
        
        <div className="relative z-10 text-center text-white px-6">
          <span className="text-[10px] font-black tracking-[1em] uppercase mb-8 block text-blue-400">Pure Science Authority</span>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-12 drop-shadow-2xl">
            LIFESPAN<br/><span className="text-blue-400 italic font-thin">NEXUS.</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
            <a href="#vault" className="px-12 py-5 bg-blue-600 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all">Explore Vault</a>
            {/* FIXED PLAY BUTTON */}
            <button 
              onClick={() => {
                const v = document.getElementById('heroVideo');
                v.paused ? v.play() : v.pause();
                setIsPlaying(!isPlaying);
              }}
              className="flex items-center gap-3 font-black text-[11px] uppercase tracking-widest hover:text-blue-400"
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                <PlayCircle fill={isPlaying ? "white" : "none"} size={20} />
              </div>
              {isPlaying ? "Pause Clinical Reel" : "Watch Clinical Reel"}
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS / PRODUCT VAULT */}
      <section id="vault" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Inventory.</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b-2 border-blue-600 pb-2">Verified Pharmaceuticals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredMeds.map(m => (
              <div key={m.id} className="p-10 border border-slate-100 rounded-[3rem] bg-slate-50 group hover:bg-white hover:shadow-2xl transition-all">
                <div onClick={() => setSelectedMed(m)} className="cursor-pointer aspect-square bg-slate-200 rounded-3xl mb-8 overflow-hidden relative">
                   <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Zap className="text-blue-600" />
                   </div>
                   <div className="absolute top-4 left-4 bg-white text-[8px] font-black px-3 py-1 rounded-full uppercase">{m.stock} Units Left</div>
                </div>
                <h4 className="text-2xl font-black uppercase mb-2">{m.name}</h4>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8">{m.cat}</p>
                <div className="flex justify-between items-center border-t pt-6">
                  <span className="text-3xl font-black text-slate-900">${m.price}</span>
                  <button onClick={() => addToCart(m)} className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-200 hover:scale-105 active:scale-90 transition-all"><Plus /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// --- SIMPLE PAGE PLACEHOLDERS ---
const About = () => <div className="pt-40 px-12 text-center h-screen">
  <h1 className="text-7xl font-black uppercase tracking-tighter">About Our Ethics.</h1>
  <p className="max-w-2xl mx-auto mt-12 text-slate-500 font-medium">Nexus Pharma has been a leader in cold-chain logistics and medical distribution since 2012. Our mission is to democratize access to critical oncology and heart care medications across the globe with transparent pricing and clinical-grade security.</p>
</div>;

const Products = ({ filteredMeds, addToCart }) => <div className="pt-40 px-12 pb-20"><Home filteredMeds={filteredMeds} addToCart={addToCart} setSelectedMed={() => {}} /></div>;

const Contact = () => <div className="pt-40 px-12 h-screen max-w-2xl mx-auto text-center">
  <h1 className="text-7xl font-black uppercase tracking-tighter mb-12">Contact HQ.</h1>
  <div className="space-y-6 text-left bg-slate-50 p-12 rounded-[3rem]">
    <div className="flex gap-4 items-center font-bold uppercase text-xs tracking-widest"><Mail className="text-blue-600" /> support@nexuspharma.com</div>
    <div className="flex gap-4 items-center font-bold uppercase text-xs tracking-widest"><Phone className="text-blue-600" /> +91-172-400-0000</div>
    <div className="flex gap-4 items-center font-bold uppercase text-xs tracking-widest"><MapPin className="text-blue-600" /> Phase-7, Industrial Area, Mohali</div>
  </div>
</div>;

export default App;