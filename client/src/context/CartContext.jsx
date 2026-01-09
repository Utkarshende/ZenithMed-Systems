import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((p) => !p);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((p) => p._id === product._id);
      if (found)
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );

  const decreaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((p) =>
        p._id === id && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
      )
    );

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((p) => p._id !== id));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        toggleCart,
        closeCart,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
