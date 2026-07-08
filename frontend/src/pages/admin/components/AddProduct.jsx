import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Plus, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@clerk/react';

const CATEGORIES = ["Women", "Kids", "Accessories", "Other"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "ONE SIZE"];

const AddProduct = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "Women",
    subCategory: "",
    stock: "",
    sizes: [],
    isTrending: false,
    isBestSeller: false,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const toggleSize = (size) => {
    setFormData(prev => {
      if (prev.sizes.includes(size)) {
        return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImages(prev => [...prev, ...files]);
    
    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.name || !formData.price || !formData.category || images.length === 0) {
      setErrorMsg("Please fill out all required fields and add at least one image.");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      
      // 1. Upload Images
      const imageFormData = new FormData();
      images.forEach(image => {
        imageFormData.append("images", image);
      });

      const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload-images`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: imageFormData
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error(uploadData.message || "Failed to upload images");
      }

      const imageUrls = uploadData.imageUrls;

      // 2. Submit Product
      const productPayload = {
        ...formData,
        images: imageUrls
      };

      const productRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productPayload)
      });
      const productData = await productRes.json();

      if (!productData.success) {
        throw new Error(productData.message || "Failed to save product");
      }

      setSuccessMsg("Product added successfully!");
      
      // Auto-clear success toast after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
      
      // Reset Form
      setFormData({
        name: "", description: "", price: "", originalPrice: "", 
        category: "Women", subCategory: "", stock: "", sizes: [],
        isTrending: false, isBestSeller: false
      });
      setImages([]);
      setImagePreviews([]);
      
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl relative">
      <h2 className="font-serif-display text-3xl text-[color:var(--ink,#1a1612)] mb-2">Add New Product</h2>
      <p className="text-[color:var(--ink,#1a1612)]/50 mb-8">Add a new item to your atelier's collection.</p>

      {/* Toast Notifications */}
      {errorMsg && (
        <div className="fixed top-20 right-6 z-50 animate-fade-in-down flex items-center gap-3 bg-white border-l-4 border-red-500 shadow-xl rounded-lg p-4 max-w-sm">
          <div className="text-red-500 bg-red-50 p-2 rounded-full">
            <X size={16} />
          </div>
          <p className="text-sm font-medium text-gray-800">{errorMsg}</p>
        </div>
      )}
      
      {successMsg && (
        <div className="fixed top-20 right-6 z-50 animate-fade-in-down flex items-center gap-3 bg-white border-l-4 border-green-500 shadow-xl rounded-lg p-4 max-w-sm">
          <div className="text-green-500 bg-green-50 p-2 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-800">{successMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5">
          <h3 className="text-lg font-medium text-[color:var(--ink,#1a1612)] mb-6">Basic Details</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-1.5 cursor-pointer">Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 rounded-xl border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)]/50 outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-1.5 cursor-pointer">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="4" className="w-full p-3 rounded-xl border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)]/50 outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors resize-none cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5">
            <h3 className="text-lg font-medium text-[color:var(--ink,#1a1612)] mb-6">Pricing</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-1.5 cursor-pointer">Selling Price ($) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full p-3 rounded-xl border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)]/50 outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-1.5 cursor-pointer">Original Price ($) (Optional)</label>
                <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} min="0" step="0.01" className="w-full p-3 rounded-xl border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)]/50 outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5">
            <h3 className="text-lg font-medium text-[color:var(--ink,#1a1612)] mb-6">Inventory</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-1.5 cursor-pointer">Stock Quantity</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} min="0" className="w-full p-3 rounded-xl border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)]/50 outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Flags */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5">
          <h3 className="text-lg font-medium text-[color:var(--ink,#1a1612)] mb-6">Marketing</h3>
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  name="isTrending" 
                  checked={formData.isTrending} 
                  onChange={handleInputChange}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-[color:var(--ink,#1a1612)]/30 rounded flex items-center justify-center peer-checked:bg-[color:var(--ink,#1a1612)] peer-checked:border-[color:var(--ink,#1a1612)] transition-colors cursor-pointer">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-medium text-[color:var(--ink,#1a1612)]/80">Mark as Trending</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  name="isBestSeller" 
                  checked={formData.isBestSeller} 
                  onChange={handleInputChange}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-[color:var(--ink,#1a1612)]/30 rounded flex items-center justify-center peer-checked:bg-[color:var(--ink,#1a1612)] peer-checked:border-[color:var(--ink,#1a1612)] transition-colors cursor-pointer">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-medium text-[color:var(--ink,#1a1612)]/80">Mark as Best Seller</span>
            </label>
          </div>
        </div>

        {/* Categories & Variants */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5">
          <h3 className="text-lg font-medium text-[color:var(--ink,#1a1612)] mb-6">Categorization</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-1.5 cursor-pointer">Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)]/50 outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-1.5 cursor-pointer">Sub-Category (Optional)</label>
              <input type="text" name="subCategory" value={formData.subCategory} onChange={handleInputChange} placeholder="e.g. Dresses, Tops" className="w-full p-3 rounded-xl border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)]/50 outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[color:var(--ink,#1a1612)]/70 mb-3 cursor-pointer">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    formData.sizes.includes(size) 
                      ? 'bg-[color:var(--ink,#1a1612)] text-white border-[color:var(--ink,#1a1612)]' 
                      : 'bg-transparent text-[color:var(--ink,#1a1612)] border-[color:var(--ink,#1a1612)]/20 hover:border-[color:var(--ink,#1a1612)]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-[color:var(--ink,#1a1612)]">Product Images *</h3>
            <span className="text-xs text-[color:var(--ink,#1a1612)]/40">{imagePreviews.length} / 5</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {imagePreviews.map((src, idx) => (
              <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden group border border-[color:var(--nude,#e8ddd0)]">
                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm hover:bg-red-50"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {imagePreviews.length < 5 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[3/4] rounded-xl border-2 border-dashed border-[color:var(--nude,#e8ddd0)] flex flex-col items-center justify-center text-[color:var(--ink,#1a1612)]/40 hover:border-[color:var(--gold-deep,#b8960c)] hover:text-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer bg-[color:var(--parchment,#faf8f4)]/50"
              >
                <ImageIcon size={24} className="mb-2" />
                <span className="text-xs font-medium cursor-pointer">Add Image</span>
              </button>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3.5 bg-[color:var(--ink,#1a1612)] text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-md shadow-black/5"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
            {loading ? "Publishing Product..." : "Publish Product"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;
