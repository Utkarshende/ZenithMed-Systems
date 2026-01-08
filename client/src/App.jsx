import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Beaker, ShoppingCart, Trash2, X, MapPin, Phone, Mail, 
  Star, Plus, Send, Zap, ShieldCheck, Info, Search, 
  Lock, Globe, Menu, ChevronDown, Clock, Award, Activity
} from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // --- MEGA MEDICINE DATABASE ---
  const medicineDatabase = [
    { id: 1, name: 'Sorafenib 200mg', cat: 'Oncology', price: 450, stock: 12, work: 'Inhibits tumor growth by blocking enzyme signals.' },
    { id: 2, name: 'Gefitinib 250mg', cat: 'Oncology', price: 380, stock: 5, work: 'Targets EGFR mutations in lung cancer cells.' },
    { id: 3, name: 'Atorvastatin 10mg', cat: 'Cardiology', price: 120, stock: 45, work: 'Inhibits HMG-CoA reductase to lower bad cholesterol.' },
    { id: 4, name: 'Ramipril 5mg', cat: 'Cardiology', price: 95, stock: 30, work: 'ACE inhibitor to manage hypertension.' },
    { id: 5, name: 'Amoxicillin 500mg', cat: 'Antibiotics', price: 85, stock: 100, work: 'Penicillin-type antibiotic for bacterial infections.' },
    { id: 6, name: 'Azithromycin 250mg', cat: 'Antibiotics', price: 65, stock: 80, work: 'Macrolide antibiotic for respiratory tract infections.' },
    { id: 7, name: 'Paracetamol 650mg', cat: 'General', price: 15, stock: 500, work: 'Analgesic and antipyretic for pain and fever.' },
    { id: 8, name: 'Cetirizine 10mg', cat: 'General', price: 25, stock: 200, work: 'Second-generation antihistamine for allergies.' },
    { id: 9, name: 'Omeprazole 20mg', cat: 'General', price: 45, stock: 150, work: 'Proton pump inhibitor for acid reflux.' },
  ];

  const categories = ["All", "Oncology", "Cardiology", "Antibiotics", "General"];

  const filteredMeds = medicineDatabase.filter(m => 
    (activeCategory === "All" || m.cat === activeCategory) &&
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (p) => {
    setCart([...cart, { ...p, qty: 1 }]);
    toast.success(`${p.name} secured in cart`, {
      style: { borderRadius: '10px', background: '#0F172A', color: '#fff' }
    });
  };

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white">
        
        {/* --- PROFESSIONAL NAVBAR --- */}
        <nav className="fixed top-0 w-full z-[100] bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-2xl font-black tracking-tighter text-blue-900 flex items-center gap-2">
              <Beaker className="text-blue-600" /> NEXUS.
            </Link>
            
            <div className="hidden lg:flex gap-8 items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              
              {/* CATEGORY DROPDOWN */}
              <div className="relative group cursor-pointer py-2">
                <span className="flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                  Pharmacopoeia <ChevronDown size={12} />
                </span>
                <div className="absolute top-full left-0 w-48 bg-white border shadow-2xl rounded-2xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className="w-full text-left px-6 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Link to="/about" className="hover:text-blue-600">Our Ethics</Link>
              <Link to="/contact" className="hover:text-blue-600">Global Support</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input 
                type="text" 
                placeholder="Search formulations..." 
                className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-[10px] font-bold w-40 md:w-60 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => setIsCartOpen(true)} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-[10px] font-black flex items-center gap-2">
              <ShoppingCart size={14} /> {cart.length}
            </button>
          </div>
        </nav>

        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home filteredMeds={filteredMeds} addToCart={addToCart} setSelectedMed={setSelectedMed} activeCategory={activeCategory} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* --- HIGH-TRUST MEGA FOOTER --- */}
        <footer className="bg-slate-900 text-white pt-24 pb-12 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-black mb-6 italic">NEXUS.</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-loose">
                Registered Medical Distributor License: #ND-99201-B<br/>
                WHO-GMP Certified Facilities.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Global Logistics</h4>
              <p className="flex items-center gap-3 text-xs font-bold text-slate-300"><MapPin size={14} /> Mohali, Punjab, India</p>
              <p className="flex items-center gap-3 text-xs font-bold text-slate-300"><Phone size={14} /> +91 172 400 0000</p>
              <p className="flex items-center gap-3 text-xs font-bold text-slate-300"><Mail size={14} /> logistics@nexus.com</p>
            </div>
            <div className="col-span-1 md:col-span-2 bg-white/5 p-10 rounded-[3rem] border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center"><Lock className="text-white" /></div>
                <div>
                  <h4 className="text-xs font-black uppercase">Clinically Encrypted</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">AES-256 Bit Data Protection</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Nexus Pharma guarantees that your clinical purchase data is handled with bank-grade security protocols. We are compliant with international pharmaceutical data privacy standards.
              </p>
            </div>
          </div>
          <div className="text-center pt-10 border-t border-white/5 text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
            © 2026 NEXUS PHARMA PVT LTD • ALL RIGHTS RESERVED
          </div>
        </footer>

        {/* --- QUICK VIEW MODAL --- */}
        <AnimatePresence>
          {selectedMed && (
            <div className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-12 rounded-[3.5rem] max-w-md w-full relative">
                <button onClick={() => setSelectedMed(null)} className="absolute top-8 right-8 text-slate-300 hover:text-black"><X /></button>
                <h3 className="text-3xl font-black uppercase mb-2">{selectedMed.name}</h3>
                <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-8">{selectedMed.cat}</p>
                <div className="space-y-6 mb-10">
                  <div className="bg-slate-50 p-6 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Molecular Action</p>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed">{selectedMed.work}</p>
                  </div>
                </div>
                <button onClick={() => {addToCart(selectedMed); setSelectedMed(null);}} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px]">Confirm Add to Cart</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

// --- HOME PAGE ---
const Home = ({ filteredMeds, addToCart, setSelectedMed, activeCategory }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <section className="h-[70vh] bg-slate-900 flex items-center justify-center relative overflow-hidden">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-research-and-analysis-40502-large.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8">
          NEXUS<br/><span className="text-blue-500 italic font-thin">PHARMA.</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Global Supply Chain Excellence</p>
      </div>
    </section>

    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter">Inventory.</h2>
          <p className="text-[10px] font-black text-blue-600 uppercase mt-2">Showing: {activeCategory}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredMeds.map(m => (
          <div key={m.id} className="p-10 bg-slate-50 rounded-[3rem] border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all group">
            <div onClick={() => setSelectedMed(m)} className="cursor-pointer aspect-square bg-slate-200 rounded-3xl mb-8 flex items-center justify-center">
              <Activity className="text-slate-400 group-hover:text-blue-600 transition-colors" size={40} />
            </div>
            <h4 className="text-xl font-black uppercase mb-2">{m.name}</h4>
            <div className="flex justify-between items-center mt-8">
              <span className="text-2xl font-black text-slate-900">${m.price}</span>
              <button onClick={() => addToCart(m)} className="bg-blue-600 text-white p-4 rounded-2xl"><Plus size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

// --- ENHANCED ABOUT PAGE ---
const About = () => (
  <div className="py-24 px-8 max-w-5xl mx-auto">
    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">Our Integrity</span>
    <h1 className="text-7xl font-black uppercase tracking-tighter mb-12">The Nexus<br/>Standard.</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
      <p className="text-slate-500 font-medium leading-loose">
        Established in 2012, Nexus Pharma has bridged the gap between advanced clinical formulations and global patient access. Our logistics network is built on the foundation of WHO-GMP standards, ensuring that every batch of medicine—whether oncology or general—is handled with absolute temperature precision.
      </p>
      <div className="space-y-8">
        <div className="flex gap-6 items-start">
          <Award className="text-blue-600" />
          <div>
            <h4 className="text-xs font-black uppercase mb-1">WHO-GMP Certified</h4>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">Global safety compliance registered.</p>
          </div>
        </div>
        <div className="flex gap-6 items-start">
          <Globe className="text-blue-600" />
          <div>
            <h4 className="text-xs font-black uppercase mb-1">50+ Country Reach</h4>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">Active supply lines across MENA and EU.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- ENGAGING CONTACT PAGE ---
const Contact = () => (
  <div className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
    <div>
      <h1 className="text-7xl font-black uppercase tracking-tighter mb-12">Get in<br/>Touch.</h1>
      <div className="space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><Clock /></div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest">Global Support Hours</h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Mon - Sat: 09:00 - 20:00 IST</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><Mail /></div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest">Logistics & Orders</h4>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">support@nexuspharma.com</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-slate-50 p-12 rounded-[4rem]">
      <h3 className="text-xl font-black uppercase mb-8">Submit Support Ticket</h3>
      <form className="space-y-4">
        <input placeholder="Full Name" className="w-full p-5 bg-white rounded-2xl outline-none text-xs font-bold" />
        <input placeholder="Email Address" className="w-full p-5 bg-white rounded-2xl outline-none text-xs font-bold" />
        <textarea placeholder="How can our clinical team help you?" className="w-full p-5 bg-white rounded-2xl outline-none text-xs font-bold h-40" />
        <button className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Send Secure Message</button>
      </form>
    </div>
  </div>
);

export default App;