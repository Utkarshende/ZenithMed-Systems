import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <>
      <Hero />
      <CategoryBar />

      <div className="container section">
        <h2 className="section-title">Popular Medicines</h2>

        <div className="product-grid">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAdd={addToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
