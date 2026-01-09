const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
        className="h-32 mx-auto object-contain"
      />

      <h3 className="mt-2 font-semibold text-sm">
        {product.name}
      </h3>

      <p className="text-xs text-gray-500">
        {product.composition}
      </p>

      <button className="mt-3 w-full bg-teal-600 text-white py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
