import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
