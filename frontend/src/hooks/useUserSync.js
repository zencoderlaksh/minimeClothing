import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/react";

export function useUserSync() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const sync = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try {
        const token = await getToken();
        if (!token) return;

        // Check if synced already in this session to prevent duplicate calls
        const syncKey = `synced_${user.id}`;
        if (sessionStorage.getItem(syncKey)) return;

        const email = user.primaryEmailAddress?.emailAddress;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const avatarUrl = user.imageUrl;
        const phoneNumber = user.unsafeMetadata?.phoneNumber || "";
        const city = user.unsafeMetadata?.city || "";

        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            avatarUrl,
            phoneNumber,
            city,
          }),
        });
        const data = await res.json();
        if (data.success) {
          sessionStorage.setItem(syncKey, "true");
          console.log("User successfully synchronized with backend DB.");
        }
      } catch (err) {
        console.error("Error syncing user with backend:", err);
      }
    };

    sync();
  }, [isLoaded, isSignedIn, user, getToken]);
}
