import { motion } from 'framer-motion';
import { Tablet, FlaskConical, Stethoscope, Percent, Upload, ChevronRight } from 'lucide-react';

const Home = ({ onAddToCart }) => {
  const categories = [
    { title: "Medicines", discount: "FLAT 25% OFF", icon: <Tablet />, color: "bg-emerald-50 text-emerald-600" },
    { title: "Lab Tests", discount: "UPTO 70% OFF", icon: <FlaskConical />, color: "bg-blue-50 text-blue-600" },
    { title: "Consult", discount: "FREE FIRST CALL", icon: <Stethoscope />, color: "bg-orange-50 text-orange-600" },
    { title: "Offers", discount: "SAVE MORE", icon: <Percent />, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Hero */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-2xl font-black text-slate-800 mb-2">What are you looking for?</h1>
        <p className="text-sm text-slate-500 mb-6 font-medium">Order medicines, lab tests and healthcare products</p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {categories.map((cat, i) => (
          <motion.div whileHover={{ y: -5 }} key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm cursor-pointer group">
            <div className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              {cat.icon}
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{cat.title}</h3>
            <span className="text-[10px] font-black mt-1 text-[#f87272] block">{cat.discount}</span>
          </motion.div>
        ))}
      </div>

      {/* Prescription Banner */}
      <section className="bg-[#10847e] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between text-white mb-12">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/20 rounded-xl hidden sm:block"><Upload size={32} /></div>
          <div>
            <h2 className="text-xl font-bold">Order with Prescription</h2>
            <p className="text-white/70 text-sm">Upload and we will add the medicines for you.</p>
          </div>
        </div>
        <button className="mt-6 md:mt-0 bg-[#f87272] px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#e65c5c] transition-colors">
          UPLOAD NOW
        </button>
      </section>

      {/* Product List Placeholder */}
      <h2 className="text-lg font-black text-slate-800 mb-6">Trending Near You</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((id) => (
          <div key={id} className="bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
             <div className="aspect-square bg-slate-50 rounded-lg mb-4 flex items-center justify-center text-slate-300 font-bold">AI RENDER</div>
             <h4 className="text-xs font-bold mb-4">Neuro-Health Formulation {id}</h4>
             <div className="flex justify-between items-center mt-auto">
                <span className="font-black text-slate-800">₹{299 + id * 50}</span>
                <button onClick={() => onAddToCart({name: `Med ${id}`, price: 299})} className="text-[10px] font-black text-[#10847e] border border-[#10847e] px-3 py-1 rounded">ADD</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;