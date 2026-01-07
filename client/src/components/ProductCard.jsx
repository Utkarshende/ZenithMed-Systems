import { useState } from 'react';
import { Pill, ArrowUpRight } from 'lucide-react';
import PriceModal from './PriceModal'; // Import the new modal

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
              <Pill size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-4">
            {product.packaging || 'Standard Pack'}
          </p>
          
          <div className="bg-slate-50 p-4 rounded-2xl mb-6">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Composition</p>
            <p className="text-sm font-bold text-slate-600 line-clamp-2 leading-relaxed">
              {product.composition}
            </p>
          </div>
        </div>

        <button 
          onClick={() => setShowModal(true)} // Open modal on click
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg"
        >
          Get Best Price <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Render Modal conditionally */}
      {showModal && <PriceModal product={product} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default ProductCard;