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
  Mail,
  Edit3,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
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

  // --- USEFUL SEARCH LOGIC ---
  // This filters the list dynamically as you type
  const filteredInventory = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.composition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this medicine permanently?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchData(); // Refresh the list
      } catch (err) {
        alert("Action failed. Check server.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col p-8 fixed h-full shadow-2xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <Package size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Nexus<span className="text-blue-500">HQ</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-blue-600 shadow-xl shadow-blue-600/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Inventory
          </button>
          
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'inquiries' ? 'bg-blue-600 shadow-xl shadow-blue-600/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare size={20} /> Inquiries
            {inquiries.length > 0 && (
                <span className="ml-auto bg-red-500 text-[10px] px-2 py-0.5 rounded-full ring-2 ring-slate-900">
                    {inquiries.length}
                </span>
            )}
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-slate-500 p-4 hover:text-red-400 transition-all font-bold mt-auto border-t border-white/10 pt-8">
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight capitalize">
              {activeTab} Management
            </h1>
            <p className="text-slate-500 font-medium mt-1 italic">Logged in as Administrator</p>
          </div>
          
          {activeTab === 'inventory' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-2xl transition-all active:scale-95"
            >
              <Plus size={22} /> Add New Entry
            </button>
          )}
        </header>

        {/* --- VIEW TOGGLE --- */}
        {activeTab === 'inventory' ? (
          <div className="space-y-6">
            {/* SEARCH BAR SECTION */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name, category, or salt composition..." 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-14 pr-4 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium text-slate-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="px-6 py-4 bg-blue-50 text-blue-700 rounded-2xl font-bold text-sm border border-blue-100">
                    {filteredInventory.length} Results
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <th className="px-10 py-6">Medicine & Composition</th>
                      <th className="px-10 py-6">Category</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredInventory.length > 0 ? (
                      filteredInventory.map((product) => (
                        <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-10 py-6">
                            <div className="font-black text-slate-900 text-lg leading-tight">{product.name}</div>
                            <div className="text-slate-400 text-xs font-bold mt-1 max-w-md truncate uppercase tracking-tighter">{product.composition}</div>
                          </td>
                          <td className="px-10 py-6">
                            <span className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase shadow-sm">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit Product">
                                <Edit3 size={18}/>
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product._id)}
                                className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                title="Delete Product"
                              >
                                <Trash2 size={18}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="py-24 text-center">
                            <AlertCircle className="mx-auto text-slate-300 mb-2" size={40} />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching medicines found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* --- INQUIRIES VIEW --- */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inquiries.map((iq) => (
              <div key={iq._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                   <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                       <Mail size={22}/>
                   </div>
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                       {new Date(iq.createdAt).toLocaleDateString()}
                   </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">{iq.name}</h3>
                <p className="text-blue-600 font-bold mb-6 text-sm underline">{iq.email}</p>
                <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl text-sm leading-relaxed border-l-8 border-blue-600">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">Regarding: {iq.productName}</p>
                    "{iq.message}"
                </div>
              </div>
            ))}
          </div>
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