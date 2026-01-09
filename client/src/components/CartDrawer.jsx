import React from 'react';
import './CartDrawer.css';

const CartDrawer = ({ open, cart = [], onClose, onRemove }) => {
  if (!open) return null;

  return (
    <div className="cart-drawer">
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <span>{item.name} x {item.qty}</span>
          <button onClick={() => onRemove(item._id)}>❌</button>
        </div>
      ))}
      <button className="close" onClick={onClose}>Close</button>
    </div>
  );
};

export default CartDrawer;
