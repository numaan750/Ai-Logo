"use client";
import React from "react";

const AILogoLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#05010A] flex flex-col items-center justify-center">
      <div className="absolute w-72 h-72  blur-3xl rounded-full"></div>

      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .outer { animation: spin-cw 3.5s linear infinite; }
        .middle { animation: spin-ccw 2.5s linear infinite; }
        .inner { animation: spin-cw 1.8s linear infinite; }
      `}</style>

      <div className="relative flex items-center justify-center w-24 h-24">
        <svg className="absolute outer w-full h-full" viewBox="0 0 130 130">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2DAF" />
              <stop offset="100%" stopColor="#7B2FFF" />
            </linearGradient>
          </defs>
          <circle
            cx="65"
            cy="65"
            r="52"
            stroke="url(#grad1)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="260 400"
            fill="none"
          />
        </svg>
        <svg className="absolute middle w-[70%] h-[70%]" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B2FFF" />
              <stop offset="100%" stopColor="#FF2DAF" />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="url(#grad2)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="260 400"
            fill="none"
          />
        </svg>
        <svg className="absolute inner w-[45%] h-[45%]" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2DAF" />
              <stop offset="100%" stopColor="#7B2FFF" />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="url(#grad3)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="260 400"
            fill="none"
          />
        </svg>
      </div>
      <p className="mt-6 text-white text-lg font-semibold tracking-wide">
        Working On it...
      </p>
      <p className="absolute bottom-8 text-[#F3FCFF] font-semibold text-sm text-center px-6">
        Don’t close app or lock device until finished.
      </p>
    </div>
  );
};

export default AILogoLoader;
