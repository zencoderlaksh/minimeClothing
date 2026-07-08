import { Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import NotFound from "../pages/notFound/NotFound";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const { isLoaded, userId, getToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      if (!userId) {
        setIsAdmin(false);
        return;
      }
      try {
        const token = await getToken();
        // Just ping the admin route, if it's 200, they are admin
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          const data = await res.json().catch(() => ({}));
          setErrorMsg(`Server returned ${res.status}. Message: ${data.message || "none"}`);
          console.error("Admin check failed:", res.status, data);
        }
      } catch (err) {
        setIsAdmin(false);
        setErrorMsg(`Network error: ${err.message}`);
        console.error("Admin check error:", err);
      }
    };
    if (isLoaded) {
      checkAdmin();
    }
  }, [isLoaded, userId, getToken]);

  if (!isLoaded || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--ink,#1a1612)] text-white">
        <p className="text-sm tracking-[0.2em] uppercase animate-pulse text-[color:var(--gold-deep,#b8960c)]">Verifying Access...</p>
      </div>
    );
  }

  if (!userId || !isAdmin) {
    return <NotFound />;
  }

  return children;
}
