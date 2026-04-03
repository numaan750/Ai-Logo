import { Suspense } from "react";
import AuthCallbackContent from "./AuthCallbackContent";

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A090C] gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F53A94] to-[#9B53FF] blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-white text-sm sm:text-base tracking-wide">
            Loading...
          </p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}