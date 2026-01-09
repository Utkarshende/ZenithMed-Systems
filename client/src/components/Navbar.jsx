import "./Navbar.css";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems = [], toggleCart } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          Nexus<span>Pharma</span>
        </div>

        {/* Search */}
        <div className="navbar-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search medicines & health products"
          />
        </div>

        {/* Cart */}
        <div className="navbar-cart" onClick={toggleCart}>
          <ShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
