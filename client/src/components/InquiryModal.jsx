import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, Send } from 'lucide-react';

const InquiryModal = ({ isOpen, onClose, productName }) => {
  // 1. State Management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // 2. Form Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Use the Environment Variable for the API URL
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      await axios.post(`${API_URL}/api/inquiry`, {
        ...formData,
        product: productName
      });

      setStatus('success');
      
      // Close modal automatically after 2 seconds on success
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2500);

    } catch (err) {
      console.error("Inquiry Error:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100px] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <AnimatePresence>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X size={24} />
          </button>

          {status === 'success' ? (
            /* --- Success View --- */
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-10 space-y-4"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Inquiry Sent!</h2>
              <p className="text-slate-500">Our team will contact you with the best price shortly.</p>
            </motion.div>
          ) : (
            /* --- Form View --- */
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Get Best Price</h2>
                <p className="text-blue-600 font-semibold mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                  {productName}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@company.com"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Requirement Details</label>
                  <textarea 
                    placeholder="Mention quantity or specific requirements..." 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    rows="3"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium text-center">Something went wrong. Please try again.</p>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-100 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InquiryModal;