import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, Package, Users, MessageSquare } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to remove this medicine?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-xl font-black mb-10 italic">NEXUS<span className="text-blue-400">ADMIN</span></h2>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-blue-400 bg-blue-500/10 p-3 rounded-lg"><Package size={20}/> Products</div>
          <div className="flex items-center gap-3 text-slate-400 p-3"><MessageSquare size={20}/> Inquiries</div>
          <div className="flex items-center gap-3 text-slate-400 p-3"><Users size={20}/> Settings</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Product Inventory</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Plus size={20}/> Add New Medicine
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-600">Medicine Name</th>
                <th className="p-4 font-semibold text-slate-600">Category</th>
                <th className="p-4 font-semibold text-slate-600">Composition</th>
                <th className="p-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{product.name}</td>
                  <td className="p-4 text-slate-600"><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">{product.category}</span></td>
                  <td className="p-4 text-slate-500 text-sm">{product.composition}</td>
                  <td className="p-4 flex gap-4">
                    <button className="text-slate-400 hover:text-blue-600"><Edit size={18}/></button>
                    <button onClick={() => deleteProduct(product._id)} className="text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && <AddProductModal onClose={() => {setIsModalOpen(false); fetchProducts();}} />}
    </div>
  );
};

export default AdminDashboard;