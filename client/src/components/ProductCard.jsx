import { Plus } from "lucide-react";

const ProductCard = ({ product, onAdd }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-lg transition cursor-pointer">
      <div className="h-36 bg-slate-50 rounded-xl flex items-center justify-center mb-3">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className="h-28 object-contain"
        />
      </div>

      <h3 className="text-sm font-semibold line-clamp-2 mb-1">
        {product.name}
      </h3>

      <p className="text-xs text-slate-500 mb-3">
        {product.composition || "Salt composition not available"}
      </p>

      <div className="flex justify-between items-center">
        <span className="font-bold text-[#10847e]">₹{product.price}</span>
        <button
          onClick={() => onAdd?.(product)}
          className="bg-[#10847e] text-white p-2 rounded-lg hover:bg-[#0d6b66]"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
