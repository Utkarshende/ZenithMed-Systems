import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save, Loader2 } from 'lucide-react';

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ ...product });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.put(`${API_URL}/api/products/${product._id}`, formData);
      onProductUpdated(); 
      onClose();
    } catch (err) {
      alert("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
        
        <h2 className="text-2xl font-black text-slate-900 mb-6">Edit <span className="text-blue-600">Formulation</span></h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            value={formData.name}
            className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Medicine Name"
          />
          
          <select 
            className="w-full p-4 bg-slate-50 border rounded-2xl outline-none"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          >
            <option value="Oncology">Oncology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Antibiotics">Antibiotics</option>
            <option value="General">General</option>
          </select>

          <textarea 
            value={formData.composition}
            className="w-full p-4 bg-slate-50 border rounded-2xl min-h-25"
            onChange={e => setFormData({...formData, composition: e.target.value})}
            placeholder="Salt Composition"
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Update Inventory</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;