"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
const categories = [
  {
    label: "Modern",
    id: "modern",
    images: [
      "/portal-images/explore/modern/modern-1.png",
      "/portal-images/explore/modern/modern-2.png",
      "/portal-images/explore/modern/modern-3.png",
      "/portal-images/explore/modern/modern-4.png",
      "/portal-images/explore/modern/modern-5.png",
      "/portal-images/explore/modern/modern-6.png",
      "/portal-images/explore/modern/modern-7.png",
      "/portal-images/explore/modern/modern-8.png",
    ],
  },
  {
    label: "Luxury",
    id: "Luxury",
    images: [
      "/portal-images/explore/luxury/luxury-1.png",
      "/portal-images/explore/luxury/luxury-2.png",
      "/portal-images/explore/luxury/luxury-3.png",
      "/portal-images/explore/luxury/luxury-4.png",
      "/portal-images/explore/luxury/luxury-5.png",
      "/portal-images/explore/luxury/luxury-6.png",
      "/portal-images/explore/luxury/luxury-7.png",
      "/portal-images/explore/luxury/luxury-8.png",
    ],
  },
  {
    label: "Bold",
    id: "bold",
    images: [
      "/portal-images/explore/bold/bold-1.png",
      "/portal-images/explore/bold/bold-2.png",
      "/portal-images/explore/bold/bold-3.png",
      "/portal-images/explore/bold/bold-4.png",
      "/portal-images/explore/bold/bold-5.png",
      "/portal-images/explore/bold/bold-6.png",
      "/portal-images/explore/bold/bold-7.png",
      "/portal-images/explore/bold/bold-8.png",
    ],
  },
  {
    label: "Elegant",
    id: "elegant",
    images: [
      "/portal-images/explore/elegant/elegant-1.png",
      "/portal-images/explore/elegant/elegant-2.png",
      "/portal-images/explore/elegant/elegant-3.png",
      "/portal-images/explore/elegant/elegant-4.png",
      "/portal-images/explore/elegant/elegant-5.png",
      "/portal-images/explore/elegant/elegant-6.png",
      "/portal-images/explore/elegant/elegant-7.png",
      "/portal-images/explore/elegant/elegant-8.png",
    ],
  },
];

// const HomeSection = ({ onCardClick, onImageSelect, onImageClose }) => {
const HomeSection = ({ onCardClick }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSave = async (imageSrc) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      if (window.showSaveFilePicker) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: `Ai-Logo-result.jpg`,
          types: [
            {
              description: "Image",
              accept: { "image/jpeg": [".jpg", ".jpeg"] },
            },
          ],
        });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `Ai-Logo-result.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }
    } catch (err) {
      if (err.name !== "AbortError")
        alert("Download failed. Please try again.");
    }
  };
  if (selectedImage) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedImage(null);
              }}
              className="text-white cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h4 className="text-[16px] font-semibold text-white">Result</h4>
          </div>
          <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-[#9B53FF]/50 bg-transparent h-[280px] sm:h-[320px] md:h-[400px]">
            <img
              src={selectedImage}
              alt="result"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-3 pt-4 pb-2 px-2">
          <div className="flex w-full sm:w-[400px] gap-3">
            <button
              onClick={async () => {
                try {
                  if (navigator.share) {
                    const response = await fetch(selectedImage);
                    const blob = await response.blob();
                    const file = new File([blob], "Ai-Logo-result.jpg", {
                      type: blob.type,
                    });
                    if (
                      navigator.canShare &&
                      navigator.canShare({ files: [file] })
                    ) {
                      await navigator.share({
                        title: "Check out my logo!",
                        text: "Created with AI Logo Generator",
                        files: [file],
                      });
                    } else {
                      await navigator.share({
                        title: "Check out my logo!",
                        url: selectedImage,
                      });
                    }
                  } else {
                    await navigator.clipboard.writeText(selectedImage);
                    alert("Link copied to clipboard!");
                  }
                } catch (err) {
                  if (err.name !== "AbortError")
                    alert("Share failed. Please try again.");
                }
              }}
              className="flex-1 py-2.5 sm:py-2 rounded-full bg-gradient-to-br from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
            >
              <IoShareSocialSharp /> Share
            </button>
            <button
              onClick={() => handleSave(selectedImage)}
              className="flex-1 py-2.5 sm:py-2 rounded-full bg-gradient-to-br from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
            >
              <GiSaveArrow /> Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="px-4 sm:px-6 md:px-8 flex flex-col gap-8 md:gap-10 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            text: "Create Custom Logo",
            image: "/home-images/Create-Custom-Logo.webp",
            type: "create-custom-logo",
          },
          {
            text: "Logo From Logo",
            image: "/home-images/Logo-From-Logo.webp",
            type: "logo-from-logo",
          },
        ].map((feature, index) => (
          <div
            key={index}
            onClick={() => onCardClick(feature.type)}
            className="cursor-pointer relative bg-[#1a1a1a] rounded-3xl p-[1.5px] 
                   bg-gradient-to-r from-[#F53A94]/50 to-[#9B53FF]/50
                   shadow-md overflow-visible"
          >
            <div className="bg-[#1A1C29] rounded-3xl p-2 h-full">
              <div className="w-full aspect-[16/9] relative">
                <Image
                  src={feature.image}
                  alt={feature.text}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-white font-bold text-left text-[18px] ml-2">
                  {feature.text}
                </p>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#9B53FF] to-[#F53A94]">
                  <Image
                    src="/home-images/Arrow-up.svg"
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-white font-semibold text-[18px]">
                {cat.label}
              </span>
              <button
                onClick={() => onCardClick("explore", cat.id)}
                className="bg-gradient-to-r from-[#F53A94] to-[#9B53FF] text-transparent bg-clip-text text-[14px] font-medium hover:underline cursor-pointer"
              >
                See All &gt;
              </button>
            </div>
            <div className="flex gap-2 cursor-pointer overflow-x-auto scrollbar-hide">
              {cat.images.map((src, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedImage(src);
                  }}
                  className="relative aspect-square rounded-xl overflow-hidden flex-shrink-0 w-[calc(12.5vw-8px)] min-w-[80px] max-w-full cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`${cat.label} ${i + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
