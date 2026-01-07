import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Package, 
  MessageSquare, 
  Plus, 
  Trash2, 
  LogOut, 
  Search, 
  LayoutDashboard, 
  Calendar,
  Mail,
  User,
  Clock
} from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'inquiries'
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productRes = await axios.get(`${API_URL}/api/products`);
      const inquiryRes = await axios.get(`${API_URL}/api/inquiries`);
      setProducts(productRes.data.products || productRes.data);
      setInquiries(inquiryRes.data || []);
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this medicine from the public catalog?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchData();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col p-8 fixed h-full shadow-2xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-2xl shadow-lg shadow-blue-500/20">
            <Package size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter">NEXUS<span className="text-blue-500">ADMIN</span></span>
        </div>
        
        <nav className="space-y-3 flex-1">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-blue-600 shadow-lg shadow-blue-600/20 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Inventory
          </button>
          
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'inquiries' ? 'bg-blue-600 shadow-lg shadow-blue-600/20 text-white' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <MessageSquare size={20} /> Inquiries
            {inquiries.length > 0 && (
                <span className="ml-auto bg-red-500 text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    {inquiries.length}
                </span>
            )}
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 p-4 hover:text-red-400 transition-all font-bold mt-auto border-t border-white/10 pt-8">
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {activeTab === 'inventory' ? 'Catalog Management' : 'Customer Inquiries'}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
                {activeTab === 'inventory' ? 'Add, edit or remove pharmaceutical listings.' : 'Review price requests and messages from clients.'}
            </p>
          </div>
          
          {activeTab === 'inventory' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              <Plus size={22} /> New Listing
            </button>
          )}
        </header>

        {/* --- DYNAMIC VIEW --- */}
        {activeTab === 'inventory' ? (
          <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/50">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search medicines..." 
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs font-black uppercase tracking-[0.15em] border-b border-slate-50">
                    <th className="px-8 py-5">Product Details</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-black text-slate-900 text-lg">{product.name}</div>
                        <div className="text-slate-400 text-sm font-medium mt-0.5">{product.composition}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inquiries.map((iq) => (
              <div key={iq._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl"><Mail size={24}/></div>
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <Calendar size={14}/> {new Date(iq.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-1">{iq.name}</h3>
                <p className="text-blue-600 font-bold mb-6">{iq.email}</p>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl">
                        <Package size={18} className="text-slate-400"/>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Requested For</p>
                            <p className="text-sm font-bold text-slate-700">{iq.productName}</p>
                        </div>
                    </div>
                    <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl text-sm leading-relaxed italic border-l-4 border-blue-500">
                        "{iq.message}"
                    </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)} 
          onProductAdded={fetchData} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;