import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Beaker, ShoppingCart, Trash2, X, MapPin, Phone, Mail, 
  Star, Plus, Send, Zap, ShieldCheck, Info, CreditCard, Bitcoin, Truck, CheckCircle
} from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMedInfo, setSelectedMedInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Review Logic State
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

  // --- WORKING REVIEW HANDLER ---
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return toast.error("Please fill all fields");

    const submittedReview = {
      id: Date.now(),
      name: newReview.name,
      role: newReview.role || "Verified Buyer",
      text: newReview.text,
      rating: 5,
      verified: false // New reviews show as pending
    };

    setReviews([submittedReview, ...reviews]);
    setNewReview({ name: '', role: '', text: '' }); // Reset form
    setShowReviewForm(false);
    toast.success("Review submitted for clinical verification!");
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      return [...prev, {...product, qty: 1}];
    });
    toast.success(`${product.name} added!`, { icon: '💊' });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <Router>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-white text-slate-900">
        
        {/* NAV */}
        <nav className="fixed top-0 w-full z-[100] px-10 py-5 flex justify-between items-center bg-white/90 backdrop-blur-md border-b">
          <Link to="/" className="text-2xl font-black flex items-center gap-2 text-blue-900 uppercase italic">NEXUS.</Link>
          <button onClick={() => setIsCartOpen(true)} className="bg-blue-600 text-white p-3 rounded-full px-6 flex items-center gap-2">
            <ShoppingCart size={16} /> <span className="font-black text-sm">{cart.length}</span>
          </button>
        </nav>

        <main className="pt-24">
          {/* VAULT SECTION */}
          <section className="py-20 px-10 bg-[#020617] text-white rounded-b-[4rem]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-16">The Vault.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] group">
                    <div onClick={() => setSelectedMedInfo(p)} className="cursor-pointer overflow-hidden rounded-2xl aspect-square mb-6 relative">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                      <div className="absolute top-4 left-4 bg-blue-600 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{p.stock}</div>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-6">{p.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black">${p.price}</span>
                      <button onClick={() => addToCart(p)} className="bg-blue-600 p-4 rounded-xl hover:bg-white hover:text-blue-900 transition-all"><Plus size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WORKING REVIEWS SECTION */}
          <section className="py-32 px-10 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-16">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Feedback</h2>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-slate-900 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                  {showReviewForm ? "Close Form" : "Add Review"}
                </button>
              </div>

              {showReviewForm && (
                <motion.form 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  onSubmit={handleReviewSubmit}
                  className="mb-20 bg-white p-10 rounded-[2.5rem] shadow-xl max-w-xl mx-auto space-y-4"
                >
                  <input required value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-bold text-xs" />
                  <input value={newReview.role} onChange={(e) => setNewReview({...newReview, role: e.target.value})} placeholder="Job Title / Hospital" className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-bold text-xs" />
                  <textarea required value={newReview.text} onChange={(e) => setNewReview({...newReview, text: e.target.value})} placeholder="Your experience..." className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-bold text-xs h-32" />
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px]">Submit Verification</button>
                </motion.form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-10 bg-white rounded-[3rem] shadow-sm border border-slate-100">
                    <div className="flex justify-between mb-6">
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                      {!rev.verified && <span className="text-[8px] font-black uppercase bg-blue-50 text-blue-600 px-2 py-1 rounded-md">Pending Verification</span>}
                    </div>
                    <p className="text-slate-600 italic font-medium mb-8">"{rev.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs">{rev.name[0]}</div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase flex items-center gap-1">{rev.name} {rev.verified && <CheckCircle size={10} className="text-emerald-500" />}</h4>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{rev.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* MEGA FOOTER */}
        <footer className="bg-white border-t pt-32 pb-10 px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-1">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">NEXUS.</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Pure Science • Global Reach</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Global HQ</h4>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><MapPin size={14} /> Mohali, Punjab, India</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Phone size={14} /> +91 172 400 0000</p>
            </div>
            <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] col-span-1 md:col-span-2">
               <ShieldCheck size={30} className="mb-4 text-blue-400" />
               <h4 className="text-xs font-black uppercase mb-2">Safe Data Guarantee</h4>
               <p className="text-[10px] text-blue-200/60 font-medium uppercase tracking-widest leading-relaxed">Your orders and clinical information are encrypted using AES-256 standards. Your information is safe with us.</p>
            </div>
          </div>
        </footer>

        {/* INFO MODAL */}
        <AnimatePresence>
          {selectedMedInfo && (
            <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-10 rounded-[3rem] max-w-md relative">
                <X className="absolute top-6 right-6 cursor-pointer" onClick={() => setSelectedMedInfo(null)} />
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6"><Zap /></div>
                <h3 className="text-2xl font-black uppercase mb-4">{selectedMedInfo.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">{selectedMedInfo.desc}</p>
                <button onClick={() => {addToCart(selectedMedInfo); setSelectedMedInfo(null);}} className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px]">Add To Cart</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;