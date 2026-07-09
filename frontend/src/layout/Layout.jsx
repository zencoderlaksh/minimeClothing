import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { useCartStore } from '../stores/useCartStore';

export default function Layout() {
  const { cart, hasMergedOnLogin, setHasMergedOnLogin, userId } = useCartStore();
  const { isLoaded, isSignedIn, getToken, userId: clerkUserId } = useAuth();
  const prevCartRef = useRef(cart);
  const isFirstMount = useRef(true);

  // 1. Initial Merge on Login
  useEffect(() => {
    const doMerge = async () => {
      if (isSignedIn && !hasMergedOnLogin) {
        try {
          const token = await getToken();
          const res = await fetch(`${import.meta.env.VITE_API_URL}/users/cart/merge`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ localCart: cart })
          });
          const data = await res.json();
          if (data.success) {
            useCartStore.setState({ cart: data.cart });
            prevCartRef.current = data.cart;
            setHasMergedOnLogin(true);
          }
        } catch (err) {
          console.error("Cart merge failed:", err);
        }
      }
    };
    doMerge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, hasMergedOnLogin]);

  // 2. Sync to Backend on subsequent local changes
  useEffect(() => {
    const doSync = async () => {
      // Skip the very first mount trigger to avoid syncing right after page load
      if (isFirstMount.current) {
        isFirstMount.current = false;
        return;
      }
      
      // Only sync if initial merge is done and cart actually changed
      if (isSignedIn && hasMergedOnLogin && prevCartRef.current !== cart) {
        try {
          const token = await getToken();
          await fetch(`${import.meta.env.VITE_API_URL}/users/cart`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ cart })
          });
          prevCartRef.current = cart;
        } catch (err) {
          console.error("Cart sync failed:", err);
        }
      }
    };
    
    // Add a tiny debounce
    const timeout = setTimeout(doSync, 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, isSignedIn, hasMergedOnLogin]);

  // 3. Robust Logout/Switch Detection
  useEffect(() => {
    if (!isLoaded) return;
    
    const currentClerkId = clerkUserId || null;

    if (userId !== currentClerkId) {
      if (userId !== null && currentClerkId === null) {
        // User logged out (or their session expired)
        useCartStore.setState({ cart: [], hasMergedOnLogin: false, userId: null });
      } else if (userId !== null && currentClerkId !== null) {
        // User switched accounts directly
        useCartStore.setState({ cart: [], hasMergedOnLogin: false, userId: currentClerkId });
      } else if (userId === null && currentClerkId !== null) {
        // Guest just logged in! 
        // We DO NOT clear the cart, because we want it to merge in useEffect #1.
        // We just claim ownership of it.
        useCartStore.setState({ userId: currentClerkId });
      }
    }
  }, [isLoaded, clerkUserId, userId]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}