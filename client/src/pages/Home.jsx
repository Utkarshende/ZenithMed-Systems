import "./Home.css";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    console.log("Added to cart:", product.name);
  };

  if (loading) {
    return <div className="loading">Loading medicines...</div>;
  }

  return (
    <section className="home">
      <h2>Popular Medicines</h2>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </section>
  );
};

export default Home;
