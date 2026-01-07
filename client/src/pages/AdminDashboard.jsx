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
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// Modals
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'inquiries'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Fetch all data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, inqRes] = await Promise.all([
        axios.get(`${API_URL}/api/products`),
        axios.get(`${API_URL}/api/inquiries`)
      ]);
      setProducts(prodRes.data.products || prodRes.data);
      setInquiries(inqRes.data || []);
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Useful Search Logic (Filters by Name, Category, or Composition)
  const filteredInventory = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.composition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Action Handlers
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will remove the medicine from the public site.")) {
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
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans">
      {/* --- FIXED SIDEBAR --- */}
      <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col p-8 fixed h-full shadow-2xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <Package size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">NEXUS<span className="text-blue-500 text-sm">ADMIN</span></span>
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
              {activeTab} Panel
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage global formulations and price requests.</p>
          </div>
          
          {activeTab === 'inventory' && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-100 transition-all active:scale-95"
            >
              <Plus size={22} /> Add Medicine
            </button>
          )}
        </header>

        {activeTab === 'inventory' ? (
          <div className="space-y-6">
            {/* SEARCH BOX */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name, category, or salt composition..." 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-14 pr-4 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all font-medium text-slate-700"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="px-6 py-4 bg-blue-50 text-blue-700 rounded-2xl font-bold text-sm">
                    {filteredInventory.length} Items Found
                </div>
            </div>

            {/* INVENTORY TABLE */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <th className="px-10 py-6">Product Details</th>
                      <th className="px-10 py-6">Category</th>
                      <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredInventory.length > 0 ? (
                      filteredInventory.map((p) => (
                        <tr key={p._id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-10 py-6">
                            <div className="font-black text-slate-900 text-lg">{p.name}</div>
                            <div className="text-slate-400 text-xs font-bold mt-1 max-w-md truncate">{p.composition}</div>
                          </td>
                          <td className="px-10 py-6">
                            <span className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase">
                              {p.category}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => setEditProduct(p)}
                                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                              >
                                <Edit3 size={18}/>
                              </button>
                              <button 
                                onClick={() => handleDelete(p._id)}
                                className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
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
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching results</p>
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
            {inquiries.length > 0 ? inquiries.map((iq) => (
              <div key={iq._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-6">
                   <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-100"><Mail size={22}/></div>
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{new Date(iq.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">{iq.name}</h3>
                <p className="text-blue-600 font-bold mb-6 text-sm underline">{iq.email}</p>
                <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl text-sm leading-relaxed border-l-4 border-blue-500">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Item: {iq.productName}</p>
                    "{iq.message}"
                </div>
              </div>
            )) : (
              <div className="col-span-full py-40 text-center bg-white rounded-[2.5rem]">
                 <CheckCircle2 className="mx-auto text-green-100 mb-4" size={64} />
                 <p className="text-slate-400 font-bold uppercase tracking-widest">All caught up! No inquiries.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- MODAL INJECTION --- */}
      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} onProductAdded={fetchData} />
      )}
      
      {editProduct && (
        <EditProductModal 
          product={editProduct} 
          onClose={() => setEditProduct(null)} 
          onProductUpdated={fetchData} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;