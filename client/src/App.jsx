import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

// --- MODULAR IMPORTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  // Global Cart State
  const [cart, setCart] = useState([]);

  // Workable Add to Cart Function
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    toast.success(`${product.name || 'Medicine'} added to your cart`, {
      icon: '🛒',
      style: {
        borderRadius: '8px',
        background: '#10847e',
        color: '#fff',
      },
    });
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f3f7fb]">
        {/* Toast notifications handler */}
        <Toaster position="top-right" reverseOrder={false} />

        {/* Global Navbar - Workable Search and Cart count */}
        <Navbar cartCount={cart.length} />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Home onAddToCart={handleAddToCart} />} 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Professional Footer with Kalp Pharma Data */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;