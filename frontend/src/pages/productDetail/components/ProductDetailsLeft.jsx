import { cash, rupay, gpay, upi } from "../../../assets/images";

const ProductDetailsLeft = ({ product, selectedColor, setSelectedColor }) => {
  return (
    <div>
      {product.category && (
        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-3">
          {product.category}
        </p>
      )}

      <h1 className="text-[22px] font-light leading-snug text-black mb-4" style={{ letterSpacing: "-0.01em" }}>
        {product.title}
      </h1>

      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-[18px] font-light text-black">
          ₹{product.discountPrice.toLocaleString()}
        </span>
        {product.price && product.price !== product.discountPrice && (
          <span className="text-[13px] text-gray-400 line-through">
            ₹{product.price.toLocaleString()}
          </span>
        )}
        {product.discountPercent && (
          <span className="text-[11px] text-[#5a7a4a] tracking-wide">
            {product.discountPercent}% off
          </span>
        )}
      </div>

      {selectedColor && (
        <p className="text-[12px] text-gray-500 mb-3 tracking-wide">
          Variation <span className="text-black font-medium">{selectedColor.name}</span>
        </p>
      )}

      {product.colors?.length > 0 && (
        <div className="flex gap-2 mb-8">
          {product.colors.map((color) => {
            const isLight = ["#FFFFFF", "#FFFFF0", "#F5F0E8", "#FFFDD0", "#F5C5C5", "#FFCBA4"].includes(color.hex);
            const isActive = selectedColor?.name === color.name;
            return (
              <button
                key={color.name}
                title={color.name}
                onClick={() => setSelectedColor(color)}
                className={`
                  w-9 h-9 cursor-pointer transition-all
                  ${isActive ? "ring-1 ring-offset-1 ring-black" : "opacity-60 hover:opacity-100"}
                  ${isLight ? "border border-gray-200" : ""}
                `}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      )}

      <div className="border-t border-gray-200 mb-6" />

      <h3 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 text-black">
        Product Description
      </h3>
      {product.badge && (
        <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-2">
          Style {product.id}
        </p>
      )}
      <p className="text-[13px] text-gray-600 leading-[1.95]">{product.description}</p>

      <div className="mt-5">
        <span className="text-[11px] tracking-wide text-gray-400">
         {product.stockStatus}
{product.stock > 0 && product.stockStatus !== "Out of Stock" && (
  <span className="ml-2">· {product.stock} units available</span>
)}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 mt-8 opacity-55">
        <img src={cash} alt="Cash" className="h-5 object-contain" />
        <img src={upi} alt="UPI" className="h-5 object-contain" />
        <img src={rupay} alt="Rupay" className="h-5 object-contain" />
        <img src={gpay} alt="GPay" className="h-5 object-contain" />
      </div>
    </div>
  );
};

export default ProductDetailsLeft;