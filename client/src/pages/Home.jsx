import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <>
      <Hero />
      <CategoryBar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold mb-6">
          Popular Medicines
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
