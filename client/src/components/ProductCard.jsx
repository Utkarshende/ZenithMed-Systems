import { motion } from 'framer-motion';
import { Pill, Package, Info } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="h-40 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
         {/* Placeholder for real medicine image */}
         <Pill size={48} className="text-blue-600 opacity-20" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
      <p className="text-sm text-blue-600 font-medium mb-3">{product.category}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-slate-500">
          <Info size={16} className="mr-2" /> {product.composition}
        </div>
        <div className="flex items-center text-sm text-slate-500">
          <Package size={16} className="mr-2" /> {product.packaging}
        </div>
      </div>

      <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold transition-colors">
        Get Best Price
      </button>
    </motion.div>
  );
};

export default ProductCard;