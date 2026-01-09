import "./ProductCard.css";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-card">
      <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
