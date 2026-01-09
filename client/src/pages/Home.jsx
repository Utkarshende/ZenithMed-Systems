import "./Home.css";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryStrip from "../components/CategoryStrip";
import CartDrawer from "../components/CartDrawer";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);

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
  // add to cart function
const handleAdd = (product) => {
  setCart((prev) => {
    const exists = prev.find((p) => p._id === product._id);
    if (exists) return prev.map(p => p._id === product._id ? {...p, qty: p.qty + 1} : p);
    return [...prev, {...product, qty: 1}];
  });
  setIsCartOpen(true); // open drawer on add
};
// update qty
const handleUpdateQty = (id, delta) => {
  setCart(prev => prev.map(p => p._id === id ? {...p, qty: Math.max(1, p.qty + delta)} : p));
};
const handleRemove = (id) => {
  setCart(prev => prev.filter(p => p._id !== id));
};
{isCartOpen && (
  <CartDrawer
    cart={cart}
    onClose={() => setIsCartOpen(false)}
    onRemove={handleRemove}
    onUpdateQty={handleUpdateQty}
  />
)}

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
