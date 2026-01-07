import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { X, Loader2, CheckCircle } from 'lucide-react';

const InquiryModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/inquiry', { ...formData, product: productName });
      setStatus('success');
      setTimeout(onClose, 2000); // Close modal after 2 seconds on success
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
        {status === 'success' ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle className="mx-auto text-green-500" size={64} />
            <h2 className="text-2xl font-bold">Inquiry Sent!</h2>
            <p className="text-slate-500">The team will contact you shortly.</p>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-bold mb-1">Get Best Price</h2>
            <p className="text-blue-600 font-medium mb-6">Product: {productName}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email Address" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <textarea placeholder="How can we help?" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" rows="3" onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              <button disabled={status === 'loading'} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                {status === 'loading' ? <Loader2 className="animate-spin" /> : "Submit Inquiry"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default InquiryModal;