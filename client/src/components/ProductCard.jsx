import { Plus } from "lucide-react";

const ProductCard = ({ product, onAdd }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="h-36 bg-slate-50 rounded-lg flex items-center justify-center">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className="h-28 object-contain"
        />
      </div>

      <h3 className="font-semibold text-sm mt-3 line-clamp-2">
        {product.name}
      </h3>

      <p className="text-xs text-gray-500">
        {product.composition || "Composition not available"}
      </p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-[#10847e]">₹{product.price}</span>
        <button
          onClick={() => onAdd(product)}
          className="bg-[#10847e] text-white p-2 rounded-lg hover:bg-[#0d6b66]"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
