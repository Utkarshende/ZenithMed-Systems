import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, Upload, Percent, FlaskConical, 
  Stethoscope, Tablet, ChevronRight, Menu, MapPin 
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const [cart, setCart] = useState([]);
  
  return (
    <Router>
      <div className="bg-[#f3f7fb] min-h-screen font-sans text-[#4f585e]">
        <Toaster />
        
        {/* --- PHARMEASY STYLE TOP NAV --- */}
        <header className="bg-white border-b sticky top-0 z-[100]">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-black text-[#10847e] tracking-tight">
                KALP<span className="text-[#f87272]">PHARMA</span>
              </Link>
              <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-400 border-l pl-6">
                <MapPin size={16} /> Select Pincode <ChevronRight size={14} />
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-10 relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search for Medicines / Healthcare Products"
                className="w-full bg-[#f3f7fb] border-none rounded-lg py-3 px-12 text-sm focus:ring-2 focus:ring-[#10847e] outline-none"
              />
              <Search className="absolute left-4 top-3 text-slate-400" size={18} />
            </div>

            <div className="flex items-center gap-6 text-sm font-bold">
              <button className="hover:text-[#10847e]">Offers</button>
              <button className="hover:text-[#10847e]">Login / Signup</button>
              <button className="relative p-2">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-[#f87272] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              </button>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home addToCart={(p) => setCart([...cart, p])} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

const Home = ({ addToCart }) => {
  const categories = [
    { title: "Order Medicines", discount: "FLAT 25% OFF", icon: <Tablet />, color: "bg-emerald-50 text-emerald-600" },
    { title: "Lab Tests", discount: "UPTO 70% OFF", icon: <FlaskConical />, color: "bg-blue-50 text-blue-600" },
    { title: "Consult Doctor", discount: "FREE FIRST CALL", icon: <Stethoscope />, color: "bg-orange-50 text-orange-600" },
    { title: "Surgeries", discount: "EXPERT CARE", icon: <Percent />, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      
      {/* --- QUICK ACTION GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {categories.map((cat, i) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={i} 
            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm cursor-pointer flex flex-col items-center text-center group"
          >
            <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              {cat.icon}
            </div>
            <h3 className="font-bold text-slate-800">{cat.title}</h3>
            <span className="text-[10px] font-black mt-2 text-[#f87272]">{cat.discount}</span>
          </motion.div>
        ))}
      </div>

      {/* --- PRESCRIPTION UPLOAD BANNER (Interactive) --- */}
      <section className="bg-[#10847e] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between text-white mb-12">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/20 rounded-xl"><Upload size={40} /></div>
          <div>
            <h2 className="text-xl font-bold">Order with Prescription</h2>
            <p className="text-white/70 text-sm">Upload a photo of your prescription and we'll do the rest.</p>
          </div>
        </div>
        <button 
          onClick={() => toast.success("Opening File Uploader...")}
          className="mt-6 md:mt-0 bg-[#f87272] px-8 py-3 rounded-lg font-bold hover:bg-[#e65c5c] transition-colors"
        >
          UPLOAD NOW
        </button>
      </section>

      {/* --- TRENDING PRODUCTS (AI GENERATED IMAGES MOCKED) --- */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Trending Near You</h2>
          <button className="text-[#10847e] text-sm font-bold">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1,2,3,4,5].map((id) => (
            <div key={id} className="bg-white p-4 rounded-xl border hover:shadow-md transition-shadow group">
              <div className="aspect-square bg-slate-100 rounded-lg mb-4 overflow-hidden">
                {/* Imagine these as AI generated clinical renders */}
                <img 
                  src={`https://api.dicebear.com/7.x/shapes/svg?seed=${id}`} 
                  alt="Medicine" 
                  className="w-full h-full object-cover p-4 opacity-80 group-hover:scale-110 transition-transform" 
                />
              </div>
              <h4 className="text-sm font-bold line-clamp-2 mb-1">Advanced Vit-C Serum Formula {id}</h4>
              <p className="text-[10px] text-slate-400 mb-4">Bottle of 30ml</p>
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-800">₹499</span>
                <button 
                  onClick={() => { addToCart({id}); toast.success("Added to cart"); }}
                  className="text-xs font-bold text-[#10847e] border border-[#10847e] px-3 py-1 rounded hover:bg-[#10847e] hover:text-white transition-colors"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const Footer = () => (
  <footer className="bg-white border-t mt-20 py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div>
        <h4 className="font-black text-slate-800 mb-6">Company</h4>
        <ul className="text-sm space-y-3 font-semibold text-slate-500">
          <li className="hover:text-[#10847e] cursor-pointer">About Us</li>
          <li className="hover:text-[#10847e] cursor-pointer">Careers</li>
          <li className="hover:text-[#10847e] cursor-pointer">Blog</li>
        </ul>
      </div>
      <div>
        <h4 className="font-black text-slate-800 mb-6">Our Services</h4>
        <ul className="text-sm space-y-3 font-semibold text-slate-500">
          <li className="hover:text-[#10847e] cursor-pointer">Order Medicine</li>
          <li className="hover:text-[#10847e] cursor-pointer">Healthcare Products</li>
          <li className="hover:text-[#10847e] cursor-pointer">Lab Tests</li>
        </ul>
      </div>
      <div className="md:col-span-2">
        <h4 className="font-black text-slate-800 mb-6">Download the App</h4>
        <div className="flex gap-4">
          <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3 cursor-pointer">
             <div className="text-xs">GET IT ON <br/><span className="text-lg font-bold">Google Play</span></div>
          </div>
          <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3 cursor-pointer">
             <div className="text-xs">Download on the <br/><span className="text-lg font-bold">App Store</span></div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default App;