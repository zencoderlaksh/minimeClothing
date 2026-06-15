import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { useCartStore } from "../../stores/useCartStore";
import products from "../../assets/data";

import CartSuccess from "./components/CartSuccess";
import ProductGallery from "./components/ProductGallery";
import ProductDetailsLeft from "./components/ProductDetailsLeft";
import ProductDetailsRight from "./components/ProductDetailsRight";
import SimilarProducts from "./components/SimilarProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const product = products.find((item) => item.id === Number(id));
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

  const images = product ? [product.mainImage, ...(product.images || [])] : [];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [toasts, setToasts] = useState([]);

useEffect(() => {
    setQuantity(1);
    setSizeError(false);
    
    // REPLACE setAddedToCart(false) WITH THIS:
    setToasts([]); 
    
    // Set initial active color
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }

    const incomingSize = location.state?.preSelectedSize;
    setSelectedSize(incomingSize || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, product, location.state?.preSelectedSize]);

  if (!product) {
    return (
      <div className="pt-32 text-center text-sm tracking-widest uppercase text-gray-400">
        Product not found
      </div>
    );
  }

  const isOutOfStock = product.stockStatus === "Out of Stock";

  const handleWishlistToggle = () => {
    isWishlisted(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleAddToCart = () => {
  setSizeError(false);
  addToCart(product, quantity, selectedSize, selectedColor);
  
  // Add a new toast to the queue, keeping a maximum of 3
  const newToast = { id: Date.now() };
  setToasts((prev) => [...prev, newToast].slice(-3));
};
const removeToast = (id) => {
  setToasts((prev) => prev.filter((toast) => toast.id !== id));
};

  return (
    <div
      className="bg-white min-h-screen"
      style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif" }}
    >
      {toasts.length > 0 && <CartSuccess toasts={toasts} onRemove={removeToast} />}

      <ProductGallery product={product} images={images} />

      <div className="max-w-screen-2xl mx-auto px-8 pt-8 pb-16 grid lg:grid-cols-2 gap-16 border-t border-gray-100">
        <ProductDetailsLeft 
          product={product} 
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        
        <ProductDetailsRight 
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          handleWishlist={handleWishlistToggle}
          isWishlisted={isWishlisted(product.id)}
          isOutOfStock={isOutOfStock}
          sizeError={sizeError}
          setSizeError={setSizeError}
        />
      </div>

      <div className="border-t border-gray-100 pt-14 pb-20">
        <div className="max-w-screen-2xl mx-auto px-8 mb-8">
          <h2 className="text-[13px] uppercase tracking-[0.3em] font-light text-black text-center">
            Similar Products
          </h2>
        </div>
        <SimilarProducts category={product.category} currentId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;