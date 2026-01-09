import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return <p>No medicines available</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
