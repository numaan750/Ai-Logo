"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import { IoShareSocialSharp } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";

const AI_TOOLS = [
  { id: "all styles", label: "All Styles" },
  { id: "modern", label: "Modern" },
  { id: "Luxury", label: "Luxury" },
  { id: "3d logo", label: "3D Logo" },
  { id: "bold", label: "Bold" },
  { id: "elegant", label: "Elegant" },
  { id: "playful", label: "Playful" },
  { id: "futuristic", label: "Futuristic" },
  { id: "minimalist", label: "Minimalist" },
  { id: "traditional", label: "Traditional" },
  { id: "abstract", label: "Abstract" },
  { id: "iconic", label: "Iconic" },
];
export const LOGO_IMAGES = [
  // ---------- Modern (11) ----------
  {
    id: 1,
    src: "/portal-images/explore/modern/modern-1.png",
    alt: "Modern Logo 1",
    category: "modern",
  },
  {
    id: 2,
    src: "/portal-images/explore/modern/modern-2.png",
    alt: "Modern Logo 2",
    category: "modern",
  },
  {
    id: 3,
    src: "/portal-images/explore/modern/modern-3.png",
    alt: "Modern Logo 3",
    category: "modern",
  },
  {
    id: 4,
    src: "/portal-images/explore/modern/modern-4.png",
    alt: "Modern Logo 4",
    category: "modern",
  },
  {
    id: 5,
    src: "/portal-images/explore/modern/modern-5.png",
    alt: "Modern Logo 5",
    category: "modern",
  },
  {
    id: 6,
    src: "/portal-images/explore/modern/modern-6.png",
    alt: "Modern Logo 6",
    category: "modern",
  },
  {
    id: 7,
    src: "/portal-images/explore/modern/modern-7.png",
    alt: "Modern Logo 7",
    category: "modern",
  },
  {
    id: 8,
    src: "/portal-images/explore/modern/modern-8.png",
    alt: "Modern Logo 8",
    category: "modern",
  },
  {
    id: 9,
    src: "/portal-images/explore/modern/modern-9.png",
    alt: "Modern Logo 9",
    category: "modern",
  },
  {
    id: 10,
    src: "/portal-images/explore/modern/modern-10.png",
    alt: "Modern Logo 10",
    category: "modern",
  },
  {
    id: 11,
    src: "/portal-images/explore/modern/modern-11.png",
    alt: "Modern Logo 11",
    category: "modern",
  },

  // ---------- Luxury (10) ----------
  {
    id: 12,
    src: "/portal-images/explore/luxury/luxury-1.png",
    alt: "Luxury Logo 1",
    category: "Luxury",
  },
  {
    id: 13,
    src: "/portal-images/explore/luxury/luxury-2.png",
    alt: "Luxury Logo 2",
    category: "Luxury",
  },
  {
    id: 14,
    src: "/portal-images/explore/luxury/luxury-3.png",
    alt: "Luxury Logo 3",
    category: "Luxury",
  },
  {
    id: 15,
    src: "/portal-images/explore/luxury/luxury-4.png",
    alt: "Luxury Logo 4",
    category: "Luxury",
  },
  {
    id: 16,
    src: "/portal-images/explore/luxury/luxury-5.png",
    alt: "Luxury Logo 5",
    category: "Luxury",
  },
  {
    id: 17,
    src: "/portal-images/explore/luxury/luxury-6.png",
    alt: "Luxury Logo 6",
    category: "Luxury",
  },
  {
    id: 18,
    src: "/portal-images/explore/luxury/luxury-7.png",
    alt: "Luxury Logo 7",
    category: "Luxury",
  },
  {
    id: 19,
    src: "/portal-images/explore/luxury/luxury-8.png",
    alt: "Luxury Logo 8",
    category: "Luxury",
  },
  {
    id: 20,
    src: "/portal-images/explore/luxury/luxury-9.png",
    alt: "Luxury Logo 9",
    category: "Luxury",
  },
  {
    id: 21,
    src: "/portal-images/explore/luxury/luxury-10.png",
    alt: "Luxury Logo 10",
    category: "Luxury",
  },

  // ---------- 3D Logo (11) ----------
  {
    id: 22,
    src: "/portal-images/explore/3D-logo/3D-logo-1.png",
    alt: "3D Logo 1",
    category: "3d logo",
  },
  {
    id: 23,
    src: "/portal-images/explore/3D-logo/3D-logo-2.png",
    alt: "3D Logo 2",
    category: "3d logo",
  },
  {
    id: 24,
    src: "/portal-images/explore/3D-logo/3D-logo-3.png",
    alt: "3D Logo 3",
    category: "3d logo",
  },
  {
    id: 25,
    src: "/portal-images/explore/3D-logo/3D-logo-4.png",
    alt: "3D Logo 4",
    category: "3d logo",
  },
  {
    id: 26,
    src: "/portal-images/explore/3D-logo/3D-logo-5.png",
    alt: "3D Logo 5",
    category: "3d logo",
  },
  {
    id: 27,
    src: "/portal-images/explore/3D-logo/3D-logo-6.png",
    alt: "3D Logo 6",
    category: "3d logo",
  },
  {
    id: 28,
    src: "/portal-images/explore/3D-logo/3D-logo-7.png",
    alt: "3D Logo 7",
    category: "3d logo",
  },
  {
    id: 29,
    src: "/portal-images/explore/3D-logo/3D-logo-8.png",
    alt: "3D Logo 8",
    category: "3d logo",
  },
  {
    id: 30,
    src: "/portal-images/explore/3D-logo/3D-logo-9.png",
    alt: "3D Logo 9",
    category: "3d logo",
  },
  {
    id: 31,
    src: "/portal-images/explore/3D-logo/3D-logo-10.png",
    alt: "3D Logo 10",
    category: "3d logo",
  },
  {
    id: 32,
    src: "/portal-images/explore/3D-logo/3D-logo-11.png",
    alt: "3D Logo 11",
    category: "3d logo",
  },

  // ---------- Bold (9) ----------
  {
    id: 33,
    src: "/portal-images/explore/bold/bold-1.png",
    alt: "Bold Logo 1",
    category: "bold",
  },
  {
    id: 34,
    src: "/portal-images/explore/bold/bold-2.png",
    alt: "Bold Logo 2",
    category: "bold",
  },
  {
    id: 35,
    src: "/portal-images/explore/bold/bold-3.png",
    alt: "Bold Logo 3",
    category: "bold",
  },
  {
    id: 36,
    src: "/portal-images/explore/bold/bold-4.png",
    alt: "Bold Logo 4",
    category: "bold",
  },
  {
    id: 37,
    src: "/portal-images/explore/bold/bold-5.png",
    alt: "Bold Logo 5",
    category: "bold",
  },
  {
    id: 38,
    src: "/portal-images/explore/bold/bold-6.png",
    alt: "Bold Logo 6",
    category: "bold",
  },
  {
    id: 39,
    src: "/portal-images/explore/bold/bold-7.png",
    alt: "Bold Logo 7",
    category: "bold",
  },
  {
    id: 40,
    src: "/portal-images/explore/bold/bold-8.png",
    alt: "Bold Logo 8",
    category: "bold",
  },
  {
    id: 41,
    src: "/portal-images/explore/bold/bold-9.png",
    alt: "Bold Logo 9",
    category: "bold",
  },

  // ---------- Elegant (10) ----------
  {
    id: 42,
    src: "/portal-images/explore/elegant/elegant-1.png",
    alt: "Elegant Logo 1",
    category: "elegant",
  },
  {
    id: 43,
    src: "/portal-images/explore/elegant/elegant-2.png",
    alt: "Elegant Logo 2",
    category: "elegant",
  },
  {
    id: 44,
    src: "/portal-images/explore/elegant/elegant-3.png",
    alt: "Elegant Logo 3",
    category: "elegant",
  },
  {
    id: 45,
    src: "/portal-images/explore/elegant/elegant-4.png",
    alt: "Elegant Logo 4",
    category: "elegant",
  },
  {
    id: 46,
    src: "/portal-images/explore/elegant/elegant-5.png",
    alt: "Elegant Logo 5",
    category: "elegant",
  },
  {
    id: 47,
    src: "/portal-images/explore/elegant/elegant-6.png",
    alt: "Elegant Logo 6",
    category: "elegant",
  },
  {
    id: 48,
    src: "/portal-images/explore/elegant/elegant-7.png",
    alt: "Elegant Logo 7",
    category: "elegant",
  },
  {
    id: 49,
    src: "/portal-images/explore/elegant/elegant-8.png",
    alt: "Elegant Logo 8",
    category: "elegant",
  },
  {
    id: 50,
    src: "/portal-images/explore/elegant/elegant-9.png",
    alt: "Elegant Logo 9",
    category: "elegant",
  },
  {
    id: 51,
    src: "/portal-images/explore/elegant/elegant-10.png",
    alt: "Elegant Logo 10",
    category: "elegant",
  },

  // ---------- Playful (11) ----------
  {
    id: 52,
    src: "/portal-images/explore/playful/playful-1.png",
    alt: "Playful Logo 1",
    category: "playful",
  },
  {
    id: 53,
    src: "/portal-images/explore/playful/playful-2.png",
    alt: "Playful Logo 2",
    category: "playful",
  },
  {
    id: 54,
    src: "/portal-images/explore/playful/playful-3.png",
    alt: "Playful Logo 3",
    category: "playful",
  },
  {
    id: 55,
    src: "/portal-images/explore/playful/playful-4.png",
    alt: "Playful Logo 4",
    category: "playful",
  },
  {
    id: 56,
    src: "/portal-images/explore/playful/playful-5.png",
    alt: "Playful Logo 5",
    category: "playful",
  },
  {
    id: 57,
    src: "/portal-images/explore/playful/playful-6.png",
    alt: "Playful Logo 6",
    category: "playful",
  },
  {
    id: 58,
    src: "/portal-images/explore/playful/playful-7.png",
    alt: "Playful Logo 7",
    category: "playful",
  },
  {
    id: 59,
    src: "/portal-images/explore/playful/playful-8.png",
    alt: "Playful Logo 8",
    category: "playful",
  },
  {
    id: 60,
    src: "/portal-images/explore/playful/playful-9.png",
    alt: "Playful Logo 9",
    category: "playful",
  },
  {
    id: 61,
    src: "/portal-images/explore/playful/playful-10.png",
    alt: "Playful Logo 10",
    category: "playful",
  },
  {
    id: 62,
    src: "/portal-images/explore/playful/playful-11.png",
    alt: "Playful Logo 11",
    category: "playful",
  },

  // ---------- Futuristic (8) ----------
  {
    id: 63,
    src: "/portal-images/explore/futuristic/futuristic-1.png",
    alt: "Futuristic Logo 1",
    category: "futuristic",
  },
  {
    id: 64,
    src: "/portal-images/explore/futuristic/futuristic-2.png",
    alt: "Futuristic Logo 2",
    category: "futuristic",
  },
  {
    id: 65,
    src: "/portal-images/explore/futuristic/futuristic-3.png",
    alt: "Futuristic Logo 3",
    category: "futuristic",
  },
  {
    id: 66,
    src: "/portal-images/explore/futuristic/futuristic-4.png",
    alt: "Futuristic Logo 4",
    category: "futuristic",
  },
  {
    id: 67,
    src: "/portal-images/explore/futuristic/futuristic-5.png",
    alt: "Futuristic Logo 5",
    category: "futuristic",
  },
  {
    id: 68,
    src: "/portal-images/explore/futuristic/futuristic-6.png",
    alt: "Futuristic Logo 6",
    category: "futuristic",
  },
  {
    id: 69,
    src: "/portal-images/explore/futuristic/futuristic-7.png",
    alt: "Futuristic Logo 7",
    category: "futuristic",
  },
  {
    id: 70,
    src: "/portal-images/explore/futuristic/futuristic-8.png",
    alt: "Futuristic Logo 8",
    category: "futuristic",
  },

  // ---------- Minimalist (11) ----------
  {
    id: 71,
    src: "/portal-images/explore/minimalist/minimalist-1.png",
    alt: "Minimalist Logo 1",
    category: "minimalist",
  },
  {
    id: 72,
    src: "/portal-images/explore/minimalist/minimalist-2.png",
    alt: "Minimalist Logo 2",
    category: "minimalist",
  },
  {
    id: 73,
    src: "/portal-images/explore/minimalist/minimalist-3.png",
    alt: "Minimalist Logo 3",
    category: "minimalist",
  },
  {
    id: 74,
    src: "/portal-images/explore/minimalist/minimalist-4.png",
    alt: "Minimalist Logo 4",
    category: "minimalist",
  },
  {
    id: 75,
    src: "/portal-images/explore/minimalist/minimalist-5.png",
    alt: "Minimalist Logo 5",
    category: "minimalist",
  },
  {
    id: 76,
    src: "/portal-images/explore/minimalist/minimalist-6.png",
    alt: "Minimalist Logo 6",
    category: "minimalist",
  },
  {
    id: 77,
    src: "/portal-images/explore/minimalist/minimalist-7.png",
    alt: "Minimalist Logo 7",
    category: "minimalist",
  },
  {
    id: 78,
    src: "/portal-images/explore/minimalist/minimalist-8.png",
    alt: "Minimalist Logo 8",
    category: "minimalist",
  },
  {
    id: 79,
    src: "/portal-images/explore/minimalist/minimalist-9.png",
    alt: "Minimalist Logo 9",
    category: "minimalist",
  },
  {
    id: 80,
    src: "/portal-images/explore/minimalist/minimalist-10.png",
    alt: "Minimalist Logo 10",
    category: "minimalist",
  },
  {
    id: 81,
    src: "/portal-images/explore/minimalist/minimalist-11.png",
    alt: "Minimalist Logo 11",
    category: "minimalist",
  },

  // ---------- Traditional (9) ----------
  {
    id: 82,
    src: "/portal-images/explore/traditional/traditional-1.png",
    alt: "Traditional Logo 1",
    category: "traditional",
  },
  {
    id: 83,
    src: "/portal-images/explore/traditional/traditional-2.png",
    alt: "Traditional Logo 2",
    category: "traditional",
  },
  {
    id: 84,
    src: "/portal-images/explore/traditional/traditional-3.png",
    alt: "Traditional Logo 3",
    category: "traditional",
  },
  {
    id: 85,
    src: "/portal-images/explore/traditional/traditional-4.png",
    alt: "Traditional Logo 4",
    category: "traditional",
  },
  {
    id: 86,
    src: "/portal-images/explore/traditional/traditional-5.png",
    alt: "Traditional Logo 5",
    category: "traditional",
  },
  {
    id: 87,
    src: "/portal-images/explore/traditional/traditional-6.png",
    alt: "Traditional Logo 6",
    category: "traditional",
  },
  {
    id: 88,
    src: "/portal-images/explore/traditional/traditional-7.png",
    alt: "Traditional Logo 7",
    category: "traditional",
  },
  {
    id: 89,
    src: "/portal-images/explore/traditional/traditional-8.png",
    alt: "Traditional Logo 8",
    category: "traditional",
  },
  {
    id: 90,
    src: "/portal-images/explore/traditional/traditional-9.png",
    alt: "Traditional Logo 9",
    category: "traditional",
  },

  // ---------- Abstract (9) ----------
  {
    id: 91,
    src: "/portal-images/explore/abstract/abstract-1.png",
    alt: "Abstract Logo 1",
    category: "abstract",
  },
  {
    id: 92,
    src: "/portal-images/explore/abstract/abstract-2.png",
    alt: "Abstract Logo 2",
    category: "abstract",
  },
  {
    id: 93,
    src: "/portal-images/explore/abstract/abstract-3.png",
    alt: "Abstract Logo 3",
    category: "abstract",
  },
  {
    id: 94,
    src: "/portal-images/explore/abstract/abstract-4.png",
    alt: "Abstract Logo 4",
    category: "abstract",
  },
  {
    id: 95,
    src: "/portal-images/explore/abstract/abstract-5.png",
    alt: "Abstract Logo 5",
    category: "abstract",
  },
  {
    id: 96,
    src: "/portal-images/explore/abstract/abstract-6.png",
    alt: "Abstract Logo 6",
    category: "abstract",
  },
  {
    id: 97,
    src: "/portal-images/explore/abstract/abstract-7.png",
    alt: "Abstract Logo 7",
    category: "abstract",
  },
  {
    id: 98,
    src: "/portal-images/explore/abstract/abstract-8.png",
    alt: "Abstract Logo 8",
    category: "abstract",
  },
  {
    id: 99,
    src: "/portal-images/explore/abstract/abstract-9.png",
    alt: "Abstract Logo 9",
    category: "abstract",
  },

  // ---------- Iconic (11) ----------
  {
    id: 100,
    src: "/portal-images/explore/iconic/iconic-1.png",
    alt: "Iconic Logo 1",
    category: "iconic",
  },
  {
    id: 101,
    src: "/portal-images/explore/iconic/iconic-2.png",
    alt: "Iconic Logo 2",
    category: "iconic",
  },
  {
    id: 102,
    src: "/portal-images/explore/iconic/iconic-3.png",
    alt: "Iconic Logo 3",
    category: "iconic",
  },
  {
    id: 103,
    src: "/portal-images/explore/iconic/iconic-4.png",
    alt: "Iconic Logo 4",
    category: "iconic",
  },
  {
    id: 104,
    src: "/portal-images/explore/iconic/iconic-5.png",
    alt: "Iconic Logo 5",
    category: "iconic",
  },
  {
    id: 105,
    src: "/portal-images/explore/iconic/iconic-6.png",
    alt: "Iconic Logo 6",
    category: "iconic",
  },
  {
    id: 106,
    src: "/portal-images/explore/iconic/iconic-7.png",
    alt: "Iconic Logo 7",
    category: "iconic",
  },
  {
    id: 107,
    src: "/portal-images/explore/iconic/iconic-8.png",
    alt: "Iconic Logo 8",
    category: "iconic",
  },
  {
    id: 108,
    src: "/portal-images/explore/iconic/iconic-9.png",
    alt: "Iconic Logo 9",
    category: "iconic",
  },
  {
    id: 109,
    src: "/portal-images/explore/iconic/iconic-10.png",
    alt: "Iconic Logo 10",
    category: "iconic",
  },
  {
    id: 110,
    src: "/portal-images/explore/iconic/iconic-11.png",
    alt: "Iconic Logo 11",
    category: "iconic",
  },
];

