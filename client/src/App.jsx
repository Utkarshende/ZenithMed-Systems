import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Beaker, ShoppingCart, ArrowRight, X, MapPin, Phone, Mail, 
  Search, Lock, Globe, ChevronDown, Activity, ShieldCheck
} from 'lucide-react';

// --- ANIMATION VARIANTS (FABLE STYLE) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#F9F8F6] text-[#1A1A1A] selection:bg-blue-600 selection:text-white overflow-x-hidden">
        <Toaster position="bottom-right" />
        
        {/* --- MINIMALIST NAV --- */}
        <nav className="fixed top-0 w-full z-[100] mix-blend-difference px-8 py-6 flex justify-between items-center text-white">
          <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            NEXUS<span className="font-light">LABS.</span>
          </Link>
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
            <Link to="/" className="hover:opacity-50 transition-opacity">Philosophy</Link>
            <Link to="/products" className="hover:opacity-50 transition-opacity">Formulations</Link>
            <Link to="/about" className="hover:opacity-50 transition-opacity">Archive</Link>
            <Link to="/contact" className="hover:opacity-50 transition-opacity">Connect</Link>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="text-[10px] font-bold uppercase tracking-widest border-b border-white pb-1">
            Secure Bag ({cart.length})
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home addToCart={(p) => setCart([...cart, p])} />} />
          <Route path="/products" element={<ProductsPage addToCart={(p) => setCart([...cart, p])} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

// --- HERO SECTION (CINEMATIC) ---
const Home = ({ addToCart }) => {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <main>
      <section className="relative h-screen w-full flex items-center justify-center bg-[#0F1113] overflow-hidden">
        <motion.div 
          style={{ y: yRange }}
          className="absolute inset-0 opacity-40 grayscale"
        >
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-chemical-reaction-in-a-liquid-under-a-microscope-42220-large.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.span 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="text-[10px] tracking-[0.8em] uppercase mb-6 block font-light opacity-60"
          >
            Advancing Human Longevity
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] mb-12"
          >
            PRECISION<br/><span className="italic font-light">ETHICS.</span>
          </h1 >
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.5 }}>
            <Link to="/products" className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold border border-white/20 px-10 py-5 rounded-full hover:bg-white hover:text-black transition-all">
              View Formulations <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURED SECTION (FABLE GRID) --- */}
      <section className="py-40 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="md:col-span-5"
          >
            <h2 className="text-5xl font-bold tracking-tighter mb-8 leading-tight">Molecular Integrity at Scale.</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">We operate at the intersection of rigorous science and agile logistics, ensuring life-saving oncology and cardiovascular treatments reach their destination with zero cold-chain compromise.</p>
            <Link to="/about" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1">Our Methodology</Link>
          </motion.div>
          <div className="md:col-span-7">
             <motion.div 
               whileHover={{ scale: 0.98 }}
               className="aspect-[4/5] bg-slate-200 overflow-hidden rounded-2xl"
             >
               <img src="https://images.unsplash.com/photo-1579154235602-3c2c299e8da3?q=80&w=2070" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Lab" />
             </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

// --- PRODUCTS PAGE (MODERN CATALOG) ---
const ProductsPage = ({ addToCart }) => {
  const meds = [
    { id: 1, name: 'Sorafenib-X', cat: 'Oncology', desc: 'Next-gen kinase inhibitor targeting multi-pathway tumor growth.' },
    { id: 2, name: 'Atorva-Prime', cat: 'Cardiology', desc: 'Synthetic HMG-CoA reductase inhibitor with enhanced bioavailability.' },
    { id: 3, name: 'Enox-Flow', cat: 'Hematology', desc: 'Precision low-molecular-weight heparin for clinical stability.' }
  ];

  return (
    <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
      <motion.h2 initial="hidden" animate="visible" variants={fadeInUp} className="text-7xl font-bold tracking-tighter mb-20">The Catalog.</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-slate-200 border border-slate-200">
        {meds.map((m) => (
          <motion.div 
            key={m.id}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="bg-[#F9F8F6] p-12 hover:bg-white transition-colors group cursor-pointer"
          >
            <span className="text-[9px] font-bold uppercase tracking-widest text-blue-600 mb-4 block">{m.cat}</span>
            <h3 className="text-3xl font-bold tracking-tighter mb-6">{m.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-10">{m.desc}</p>
            <button onClick={() => { addToCart(m); toast.success("Added to secure bag"); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase border-b border-black">Request Access</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- CONTACT PAGE (ENGAGING) ---
const ContactPage = () => (
  <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <h2 className="text-8xl font-bold tracking-tighter mb-10">Let's<br/>Talk.</h2>
        <p className="text-xl text-slate-500 max-w-md">For wholesale inquiries, clinical partnerships, or logistics verification, our team is available 24/7.</p>
      </motion.div>
      <motion.form initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 }} className="space-y-12">
        <div className="border-b border-slate-300 pb-4">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Your Name</label>
          <input type="text" className="w-full bg-transparent outline-none text-2xl py-2 font-light" placeholder="Dr. Julian Thorne" />
        </div>
        <div className="border-b border-slate-300 pb-4">
          <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Institution</label>
          <input type="text" className="w-full bg-transparent outline-none text-2xl py-2 font-light" placeholder="Global Health Corp" />
        </div>
        <button className="bg-black text-white px-12 py-6 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors">Submit Inquiry</button>
      </motion.form>
    </div>
  </div>
);

// --- FOOTER (TRUST & INFO) ---
const Footer = () => (
  <footer className="bg-white pt-40 pb-10 px-8 border-t border-slate-100">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
      <div className="col-span-1">
        <h3 className="text-xl font-bold tracking-tighter mb-6">NEXUSLABS.</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase leading-loose tracking-widest">Global Pharma HQ<br/>Reg No: 00921-22-B<br/>GMP Certified Facility</p>
      </div>
      <div className="col-span-1 space-y-4">
        <h4 className="text-[10px] uppercase font-bold tracking-[0.2em]">Contact</h4>
        <p className="text-sm font-medium underline">enquiries@nexuslabs.pharma</p>
        <p className="text-sm font-medium">+44 (0) 20 7946 0123</p>
      </div>
      <div className="col-span-2 bg-slate-50 p-10 rounded-3xl flex items-center gap-6 border border-slate-100">
        <ShieldCheck size={40} className="text-blue-600" />
        <div>
          <h4 className="text-xs font-bold uppercase mb-2">Secure Institutional Access</h4>
          <p className="text-xs text-slate-500 leading-relaxed">All data transmitted through this portal is encrypted using enterprise-grade AES-256 protocols. Your medical distribution data is safe.</p>
        </div>
      </div>
    </div>
    <div className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em] border-t pt-10">
      © 2026 NEXUS PHARMA GROUP • BUILT FOR PRECISION
    </div>
  </footer>
);

// --- HELPERS ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export default App;