import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const API_URL = 'http://localhost:5000';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', composition: '', category: 'General', price: '', image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      setShowAddModal(false);
      setNewProduct({ name:'', composition:'', category:'General', price:'', image:'' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    if(window.confirm('Delete this product?')) {
      try {
        await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h2>{products.length}</h2>
          <p>Live Products</p>
        </div>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add Product</button>
      </div>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteProduct(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <input type="text" placeholder="Name" value={newProduct.name} required
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
              <input type="text" placeholder="Composition" value={newProduct.composition} required
                onChange={e => setNewProduct({ ...newProduct, composition: e.target.value })} />
              <input type="text" placeholder="Category" value={newProduct.category} required
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
              <input type="number" placeholder="Price" value={newProduct.price} required
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
              <input type="text" placeholder="Image URL" value={newProduct.image}
                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
              <button type="submit" className="add-btn">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
