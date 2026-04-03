"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";


export default function AuthCallback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");
    const error = searchParams.get("error");
    const provider = searchParams.get("provider") || "google";

    if (window.opener) {
      if (error) {
        const messageType =
          provider === "apple" ? "APPLE_AUTH_ERROR" : "GOOGLE_AUTH_ERROR";

        window.opener.postMessage(
          {
            type: messageType,
            error: error,
          },
          window.location.origin,
        );
        window.close();
        return;
      }

      if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          const messageType =
            provider === "apple" ? "APPLE_AUTH_SUCCESS" : "GOOGLE_AUTH_SUCCESS";

          window.opener.postMessage(
            {
              type: messageType,
              token: token,
              user: user,
            },
            window.location.origin,
          );

          setTimeout(() => {
            window.close();
          }, 500);
        } catch (err) {
          const messageType =
            provider === "apple" ? "APPLE_AUTH_ERROR" : "GOOGLE_AUTH_ERROR";

          window.opener.postMessage(
            {
              type: messageType,
              error: "Invalid callback data",
            },
            window.location.origin,
          );
          window.close();
        }
      }
    } else {
      if (error) {
        window.location.href = `/login?error=${error}`;
      } else if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/dashboard";
        } catch {
          window.location.href = "/login?error=invalid_callback";
        }
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A090C] gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F53A94] to-[#9B53FF] blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>

      <p className="text-white text-sm sm:text-base tracking-wide">
        Processing authentication...
      </p>

      <p className="text-gray-400 text-xs sm:text-sm">
        This window will close automatically
      </p>
    </div>
  );
}
