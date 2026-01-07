import { useState } from 'react';
import axios from 'axios';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

const PriceModal = ({ product, onClose }) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: `I am interested in ${product.name}. Please provide the best price for bulk quantity.`
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      // Sending to the inquiries endpoint
      await axios.post(`${API_URL}/api/inquiries`, {
        ...formData,
        productName: product.name
      });
      setSent(true);
      setTimeout(onClose, 3000); // Close after 3 seconds
    } catch (err) {
      alert("System busy. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        
        {sent ? (
          <div className="text-center py-10 animate-in zoom-in duration-300">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Inquiry Sent!</h2>
            <p className="text-slate-500 mt-2 font-medium">Our export team will contact you shortly.</p>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute right-8 top-8 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={24} />
            </button>

            <div className="mb-8">
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                Price Quotation
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-4 leading-tight">
                Request Quote for <span className="text-blue-600">{product.name}</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                required 
                placeholder="Your Full Name" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                required 
                type="email" 
                placeholder="Business Email" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <textarea 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <Send size={18}/></>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PriceModal;