import "./ProductCard.css";

const ProductCard = ({ product, onAdd }) => {
  if (!product) return null;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="composition">{product.composition}</p>
      <p className="packaging">{product.packaging}</p>
      <button onClick={() => onAdd(product)}>Add</button>
    </div>
  );
};

export default ProductCard;
