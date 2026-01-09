import "./CartDrawer.css";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    cartItems = [],
    isCartOpen,
    closeCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  if (!isCartOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={closeCart}></div>

      {/* Drawer */}
      <aside className="cart-drawer">
        <div className="cart-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button onClick={closeCart}>
            <X />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <div className="item-actions">
                  <button onClick={() => decreaseQty(item._id)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item._id)}>
                    <Plus size={14} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
