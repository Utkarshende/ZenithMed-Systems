import "./CartDrawer.css";

const CartDrawer = ({ cart, onClose, onRemove, onUpdateQty }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h3>Basket ({cart.length})</h3>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-msg">Your basket is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <div className="qty-controls">
                    <button onClick={() => onUpdateQty(item._id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item._id, 1)}>+</button>
                  </div>
                </div>
                <div className="item-price">
                  ₹{item.price * item.qty}
                  <button className="remove-btn" onClick={() => onRemove(item._id)}>
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <button className="checkout-btn">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
