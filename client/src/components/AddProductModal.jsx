import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, Loader2, ClipboardList, Database } from 'lucide-react';

const AddProductModal = ({ onClose, onProductAdded }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Oncology', // Default selection
    composition: '',
    packaging: '',
    dosageForm: 'Tablet'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/products`, formData);
      onProductAdded(); 
      onClose(); 
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 hover:text-red-500 transition-colors">
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">New Inventory Entry</h2>
            <p className="text-slate-400 text-sm font-medium">Add a medicine to the public catalog.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Medicine Name</label>
              <input 
                required 
                placeholder="e.g. Nexium 40mg"
                className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Oncology">Oncology</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Nephrology">Nephrology</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Packaging</label>
              <input 
                placeholder="10x10 Tablets" 
                className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setFormData({...formData, packaging: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Salt Composition</label>
            <textarea 
              required 
              placeholder="e.g. Esomeprazole Magnesium"
              className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              onChange={e => setFormData({...formData, composition: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Save to Inventory <ClipboardList size={20}/></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductModal; 