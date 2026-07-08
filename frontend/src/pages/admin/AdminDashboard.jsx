import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Package, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@clerk/react';
import AddProduct from './components/AddProduct';
import ManageProducts from './components/ManageProducts';
import DashboardOverview from './components/DashboardOverview';
import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === `/admin${path}`;

  const navItems = [
    { name: 'Dashboard Overview', path: '', icon: LayoutDashboard },
    { name: 'Manage Orders', path: '/orders', icon: Package },
    { name: 'Add Product', path: '/add-product', icon: PlusCircle },
    { name: 'Manage Products', path: '/products', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--parchment,#faf8f4)] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[color:var(--ink,#1a1612)] text-white p-4 flex justify-between items-center cursor-pointer">
        <h1 className="font-serif-display text-xl tracking-wider cursor-pointer">Atelier Admin</h1>
        <button className="cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 bg-[color:var(--ink,#1a1612)] text-white/80 shrink-0
      `}>
        <div className="p-8 hidden md:block">
          <h1 className="font-serif-display text-2xl text-white tracking-widest uppercase">
            Atelier<br/>Admin
          </h1>
          <div className="h-px w-12 bg-[color:var(--gold-deep,#b8960c)] mt-6"></div>
        </div>

        <nav className="mt-4 md:mt-0 px-4 space-y-2 pb-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={`/admin${item.path}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer
                ${isActive(item.path) 
                  ? 'bg-white/10 text-white font-medium shadow-inner border border-white/5' 
                  : 'hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <item.icon size={18} className={isActive(item.path) ? "text-[color:var(--gold-deep,#b8960c)]" : ""} />
              <span className="text-sm tracking-wide cursor-pointer">{item.name}</span>
            </Link>
          ))}
          
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 mt-8 rounded-lg hover:bg-white/5 hover:text-red-400 transition-colors text-left cursor-pointer"
          >
            <LogOut size={18} className="cursor-pointer" />
            <span className="text-sm tracking-wide cursor-pointer">Exit to Store</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<ManageProducts />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
