import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-black text-2xl text-[#10847e]">
            PHARMEASY
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="relative bg-[#10847e] text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
