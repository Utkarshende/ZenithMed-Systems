import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Package, 
  Users, 
  Plus, 
  Trash2, 
  ExternalLink, 
  LayoutDashboard, 
  LogOut,
  Search
} from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data.products || data);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchProducts(); // Refresh list
      } catch (err) {
        alert("Delete failed. Check server connection.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* --- Sidebar Navigation --- */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col p-6 fixed h-full">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white"><Package size={20} /></div>
          <span className="text-xl font-black tracking-tight uppercase">Nexus Admin</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 bg-blue-600 p-3 rounded-xl font-bold">
            <LayoutDashboard size={20} /> Overview
          </button>
          <button className="w-full flex items-center gap-3 text-slate-400 p-3 hover:text-white transition-colors">
            <Users size={20} /> Inquiries
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 p-3 hover:bg-red-500/10 rounded-xl transition-all font-bold">
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 lg:ml-64 p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Inventory Control</h1>
            <p className="text-slate-500 font-medium">Manage your global pharmaceutical listings.</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add New Medicine
          </button>
        </header>

        {/* --- Quick Stats --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Total Products</p>
            <h3 className="text-4xl font-black text-slate-900 mt-1">{products.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Categories</p>
            <h3 className="text-4xl font-black text-blue-600 mt-1">4</h3>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Server Status</p>
            <h3 className="text-sm font-bold text-green-500 flex items-center gap-2 mt-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Systems Operational
            </h3>
          </div>
        </div>

        {/* --- Product Table --- */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h4 className="font-bold text-slate-900">Active Listings</h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                className="bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Medicine Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Salt Composition</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">{product.composition}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><ExternalLink size={18}/></button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- Modals --- */}
      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)} 
          onProductAdded={fetchProducts} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;