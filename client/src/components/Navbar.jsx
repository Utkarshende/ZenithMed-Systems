import "./Navbar.css";

const Navbar = ({ cart = [] }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <h1>NEXUS PHARMA</h1>
      <div className="cart">
        🛒 ₹0 ({totalItems})
      </div>
    </nav>
  );
};

export default Navbar;
