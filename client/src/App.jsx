import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Beaker, ShoppingCart, Trash2, X, MapPin, Phone, Mail, 
  Star, Plus, Send, Zap, ShieldCheck, Info, CreditCard, Bitcoin, Truck, CheckCircle, Play
} from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMedInfo, setSelectedMedInfo] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [newReview, setNewReview] = useState({ name: '', role: '', text: '' });
  const [reviews, setReviews] = useState([
    { id: 1, name: "Dr. Aris Thorne", role: "Hospital Director", text: "The cold-chain integrity for oncology meds is flawless.", rating: 5, verified: true },
    { id: 2, name: "Sarah Jenkins", role: "Pharma Wholesaler", text: "Nexus is our most reliable partner for bulk exports.", rating: 5, verified: true }
  ]);

  const products = [
    { id: '1', name: 'Sorafenib', category: 'Oncology', price: 450, desc: 'Blocks signals that help cancer cells multiply.', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
    { id: '2', name: 'Atorvastatin', category: 'Cardiology', price: 120, desc: 'Reduces LDL cholesterol by inhibiting liver enzymes.', stock: 'Low Stock', image: 'https://images.unsplash.com/photo-1471864190281-ad5f9f81ce4c?w=400' },
    { id: '3', name: 'Amoxicillin', category: 'Antibiotics', price: 85, desc: 'Destroys the cell walls of harmful bacteria.', stock: 'In Stock', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400' }
  ];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const submittedReview = { id: Date.now(), ...newReview, rating: userRating, verified: true };
    setReviews([submittedReview, ...reviews]);
    setShowReviewForm(false);
    toast.success("Verified review is live!");
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, qty: 1 }]);
    toast.success(`${product.name} added!`, { icon: '🛒' });
  };

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        
        {/* NAV */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-6 flex justify-between items-center bg-white/10 backdrop-blur-lg border-b border-white/10">
          <Link to="/" className="text-2xl font-black flex items-center gap-2 text-white">
            <Beaker className="text-blue-400" /> NEXUS.
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="bg-white text-black p-3 rounded-full px-6 flex items-center gap-2 font-black text-xs hover:bg-blue-400 hover:text-white transition-all">
            CART ({cart.length})
          </button>
        </nav>

        {/* --- VIDEO HERO SECTION --- */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          {/* Background Video */}
          <video 
            autoPlay loop muted playsInline 
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-60 grayscale-[0.5]"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-medical-laboratory-research-and-analysis-40502-large.mp4" type="video/mp4" />
          </video>
          
          {/* Luma Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-white"></div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="relative z-20 text-center px-10"
          >
            <span className="text-[10px] font-black tracking-[0.8em] text-blue-400 uppercase mb-6 block">GLOBAL LOGISTICS AUTHORITY</span>
            <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.8] mb-8 text-white">
              PURE<br/><span className="text-blue-400 italic font-thin">SCIENCE.</span>
            </h1>
            <div className="flex justify-center gap-4">
               <a href="#vault" className="px-10 py-5 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Enter Vault</a>
               <button className="p-5 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"><Play size={14} /></button>
            </div>
          </motion.div>
        </section>

        {/* VAULT */}
        <section id="vault" className="py-32 px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-20 text-slate-900">The Vault.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {products.map(p => (
                <motion.div whileHover={{ y: -10 }} key={p.id} className="bg-slate-50 border border-slate-100 p-10 rounded-[4rem] group">
                  <div onClick={() => setSelectedMedInfo(p)} className="cursor-pointer overflow-hidden rounded-3xl aspect-square mb-8 relative shadow-2xl">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                  </div>
                  <h4 className="text-2xl font-black uppercase mb-8">{p.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-blue-600">${p.price}</span>
                    <button onClick={() => addToCart(p)} className="bg-slate-900 text-white p-5 rounded-3xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"><Plus /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEEDBACK */}
        <section className="py-32 px-10 bg-slate-900 text-white rounded-t-[5vw]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-20">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Clinical Reviews.</h2>
              <button onClick={() => setShowReviewForm(!showReviewForm)} className="bg-blue-600 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest">Post Verified Review</button>
            </div>

            {showReviewForm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20 max-w-2xl mx-auto bg-white/5 border border-white/10 p-12 rounded-[3.5rem]">
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="flex gap-2 justify-center mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} size={20} fill={s <= userRating ? "#3B82F6" : "none"} onClick={() => setUserRating(s)} className="cursor-pointer" />)}
                  </div>
                  <input required onChange={(e) => setNewReview({...newReview, name: e.target.value})} placeholder="Your Name" className="w-full p-5 bg-white/5 rounded-2xl outline-none text-white font-bold text-xs" />
                  <textarea required onChange={(e) => setNewReview({...newReview, text: e.target.value})} placeholder="Experience..." className="w-full p-5 bg-white/5 rounded-2xl outline-none text-white font-bold text-xs h-32" />
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Submit</button>
                </form>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {reviews.map(rev => (
                <div key={rev.id} className="p-12 bg-white/5 border border-white/10 rounded-[4rem]">
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < rev.rating ? "#3B82F6" : "none"} color="#3B82F6" />)}
                  </div>
                  <p className="text-slate-400 text-xl font-medium italic mb-10 leading-relaxed">"{rev.text}"</p>
                  <h4 className="text-[12px] font-black uppercase text-white flex items-center gap-2">{rev.name} <CheckCircle size={14} className="text-blue-500" /></h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white pt-32 pb-12 px-10 border-t">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">NEXUS.</h2>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest space-y-4">
                <p className="flex items-center gap-2"><MapPin size={16} /> Phase-7, Mohali, India</p>
                <p className="flex items-center gap-2"><Phone size={16} /> +91 172 400 0000</p>
              </div>
            </div>
            <div className="col-span-2 bg-slate-900 text-white p-12 rounded-[4rem]">
              <ShieldCheck className="text-blue-400 mb-6" size={40} />
              <h4 className="text-xs font-black uppercase mb-4 tracking-widest">Safe Data Guarantee</h4>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-[0.2em] leading-loose">
                Your medical and transactional data is protected by AES-256 encryption. Your information is safe with us.
              </p>
            </div>
          </div>
        </footer>

        {/* PRODUCT INFO MODAL */}
        <AnimatePresence>
          {selectedMedInfo && (
            <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-12 rounded-[4rem] max-w-md relative">
                <X className="absolute top-8 right-8 cursor-pointer" onClick={() => setSelectedMedInfo(null)} />
                <h3 className="text-3xl font-black uppercase mb-6">{selectedMedInfo.name}</h3>
                <p className="text-slate-500 mb-8 font-medium leading-relaxed">{selectedMedInfo.desc}</p>
                <button onClick={() => {addToCart(selectedMedInfo); setSelectedMedInfo(null);}} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[11px]">Add To Cart</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;