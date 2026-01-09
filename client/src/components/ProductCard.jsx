import "./ProductCard.css";
import { Plus } from "lucide-react";

const ProductCard = ({ product, onAdd }) => {
  if (!product) return null;

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={
            product.image ||
            "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88"
          }
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="composition">
          {product.composition || "Salt composition unavailable"}
        </p>

        <div className="product-footer">
          <span className="price">₹{product.price || 199}</span>
          <button onClick={() => onAdd(product)}>
            <Plus size={14} />
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
