"use client";

import { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
const Step3Edit = ({ formData, onInputChange, onBack, onValidChange }) => {
  const preview = formData?.generatedImage || null;

  useEffect(() => {
    onValidChange?.(
      !!formData.editNotes && formData.editNotes.trim().length > 0,
    );
  }, [formData.editNotes]);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-4">
        <IoChevronBack
          onClick={onBack}
          className="text-white text-[22px] cursor-pointer hover:opacity-70 transition"
        />
        <h2 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-white">
          Edit Logo
        </h2>
      </div>
      <label className="flex flex-col items-center justify-center w-full h-[350px] border-2 border-dashed border-[#9B53FF]/50 rounded-xl bg-transparent overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="logo preview"
            className="h-full object-contain p-2 rounded-3xl"
          />
        ) : (
          <span className="text-gray-500 text-[14px]">No image uploaded</span>
        )}
      </label>
      <div className="mt-4 w-full flex flex-col">
        <div className="flex flex-col gap-2">
          <label className="text-white text-[14px] sm:text-[16px] font-semibold mb-4">
            Enter What You Want to Change
          </label>
          <textarea
            placeholder="Describe changes or notes..."
            value={formData.editNotes || ""}
            onChange={(e) => onInputChange("editNotes", e.target.value)}
            rows={3}
            className="w-full rounded-2xl bg-[#010101] border-2 border-dashed border-[#9B53FF]/50 
              text-white text-[14px] sm:text-[15px] md:text-[16px]
              px-4 py-3 resize-none outline-none focus:border-[#F53A94]/50 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Step3Edit;
