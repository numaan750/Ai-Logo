"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";

const Step1Upload = ({ formData, onInputChange, onBack, onValidChange }) => {
  const [preview, setPreview] = useState(null);
  const [brandName, setBrandName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onInputChange("logoFile", file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const isValid = !!preview && brandName.trim().length > 0;
  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid]);
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-4">
        {" "}
        <IoChevronBack
          onClick={onBack}
          className="text-white text-[22px] cursor-pointer hover:opacity-70 transition"
        />
        <h2 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-white">
          Upload Image
        </h2>
      </div>

      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center justify-center w-full h-[350px] border-2 border-dashed border-[#9B53FF]/50 rounded-xl cursor-pointer bg-[#010101]"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="h-full object-contain rounded-3xl p-2"
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-gray-300 text-[14px] sm:text-[16px]">
              Start Creating
            </span>
            <span className="text-gray-500 text-[12px]">
              Turn Inspiration logo into your brand logo
            </span>
            <button
              type="button"
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 
               rounded-full bg-gradient-to-r from-[#F53A94] to-[#9B53FF] 
               text-white text-[14px] sm:text-[15px] md:text-[16px] font-medium 
               hover:opacity-90 transition"
            >
              <Image
                src="/svgs/Upload-imag.svg"
                alt="upload"
                width={18}
                height={18}
                className="sm:w-5 sm:h-5"
              />
              Upload Photo
            </button>
          </div>
        )}
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <div className="mt-4 w-full">
        <p className="text-gray-300 text-[14px] sm:text-[15px] md:text-[16px] font-semibold mb-3">
          Enter Brand Name
        </p>

        <textarea
          placeholder="Type Here......"
          value={brandName}
          onChange={(e) => {
            setBrandName(e.target.value);
            onInputChange("brandName", e.target.value);
          }}
          className="w-full rounded-2xl bg-[#010101] border-2 border-dashed border-[#9B53FF]/50 
              text-white text-[14px] sm:text-[15px] md:text-[16px]
              px-4 py-3 resize-none outline-none focus:border-[#F53A94]/50 transition"
        ></textarea>
      </div>
    </div>
  );
};

export default Step1Upload;
