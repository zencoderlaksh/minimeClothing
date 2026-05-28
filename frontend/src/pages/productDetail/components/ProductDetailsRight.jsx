import { useState } from "react";
import { Plus, Minus, PackageX, ShoppingBag, Heart, Ruler } from "lucide-react";

const ProductDetailsRight = ({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  handleAddToCart,
  handleWishlist,
  isWishlisted,
  isOutOfStock,
  sizeError,
  setSizeError
}) => {
  const [showSizePanel, setShowSizePanel] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <div>
      <p className="text-[11px] text-gray-400 mb-5 tracking-wide">
        Select the size of the item to see the expected delivery date.
      </p>

      {/* SIZE SELECTOR */}
      <div className={`border-t border-b transition-colors ${sizeError ? "border-red-300" : "border-gray-200"}`}>
        <button
          onClick={() => setShowSizePanel((p) => !p)}
          className="w-full flex justify-between items-center py-3.5 px-0 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-black">
            Size
            {selectedSize ? (
              <span className="font-semibold ml-2">{selectedSize}</span>
            ) : (
              <span className="text-gray-400 ml-2 normal-case tracking-normal">— select a size</span>
            )}
          </span>
          <Plus size={13} className={`text-black transition-transform duration-300 ${showSizePanel ? "rotate-45" : ""}`} />
        </button>

        {showSizePanel && (
          <div className="pb-5 pt-1">
            <div className="grid grid-cols-5 gap-1.5 mb-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`py-2.5 text-[11px] tracking-widest uppercase border transition-all duration-150 cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-[11px] text-red-500 tracking-wide mb-2">
                Please select a size to continue.
              </p>
            )}
          </div>
        )}
      </div>

      {/* QUANTITY */}
      <div className="flex items-center gap-4 my-5">
        <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500">Qty</span>
        <div className="flex items-center border border-gray-300">
          <button
            className="px-3 py-2 hover:bg-gray-50 disabled:opacity-30 transition-colors cursor-pointer"
            onClick={() => setQuantity((p) => Math.max(1, p - 1))}
            disabled={isOutOfStock}
          >
            <Minus size={12} />
          </button>
          <span className="px-4 text-[13px] min-w-[32px] text-center">{quantity}</span>
          <button
            className="px-3 py-2 hover:bg-gray-50 disabled:opacity-30 transition-colors cursor-pointer"
            onClick={() => setQuantity((p) => Math.min(product.stock || 99, p + 1))}
            disabled={isOutOfStock}
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* ADD TO BAG */}
      <button
        onClick={() => {
          if (!selectedSize) { setSizeError(true); setShowSizePanel(true); return; }
          handleAddToCart();
        }}
        disabled={isOutOfStock}
        className={`w-full py-4 text-[11px] uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-2 ${
          isOutOfStock
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-[#1a1a1a] cursor-pointer"
        }`}
      >
        {isOutOfStock ? (
          <><PackageX size={14} /> Out of Stock</>
        ) : selectedSize ? (
          <><ShoppingBag size={13} /> Add to Bag</>
        ) : (
          "Select Size"
        )}
      </button>

      {/* WISHLIST */}
      <button
        onClick={handleWishlist}
        className="w-full py-3.5 text-[11px] uppercase tracking-[0.25em] border border-gray-300 mt-2 flex items-center justify-center gap-2 hover:border-black transition-colors cursor-pointer"
      >
        <Heart
          size={13}
          fill={isWishlisted ? "#ef4444" : "transparent"}
          stroke={isWishlisted ? "#ef4444" : "currentColor"}
        />
        {isWishlisted ? "Wishlisted" : "Wishlist"}
      </button>

      <div className="border-t border-gray-200 mt-7 mb-5" />

      {/* SIZE GUIDE REPLACING SERVICES */}
      <div className="space-y-0">
        <button 
          onClick={() => setShowSizeGuide(!showSizeGuide)}
          className="w-full flex items-center justify-between text-[12px] tracking-wide text-black hover:text-gray-500 transition-colors cursor-pointer py-3 border-b border-gray-100"
        >
          <div className="flex items-center gap-3">
            <Ruler size={13} className="shrink-0" />
            <span className="uppercase tracking-widest text-[11px]">Size Guide</span>
          </div>
          <Plus size={13} className={`transition-transform duration-300 ${showSizeGuide ? "rotate-45" : ""}`} />
        </button>
        
        {showSizeGuide && (
          <div className="py-4">
            <table className="w-full text-[11px] border border-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left tracking-widest uppercase font-medium text-gray-500">Size</th>
                  <th className="p-2 text-left tracking-widest uppercase font-medium text-gray-500">Bust</th>
                  <th className="p-2 text-left tracking-widest uppercase font-medium text-gray-500">Waist</th>
                </tr>
              </thead>
              <tbody>
                {[["XS","32\"","24\""],["S","34\"","26\""],["M","36\"","28\""],["L","38\"","30\""],["XL","40\"","32\""],["XXL","42\"","34\""],["3XL","44\"","36\""]].map(([s,b,w]) => (
                  <tr key={s} className="border-t border-gray-100">
                    <td className="p-2 font-medium">{s}</td>
                    <td className="p-2">{b}</td>
                    <td className="p-2">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-[11px] text-gray-400 leading-relaxed mt-4">
        Complimentary Shipping and Collect in Store, Complimentary Exchanges &amp; Returns, Secure Payments and Signature Packaging
      </p>
    </div>
  );
};

export default ProductDetailsRight;