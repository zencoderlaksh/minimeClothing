import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Star, AlertCircle } from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    total: 0,
    trending: 0,
    bestSellers: 0,
    lowStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        
        if (data.success) {
          const products = data.products;
          
          let trending = 0;
          let bestSellers = 0;
          let lowStock = 0;

          products.forEach(p => {
            if (p.isTrending) trending++;
            if (p.isBestSeller) bestSellers++;
            if (p.stock < 5) lowStock++;
          });

          setStats({
            total: products.length,
            trending,
            bestSellers,
            lowStock
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="font-serif-display text-3xl text-[color:var(--ink,#1a1612)] mb-8">Dashboard Overview</h2>
      
      {loading ? (
        <div className="text-gray-500">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-[color:var(--gold-deep,#b8960c)]/10 flex items-center justify-center">
              <Package size={20} className="text-[color:var(--gold-deep,#b8960c)]" />
            </div>
            <div>
              <p className="text-sm text-[color:var(--ink,#1a1612)]/50">Total Products</p>
              <p className="text-2xl font-serif-display text-[color:var(--ink,#1a1612)]">{stats.total}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <TrendingUp size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-[color:var(--ink,#1a1612)]/50">Trending Items</p>
              <p className="text-2xl font-serif-display text-[color:var(--ink,#1a1612)]">{stats.trending}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Star size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-[color:var(--ink,#1a1612)]/50">Best Sellers</p>
              <p className="text-2xl font-serif-display text-[color:var(--ink,#1a1612)]">{stats.bestSellers}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[color:var(--ink,#1a1612)]/5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-[color:var(--ink,#1a1612)]/50">Low Stock</p>
              <p className="text-2xl font-serif-display text-[color:var(--ink,#1a1612)]">{stats.lowStock}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
