import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Package, Mail, TrendingUp, X } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', composition: '', category: 'General', packaging: '', image: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const prodRes = await axios.get(`${API_URL}/api/products`);
      // Using the same safe array logic
      setProducts(Array.isArray(prodRes.data) ? prodRes.data : (prodRes.data.products || []));
      
      // Fetch inquiries if you have an inquiry endpoint
      const inqRes = await axios.get(`${API_URL}/api/inquiries`);
      setInquiries(inqRes.data);
    } catch (err) {
      console.error("Dashboard sync error", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/products`, newProduct);
      toast.success("Medicine Added to Vault");
      setShowAddModal(false);
      fetchData();
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Permanent removal?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        toast.success("Deleted");
        fetchData();
      } catch (err) { toast.error("Delete failed"); }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-10 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
            <Package className="text-blue-500 mb-4" />
            <h3 className="text-4xl font-black">{products.length}</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Live Formulations</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
            <Mail className="text-emerald-500 mb-4" />
            <h3 className="text-4xl font-black">{inquiries.length}</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Active Inquiries</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-500 transition-all p-8 rounded-[2rem] flex flex-col items-center justify-center group"
          >
            <Plus size={40} className="group-hover:rotate-90 transition-transform" />
            <span className="font-black uppercase text-[10px] tracking-[0.3em] mt-4">Add New Medicine</span>
          </button>
        </div>

        {/* PRODUCT LIST */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-white/40 text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-8">Medicine</th>
                <th className="p-8">Category</th>
                <th className="p-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 font-bold">{p.name}</td>
                  <td className="p-8 text-white/40 uppercase text-xs">{p.category}</td>
                  <td className="p-8 text-right">
                    <button onClick={() => deleteProduct(p._id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter">New Formulation</h2>
              <X className="cursor-pointer" onClick={() => setShowAddModal(false)} />
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input type="text" placeholder="Brand Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500" onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
              <input type="text" placeholder="Salt Composition" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500" onChange={e => setNewProduct({...newProduct, composition: e.target.value})} required />
              <select className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none text-white/40" onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                <option value="Oncology">Oncology</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="General">General</option>
              </select>
              <input type="text" placeholder="Image URL" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500" onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
              <button type="submit" className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-widest mt-6">Publish to Vault</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;