export default function AiToolsExplore({ resetExplore, defaultCategory }) {
  const [activeTool, setActiveTool] = useState(defaultCategory || "all styles");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setActiveTool(defaultCategory || "all styles");
    setSelectedImage(null);
  }, [resetExplore, defaultCategory]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setShowResult(true);
  };

  const ResultScreen = ({ imageSrc, onClose }) => {
    const handleSave = async () => {
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
        if (err.name !== "AbortError") {
          alert("Download failed. Please try again.");
        }
      }
    };

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-white cursor-pointer">
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
          <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-[#9B53FF]/50 rounded-xl bg-transparent h-[280px] sm:h-[320px] md:h-[400px]">
            <img
              src={imageSrc}
              alt="explore result"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-3 pt-4 pb-2 px-2">
          <div className="flex w-full sm:w-[400px] gap-3">
            <button
              onClick={async () => {
                try {
                  const imageUrl = imageSrc;
                  if (navigator.share) {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const file = new File([blob], "Ai-Logo-result.jpg", {
                      type: blob.type,
                    });
                    if (
                      navigator.canShare &&
                      navigator.canShare({ files: [file] })
                    ) {
                      await navigator.share({
                        title: "Check out my edited photo!",
                        text: "Created with Ai Logo",
                        files: [file],
                      });
                    } else {
                      await navigator.share({
                        title: "Check out my edited photo!",
                        text: "Created with Ai Logo",
                        url: imageUrl,
                      });
                    }
                  } else {
                    await navigator.clipboard.writeText(imageUrl);
                    alert("Link copied to clipboard!");
                  }
                } catch (err) {
                  if (err.name !== "AbortError") {
                    alert("Share failed. Please try again.");
                  }
                }
              }}
              className="flex-1 py-2.5 sm:py-2 rounded-full bg-gradient-to-br from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
            >
              <IoShareSocialSharp /> Share
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 sm:py-2 rounded-full bg-gradient-to-br from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] sm:text-[18px] flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
            >
              <GiSaveArrow /> Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (showResult && selectedImage) {
    return (
      <ResultScreen
        imageSrc={selectedImage.src}
        onClose={() => {
          setShowResult(false);
          setSelectedImage(null);
        }}
      />
    );
  }

  const filteredImages =
    activeTool === "all styles"
      ? LOGO_IMAGES
      : LOGO_IMAGES.filter((img) => img.category === activeTool);
  return (
    <div className=" min-h-screen">
      <h2 className="text-[16px] font-semibold text-white mb-3">
        Select Style
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide w-full">
        {AI_TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex-shrink-0 px-8 py-2 cursor-pointer rounded-full text-[13px] font-semibold border transition-all duration-200 whitespace-nowrap
              ${
                isActive
                  ? "bg-gradient-to-br from-[#6A11CB]/30 to-[#DD2476]/30 text-white border-[#DD2476]/30"
                  : "bg-[#09020F] text-gray-300 border-[#09020F]"
              }`}
            >
              {tool.label}
            </button>
          );
        })}
      </div>
      <h2 className="text-[16px] font-semibold text-white mt-6 mb-3">
        Inspiration For Logos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
        {filteredImages.map((img) => {
          return (
            <div
              key={img.id}
              onClick={() => handleImageClick(img)}
              className="relative rounded-2xl overflow-hidden cursor-pointer
               aspect-square
               border-2 border-transparent hover:border-[#9B53FF] transition-all duration-200"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
