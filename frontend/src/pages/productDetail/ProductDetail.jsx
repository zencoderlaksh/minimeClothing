// ProductDetail.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import {
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  CheckCircle2,
} from "lucide-react";

import products from "../../assets/data";

import ReviewSection from "../../components/ReviewSection";
import SimilarProducts from "../../components/SimilarProducts";

import { useCart } from "../../context/CartContext";

import {
  cash,
  rupay,
  gpay,
  upi,
} from "../../assets/images";

const ProductDetail = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const { addToCart } = useCart();
  const {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
  } = useWishlist();
  const [selectedImage, setSelectedImage] =
    useState(product?.mainImage);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [sizeError, setSizeError] =
    useState("");

  const [showGuide, setShowGuide] =
  useState(false);

  const [added, setAdded] =
    useState(false);
  
  
   const handleWishlist = () => {
  if (isWishlisted(product.id)) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};
  const [imageLoading, setImageLoading] =
    useState(false);

  

  if (!product) {
    return (
      <div className="pt-32 text-center">
        Product not found
      </div>
    );
  }

  const images = [
    product.mainImage,
    ...(product.images || []),
  ];

  
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(
        "Please select a size before adding to cart."
      );
      return;
    }

    setSizeError("");

    addToCart(
      product,
      quantity,
      selectedSize
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 3000);
  };

  return (
    <>
      <div
        className="
          bg-[#faf8f5]
          min-h-screen
          pt-32
        "
      >
        {/* MAIN */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            grid
            lg:grid-cols-2
            gap-14
          "
        >
          {/* LEFT */}

          <div>
            {/* MAIN IMAGE */}

            <div
              className="
                overflow-hidden
                rounded-xl
                bg-white
              "
            >
              <img
                key={selectedImage}
                src={selectedImage}
                alt={product.title}
                className={`
                  w-full
                  h-[650px]
                  lg:h-[850px]
                  object-cover
                  transition-all
                  duration-500
                  hover:scale-105

                  ${
                    imageLoading
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
              />
            </div>

            {/* THUMBNAILS */}

            <div
              className="
                grid
                grid-cols-4
                gap-4
                mt-4
              "
            >
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setImageLoading(true);

                    setTimeout(() => {
                      setSelectedImage(image);
                      setImageLoading(false);
                    }, 120);
                  }}
                  className={`
                    cursor-pointer
                    overflow-hidden
                    rounded-lg
                    border
                    transition-all
                    duration-300

                    ${
                      selectedImage === image
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    }
                  `}
                >
                  <img
                    src={image}
                    alt=""
                    className="
                      h-28
                      w-full
                      object-cover
                      hover:scale-110
                      transition-all
                      duration-500
                    "
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              lg:sticky
              lg:top-28
              h-fit
            "
          >
            

            {/* CATEGORY */}

            <p
              className="
                uppercase
                tracking-[0.25em]
                text-xs
                text-[#b79d84]
              "
            >
              {product.category}
            </p>

            {/* TITLE */}

            <div className="flex justify-between gap-4">

  <h1
    className="
      text-4xl
      md:text-5xl
      font-light
      leading-tight
    "
  >
    {product.title}
  </h1>

  <button
    onClick={handleWishlist}
    className="
      shrink-0
      cursor-pointer
      transition-all
      duration-300
      hover:scale-110
    "
  >
    <Heart
      size={30}
      fill={
        isWishlisted(product.id)
          ? "#ef4444"
          : "transparent"
      }
      stroke={
        isWishlisted(product.id)
          ? "#ef4444"
          : "currentColor"
      }
    />
  </button>

</div>

            {/* PRICE */}

            <div
              className="
                flex
                items-center
                gap-4
                mt-6
              "
            >
              <span className="text-3xl font-medium">
                ₹{product.discountPrice}
              </span>

              <span
                className="
                  line-through
                  text-gray-400
                "
              >
                ₹{product.price}
              </span>
            </div>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                text-gray-600
                leading-8
              "
            >
              {product.description}
            </p>

            {/* SIZE */}

<div className="mt-10">

  <div className="flex justify-between items-center">

    <h3 className="font-medium">
      Select Size
    </h3>

    <button
      className="
        cursor-pointer
        text-sm
        underline
      "
      onClick={() =>
        setShowGuide(
          (prev) => !prev
        )
      }
    >
      Size Guide
    </button>

  </div>

  <div className="flex gap-3 mt-4">

    {product.sizes.map((size) => (
      <button
        key={size}
        onClick={() => {
          setSelectedSize(size);
          setSizeError("");
        }}
        className={`
          cursor-pointer
          h-12
          w-12
          border
          transition-all

          ${
            selectedSize === size
              ? "bg-black text-white border-black"
              : "bg-white hover:border-black"
          }
        `}
      >
        {size}
      </button>
    ))}

  </div>

  {selectedSize && (
    <p
      className="
        mt-3
        text-sm
        text-[#8a725d]
      "
    >
      Selected Size: {selectedSize}
    </p>
  )}

  {sizeError && (
    <p
      className="
        mt-2
        text-sm
        text-red-500
      "
    >
      {sizeError}
    </p>
  )}

  {showGuide && (
    <div
      className="
        mt-5
        border
        border-[#e8dfd5]
        bg-white
        overflow-hidden
        animate-fadeIn
      "
    >

      <table className="w-full text-sm">

        <thead>
          <tr className="bg-[#f8f6f2]">

            <th className="p-3 border">
              Size
            </th>

            <th className="p-3 border">
              Bust
            </th>

            <th className="p-3 border">
              Waist
            </th>

          </tr>
        </thead>

        <tbody>

          <tr>
            <td className="border p-3">
              XS
            </td>

            <td className="border p-3">
              32"
            </td>

            <td className="border p-3">
              24"
            </td>
          </tr>

          <tr>
            <td className="border p-3">
              S
            </td>

            <td className="border p-3">
              34"
            </td>

            <td className="border p-3">
              26"
            </td>
          </tr>

          <tr>
            <td className="border p-3">
              M
            </td>

            <td className="border p-3">
              36"
            </td>

            <td className="border p-3">
              28"
            </td>
          </tr>

          <tr>
            <td className="border p-3">
              L
            </td>

            <td className="border p-3">
              38"
            </td>

            <td className="border p-3">
              30"
            </td>
          </tr>

          <tr>
            <td className="border p-3">
              XL
            </td>

            <td className="border p-3">
              40"
            </td>

            <td className="border p-3">
              32"
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  )}

</div>

              

              

            {/* QUANTITY */}

            <div className="mt-10">
              <p className="font-medium mb-4">
                Quantity
              </p>

              <div
                className="
                  flex
                  items-center
                  border
                  w-fit
                  bg-white
                "
              >
                <button
                  className="
                    cursor-pointer
                    p-4
                    hover:bg-gray-100
                  "
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                >
                  <Minus size={16} />
                </button>

                <span className="px-6">
                  {quantity}
                </span>

                <button
                  className="
                    cursor-pointer
                    p-4
                    hover:bg-gray-100
                  "
                  onClick={() =>
                    setQuantity((prev) =>
                      prev + 1
                    )
                  }
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* ADD TO CART */}

            <button
              onClick={handleAddToCart}
              className="
                cursor-pointer
                w-full
                mt-10
                py-4
                bg-black
                text-white
                uppercase
                tracking-widest
                hover:bg-[#222]
                transition-all
                duration-300
              "
            >
              Add To Cart
            </button>

            {/* SUCCESS */}

            {added && (
              <div
                className="
                  mt-4
                  bg-green-50
                  border
                  border-green-200
                  text-green-700
                  px-4
                  py-3
                  rounded-md
                  flex
                  items-center
                  gap-2
                "
              >
                <CheckCircle2 size={18} />

                <span>
                  Added to cart successfully
                </span>
              </div>
            )}

            {/* FEATURES */}

            <div
              className="
                mt-10
                bg-white
                border
                border-[#e7dfd5]
                p-6
                space-y-4
              "
            >
              <div className="flex gap-3">
                <Truck size={18} />
                <span>
                  Free shipping over ₹1999
                </span>
              </div>

              <div className="flex gap-3">
                <RotateCcw size={18} />
                <span>
                  Easy returns within 48 hours
                </span>
              </div>

              <div className="flex gap-3">
                <ShieldCheck size={18} />
                <span>
                  Secure payment checkout
                </span>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 size={18} />
                <span>
                  Premium quality fabric
                </span>
              </div>
            </div>

            {/* PAYMENTS */}

            <div
              className="
                flex
                flex-wrap
                gap-4
                mt-6
              "
            >
              <img src={cash} alt="" className="h-22" />
              <img src={upi} alt="" className="h-22" />
              <img src={rupay} alt="" className="h-22"/>
              <img src={gpay} alt="" className="h-22"/>
            </div>
          </div>
        </div>

        {/* REVIEWS */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            mt-24
          "
        >
          <ReviewSection />

          <SimilarProducts
            category={product.category}
            currentId={product.id}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;