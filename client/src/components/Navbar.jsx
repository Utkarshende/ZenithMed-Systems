import "./Navbar.css";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems, toggleCart } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <span>Nexus</span>Pharma
        </div>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search medicines & health products"
          />
        </div>

        {/* Cart */}
        <div className="cart" onClick={toggleCart}>
          🛒
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
