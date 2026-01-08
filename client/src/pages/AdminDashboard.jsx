import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/api/products`);
    setProducts(res.data.products || res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-black mb-6">Admin Dashboard</h1>

      {products.map((p) => (
        <div key={p._id} className="flex justify-between border-b py-4">
          <span>{p.name}</span>
          <button
            onClick={() => deleteProduct(p._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
