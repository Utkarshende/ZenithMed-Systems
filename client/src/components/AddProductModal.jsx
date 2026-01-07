import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { X, Save, Database, Image as ImageIcon, Pill } from 'lucide-react';

const AddProductModal = ({ onClose, onProductAdded }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Oncology', // Default category
    composition: '',
    packaging: '',
    image: ''
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
      console.error("Save failed:", err);
      alert("Error saving medicine. Ensure your server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
      >
        {/* --- Header --- */}
        <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 hover:text-red-500 transition-colors">
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Add Formulation</h2>
            <p className="text-slate-400 text-sm font-medium italic">Update the global catalog</p>
          </div>
        </div>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Medicine Name */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
            <input 
              required 
              placeholder="e.g. Nexium 40mg" 
              className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
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

            {/* Packaging */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Packaging</label>
              <input 
                placeholder="e.g. 10x10 Tablets" 
                className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setFormData({...formData, packaging: e.target.value})} 
              />
            </div>
          </div>

          {/* Image URL Field */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image Link (Unsplash/Web)</label>
            <div className="relative mt-1.5">
               <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 placeholder="Paste product image URL..." 
                 className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                 onChange={e => setFormData({...formData, image: e.target.value})} 
               />
            </div>
          </div>

          {/* Salt Composition */}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Salt Composition</label>
            <textarea 
              required 
              placeholder="e.g. Esomeprazole Magnesium" 
              className="w-full mt-1.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] leading-relaxed"
              onChange={e => setFormData({...formData, composition: e.target.value})}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
          >
             {loading ? 'Processing...' : (
               <>Publish Formulation <Save size={20}/></>
             )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductModal;