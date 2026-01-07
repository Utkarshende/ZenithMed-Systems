import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const InquiryModal = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Get Best Price</h2>
        <p className="text-blue-600 font-medium mb-6">Inquiring for: {productName}</p>

        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500" required />
          <input type="email" placeholder="Email Address" className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500" required />
          <textarea placeholder="Your Message" rows="3" className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500"></textarea>
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Send Inquiry
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default InquiryModal;