"use client";
import { useEffect } from "react";

const BrandName = ({ formData, onInputChange, onValidChange }) => {
  useEffect(() => {
    onValidChange?.(!!formData.brandName?.trim());
  }, [formData.brandName]);

  return (
    <div className="animate-fadeIn h-full flex flex-col items-center justify-center">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-center mb-4 text-white">
        Enter Brand Name
      </h2>
      <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[500px]">
        <textarea
          placeholder="Type your brand name..."
          value={formData.brandName || ""}
          onChange={(e) => onInputChange("brandName", e.target.value)}
          rows={3}
          className="w-full rounded-2xl bg-[#010101] border-2 border-dashed border-[#9B53FF]/50
            text-white text-[14px] sm:text-[15px] md:text-[16px]
            px-4 py-3 resize-none outline-none focus:border-[#F53A94]/50 transition"
        />
      </div>
    </div>
  );
};

export default BrandName;