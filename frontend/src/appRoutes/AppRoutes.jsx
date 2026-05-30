import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import PageLoader from "../components/PageLoader";
import ProtectedRoute from "./PrivateRoutes";

const Layout = lazy(() => import("../layout/Layout"));
const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Collection = lazy(() => import("../pages/collection/Collection"));
const ProductDetail = lazy(
  () => import("../pages/productDetail/ProductDetail"),
);
const Cart = lazy(() => import("../pages/cart/Cart"));
const Wishlist = lazy(() => import("../pages/wishlist/wishlist"));
const Search = lazy(() => import("../pages/search/Search"));
const About = lazy(() => import("../pages/about/About"));
const Terms = lazy(() => import("../pages/policy/Terms"));
const PrivacyPolicy = lazy(() => import("../pages/policy/PrivacyPolicy"));
const Account = lazy(() => import("../pages/account/Account"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

const AppRoutes = () => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/new" element={<Collection />} />
          <Route path="/best-sellers" element={<Collection />} />
          <Route path="/trending" element={<Collection />} />
          <Route path="/collection/:category" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
);

export default AppRoutes;
