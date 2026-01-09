import "./Home.css";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryStrip from "../components/CategoryStrip";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data.products || []);
        setFiltered(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategory = (cat) => {
    setCategory(cat);
    if (cat === "All") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((p) =>
          p.category?.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }
  };

  const handleAdd = (product) => {
    console.log("Added to cart:", product.name);
  };

  if (loading) {
    return <div className="loading">Loading medicines...</div>;
  }

  return (
    <>
      <CategoryStrip selected={category} onSelect={handleCategory} />

      <section className="home">
        <h2>{category} Medicines</h2>

        <div className="product-grid">
          {filtered.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filtered.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={handleAdd} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
