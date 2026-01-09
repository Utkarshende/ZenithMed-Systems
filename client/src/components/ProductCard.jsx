import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ med, onAddToCart }) => {
  // Fallbacks for missing data
  const name = med?.name || "Unknown Medicine";
  const price = med?.price || 0;
  const composition = med?.composition || "N/A";
  const image = med?.image || null;

  return (
    <div className="product-card bg-white p-4 rounded-xl border shadow-sm flex flex-col cursor-pointer">
      <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="object-contain w-full h-full" />
        ) : (
          <div className="text-gray-400 text-xs">No Image</div>
        )}
      </div>

      <h4 className="font-bold text-sm text-gray-800 line-clamp-2 mb-1">{name}</h4>
      <p className="text-[10px] text-gray-500 font-semibold mb-2">{composition}</p>

      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="font-bold text-gray-900">₹{price}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(med);
          }}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 text-xs font-bold"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
