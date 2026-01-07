import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Pill, Search, LogIn, LogOut, LayoutDashboard, 
  Truck, CreditCard, Wallet, MapPin, Star, Package, ArrowUpRight 
} from 'lucide-react';

// Pages & Components
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import PriceModal from './components/PriceModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'All', label: 'Full Catalog', icon: '📋' },
    { id: 'Oncology', label: 'Cancer Care', icon: '🎗️' },
    { id: 'Cardiology', label: 'Heart Health', icon: '❤️' },
    { id: 'Antibiotics', label: 'Anti-Infectives', icon: '🦠' },
    { id: 'Nephrology', label: 'Kidney Care', icon: '🧪' },
    { id: 'Gastroenterology', label: 'Digestive Health', icon: '🍏' },
    { id: 'General', label: 'General Meds', icon: '💊' }
  ];

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data.products || data);
    } catch (err) { console.error("Sync Error:", err); }
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.composition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
        {/* --- NAVIGATION --- */}
        <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-[100] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                <Pill size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase">NEXUS<span className="text-blue-600">PHARMA</span></span>
            </Link>

            <div className="flex items-center gap-4">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="text-slate-600 font-bold hover:text-blue-600 flex items-center gap-2">
                    <LayoutDashboard size={18} /> Admin Panel
                  </Link>
                  <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-red-100">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-slate-200">
                  <LogIn size={18} /> Admin Login
                </Link>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
              {/* --- HERO & SEARCH --- */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                  <h2 className="text-6xl font-black text-slate-900 mb-4 tracking-tight leading-[1.1]">
                    Premium <span className="text-blue-600">Formulations</span> For Global Export.
                  </h2>
                  <p className="text-slate-500 font-medium text-lg italic">Distributing WHO-GMP certified medicines across 50+ countries.</p>
                </div>
                
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search medicine or salt composition..."
                    className="w-full bg-white border-2 border-slate-100 py-5 pl-14 pr-6 rounded-[2rem] focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all shadow-sm font-medium"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* --- USEFUL CATEGORY EXPLORER --- */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Explore Therapeutic Areas</h3>
                  <span className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{filteredProducts.length} Products</span>
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border-2 ${activeCategory === cat.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 scale-105' : 'bg-white border-white text-slate-500 hover:border-blue-100 hover:text-blue-600 shadow-sm'}`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- PRODUCT GRID --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {filteredProducts.map(p => (
                  <div key={p._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col">
                    <div className="h-60 bg-slate-100 relative overflow-hidden">
                      <img 
                        src={p.image || 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=600'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={p.name}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-white">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{p.name}</h3>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-6">{p.packaging || 'Standard Export Pack'}</p>
                      
                      <div className="bg-slate-50 p-5 rounded-2xl mb-8 flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Salt Composition</p>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed italic">{p.composition}</p>
                      </div>

                      <button 
                        onClick={() => setSelectedProduct(p)}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
                      >
                        Request Quote <ArrowUpRight size={18}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                  <Package className="mx-auto text-slate-200 mb-4" size={64}/>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No formulations found matching your criteria</p>
                </div>
              )}
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>

        {/* --- PROFESSIONAL FOOTER --- */}
        <footer className="bg-slate-900 text-white">
          {/* DELIVERY & PAYMENT STRIP */}
          <section className="bg-blue-600 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-5 bg-white/10 p-6 rounded-[2rem] border border-white/5 backdrop-blur-md transition-all hover:bg-white/20">
                <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-lg"><Truck size={28} /></div>
                <div><h4 className="font-black text-lg">Global Logistics</h4><p className="text-blue-100 text-sm font-medium">WHO-GMP Compliant Shipping</p></div>
              </div>
              <div className="flex items-center gap-5 bg-white/10 p-6 rounded-[2rem] border border-white/5 backdrop-blur-md transition-all hover:bg-white/20">
                <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-lg"><CreditCard size={28} /></div>
                <div><h4 className="font-black text-lg">Secure Payments</h4><p className="text-blue-100 text-sm font-medium">LC, Wire Transfer & Online Pay</p></div>
              </div>
              <div className="flex items-center gap-5 bg-white/10 p-6 rounded-[2rem] border border-white/5 backdrop-blur-md transition-all hover:bg-white/20">
                <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-lg"><Wallet size={28} /></div>
                <div><h4 className="font-black text-lg">Cash on Delivery</h4><p className="text-blue-100 text-sm font-medium">Available for Domestic Orders</p></div>
              </div>
            </div>
          </section>

          {/* FOOTER LINKS & SOCIAL */}
          <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">NEXUS<span className="text-blue-500">PHARMA</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Leading the way in pharmaceutical excellence. We provide high-quality generic and branded formulations to healthcare providers worldwide.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all border border-white/5 hover:scale-110"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all border border-white/5 hover:scale-110"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-white/5 hover:scale-110"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-blue-500">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                <li><Link to="/" className="hover:text-blue-500 transition-colors">Medicine Catalog</Link></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Wholesale Inquiry</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Supply Chain</a></li>
                <li><Link to="/login" className="hover:text-blue-500 transition-colors">Admin Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-blue-500">Contact HQ</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium mb-4 flex gap-2">
                <MapPin size={20} className="text-blue-500 shrink-0" />
                Nexus Tower, Phase VII, Industrial Area,<br />Mohali, India - 160055
              </p>
              <button className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] border-b border-blue-500 pb-1">Open in Google Maps</button>
            </div>

            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
              <div className="flex text-yellow-500 mb-4 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-slate-300 text-xs italic leading-relaxed">
                "Their oncology formulations are top-tier. Highly recommended for international procurement."
              </p>
              <p className="text-slate-500 text-[10px] font-black uppercase mt-6 tracking-widest">— Global Health Alliance</p>
            </div>
          </div>

          <div className="border-t border-white/5 py-10 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
            © 2026 Nexus Pharma | Quality First | Global Standards
          </div>
        </footer>

        {/* --- MODAL INJECTION --- */}
        {selectedProduct && (
          <PriceModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </div>
    </Router>
  );
};

export default App;