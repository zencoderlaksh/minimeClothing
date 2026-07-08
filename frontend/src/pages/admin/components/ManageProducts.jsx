import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react";

export default function ManageProducts() {
  const { getToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  // Edit State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Delete State
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setErrorMsg(data.message || "Failed to fetch products");
      }
    } catch (err) {
      setErrorMsg("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = (id) => {
    setProductToDelete(id);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    const id = productToDelete;
    
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccessMsg("Product deleted successfully!");
        setProductToDelete(null);
        fetchProducts(); // Refresh list
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setErrorMsg(data.message || "Failed to delete product");
      }
    } catch (err) {
      setErrorMsg("Network error: " + err.message);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || "",
      category: product.category,
      stock: product.stock,
      isTrending: product.isTrending,
      isBestSeller: product.isBestSeller,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${editingProduct}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(editForm)
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Product updated successfully!");
        setEditingProduct(null);
        fetchProducts();
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setErrorMsg(data.message || "Failed to update product");
      }
    } catch (err) {
      setErrorMsg("Network error: " + err.message);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading products...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-serif-display text-[color:var(--ink,#1a1612)]">Manage Products</h2>
        <p className="text-[color:var(--ink,#1a1612)]/60 mt-2">View, edit, or delete existing products in your store.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm border border-green-100">
          {successMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded bg-gray-100 overflow-hidden shrink-0">
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 max-w-[200px] line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      {product.isTrending && <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100 inline-block w-fit">Trending</span>}
                      {product.isBestSeller && <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-100 inline-block w-fit">Bestseller</span>}
                      {!product.isTrending && !product.isBestSeller && <span className="text-gray-400">-</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEditClick(product)}
                      className="text-[#b8960c] hover:text-[#8a7009] text-sm font-medium mr-4 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => confirmDelete(product._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No products found. Add some from the "Add Product" tab!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative my-auto shadow-2xl">
            <button 
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
            >
              ×
            </button>
            <h3 className="text-2xl font-serif-display mb-6">Edit Product</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">Product Name</label>
                  <input required type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#b8960c] transition-colors cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">Category</label>
                  <select name="category" value={editForm.category} onChange={handleEditChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#b8960c] transition-colors bg-white cursor-pointer">
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 cursor-pointer">Description</label>
                <textarea required name="description" value={editForm.description} onChange={handleEditChange} rows="3" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#b8960c] transition-colors resize-none cursor-pointer"></textarea>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">Price (₹)</label>
                  <input required type="number" name="price" value={editForm.price} onChange={handleEditChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#b8960c] transition-colors cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">Orig. Price (₹)</label>
                  <input type="number" name="originalPrice" value={editForm.originalPrice} onChange={handleEditChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#b8960c] transition-colors cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">Stock</label>
                  <input type="number" name="stock" value={editForm.stock} onChange={handleEditChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#b8960c] transition-colors cursor-pointer" />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="isTrending" checked={editForm.isTrending} onChange={handleEditChange} className="w-4 h-4 rounded text-[#b8960c] focus:ring-[#b8960c] cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 cursor-pointer">Mark as Trending</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="isBestSeller" checked={editForm.isBestSeller} onChange={handleEditChange} className="w-4 h-4 rounded text-[#b8960c] focus:ring-[#b8960c] cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 cursor-pointer">Mark as Best Seller</span>
                </label>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-lg font-medium bg-[#1a1612] text-white hover:bg-black transition-colors cursor-pointer">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal Overlay */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <h3 className="text-xl font-serif-display mb-2 text-gray-900">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button 
                onClick={() => setProductToDelete(null)}
                className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
