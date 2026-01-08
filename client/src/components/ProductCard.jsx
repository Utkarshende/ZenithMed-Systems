import { Plus } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow hover:shadow-xl transition flex flex-col">
      <div className="h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center">
        <img src={product.image} alt="" className="h-24 object-contain" />
      </div>

      <h4 className="font-bold text-sm mb-1 line-clamp-2">
        {product.name}
      </h4>

      <p className="text-xs text-slate-400 mb-3">
        {product.composition}
      </p>

      <div className="mt-auto flex justify-between items-center">
        <span className="font-black text-lg">₹{product.price || 299}</span>
        <button className="bg-[#10847e] text-white p-2 rounded-xl">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
