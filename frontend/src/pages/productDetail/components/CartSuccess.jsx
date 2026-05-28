import { useEffect } from "react";
import { Check } from "lucide-react";

const ToastItem = ({ id, onRemove }) => {
  useEffect(() => {
    const t = setTimeout(() => onRemove(id), 2400);
    return () => clearTimeout(t);
  }, [id, onRemove]);

  return (
    <div
      className="bg-black text-white px-8 py-4 flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase shadow-lg mb-2"
      style={{ animation: "slideUpIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
    >
      <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
        <Check size={10} className="text-black" strokeWidth={3} />
      </span>
      Added to Bag
    </div>
  );
};

const CartSuccess = ({ toasts, onRemove }) => {
  return (
    <>
      <style>{`
        @keyframes slideUpIn {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
      <div className="fixed bottom-10 right-10 z-[999] pointer-events-none flex flex-col-reverse items-end">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} id={toast.id} onRemove={onRemove} />
        ))}
      </div>
    </>
  );
};

export default CartSuccess;