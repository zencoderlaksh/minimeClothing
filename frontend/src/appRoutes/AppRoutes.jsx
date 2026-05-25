import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home"
import Layout from "../layout/Layout"
import Login from '../pages/auth/Login'
import SignUp from '../pages/auth/SignUp'
import Contact from '../pages/contact/Contact';
import Collection from '../pages/collection/Collection';
import ProductDetail from '../pages/productDetail/ProductDetail';
import Cart from '../pages/cart/Cart'
import Wishlist from '../pages/wishlist/wishlist';
import Search from '../pages/search/Search';
import About from '../pages/about/About';
import Terms from '../pages/policy/Terms';
import PrivacyPolicy from '../pages/policy/PrivacyPolicy';
import Account from '../pages/account/Account';
import ProtectedRoute from './PrivateRoutes';
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/search' element={<Search />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<Terms />} />
        <Route path='/collection' element={<Collection />} />
        <Route path="/new" element={<Collection />} />
        <Route path="/best-sellers" element={<Collection />} />
        <Route path="/trending" element={<Collection />} />
        <Route
  path="/account"
  element={
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  }
/>
        <Route
         path="/collection/:category"
         element={<Collection />}
        />
        <Route
         path="/product/:id"
         element={<ProductDetail />}
        />
        <Route
         path="/cart"
         element={<Cart />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default AppRoutes