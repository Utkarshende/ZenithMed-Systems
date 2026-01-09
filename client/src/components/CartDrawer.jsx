import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../components//CartContext";

const CartDrawer = ({ open, onClose }) => {
  const { cart, updateQty, removeFromCart } = useCart();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[200]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[201] shadow-xl flex flex-col"
          >
            {/* HEADER */}
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">
                Cart ({cart.length})
              </h2>
              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-slate-400 mt-20">
                  Your cart is empty
                </p>
              ) : (
                cart.map(item => (
                  <div key={item._id} className="flex gap-4 bg-slate-50 p-3 rounded-xl">
                    <img
                      src={item.image}
                      className="w-16 h-16 object-contain bg-white rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item._id, -1)}>
                          <Minus size={14} />
                        </button>
                        <span className="font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item._id, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#10847e]">
                        ₹{item.price * item.qty}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 mt-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="p-5 border-t">
              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span className="text-[#10847e]">₹{total}</span>
              </div>
              <button className="w-full bg-[#10847e] text-white py-3 rounded-xl font-bold">
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
