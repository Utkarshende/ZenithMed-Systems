// src/components/CartDrawer.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const CartDrawer = ({
  cart = [],
  isOpen = false,
  onClose = () => {},
  onRemove = () => {},
  onUpdateQty = () => {},
}) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[201] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-black">Your Basket ({cart.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-300 font-bold">
                  Your basket is empty
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item._id || item.name}
                    className="flex gap-4 p-4 bg-slate-50 rounded-2xl items-center"
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-slate-800 truncate w-40">{item.name}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => onUpdateQty(item._id, -1)}
                          className="p-1 bg-white rounded-md border"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item._id, 1)}
                          className="p-1 bg-white rounded-md border"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-sm text-[#10847e]">
                        ₹{item.price * item.qty}
                      </div>
                      <button
                        onClick={() => {
                          onRemove(item._id);
                          toast.error("Item removed");
                        }}
                        className="text-red-400 mt-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t space-y-4">
              <div className="flex justify-between font-black text-xl">
                <span>Grand Total</span>
                <span className="text-[#10847e]">₹{total}</span>
              </div>
              <button
                className="w-full bg-[#10847e] text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg"
                onClick={() => toast.success("Secure Checkout Initiated")}
              >
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
