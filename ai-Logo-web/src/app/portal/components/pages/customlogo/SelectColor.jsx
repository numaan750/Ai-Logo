"use client";
import { useEffect } from "react";

const selectedColors = [
  {
    id: "surprise",
    label: "Surprise Me",
    img: "/portal-images/color/Surprise-Me.png",
    bg: "#111827",
  },
  {
    id: "Millennial",
    label: "Millennial Gray",
    img: "/portal-images/color/Millennial-Gray.png",
    bg: "#1a1a2e",
    activeLabel: true,
  },
  {
    id: "Forest",
    label: "Forest Hues",
    img: "/portal-images/color/Forest-Hues.png",
    bg: "#1c1409",
  },
  {
    id: "Terracotta",
    label: "Terracotta Mirage",
    img: "/portal-images/color/Terracotta-Mirage.png",
    bg: "#2d2d2d",
  },
  {
    id: "Peach",
    label: "Peach Orchard",
    img: "/portal-images/color/Peach-Orchard.png",
    bg: "#f8f4ef",
  },
  {
    id: "Urban",
    label: "Urban Slate",
    img: "/portal-images/color/Urban-Slate.png",
    bg: "#fff7ed",
  },
  {
    id: "Emerald",
    label: "Emerald Gem",
    img: "/portal-images/color/Emerald-Gem.png",
    bg: "#0d0d1a",
  },
  {
    id: "Pastel",
    label: "Pastel Breeze",
    img: "/portal-images/color/Pastel-Breeze.png",
    bg: "#f0f0f0",
  },
  {
    id: "Coastal",
    label: "Coastal Calm",
    img: "/portal-images/color/Coastal-Calm.png",
    bg: "#0a1628",
  },
  {
    id: "Sunset",
    label: "Sunset Clay",
    img: "/portal-images/color/Sunset-Clay.png",
    bg: "#f5f0e8",
  },
  {
    id: "Golden",
    label: "Golden Hour",
    img: "/portal-images/color/Golden-Hour.png",
    bg: "#f0e8ff",
  },
  {
    id: "Lavender",
    label: "Lavender Fields",
    img: "/portal-images/color/Lavender-Fields.png",
    bg: "#1a0a00",
  },
  {
    id: "Bronze",
    label: "Bronze Harmony",
    img: "/portal-images/color/Bronze-Harmony.png",
    bg: "#1a0a00",
  },
  {
    id: "Tech ",
    label: "Tech Frost",
    img: "/portal-images/color/Tech-Frost.png",
    bg: "#1a0a00",
  },
  {
    id: "Mocha",
    label: "Mocha Mood",
    img: "/portal-images/color/Mocha-Mood.png",
    bg: "#1a0a00",
  },
  {
    id: "Neon",
    label: "Neon Sunset",
    img: "/portal-images/color/Neon-Sunset.png",
    bg: "#1a0a00",
  },
  {
    id: "Fuschia",
    label: "Fuschia Blossom",
    img: "/portal-images/color/Fuschia-Blossom.png",
    bg: "#1a0a00",
  },
  {
    id: "Modern",
    label: "Modern Rustic",
    img: "/portal-images/color/Modern-Rustic.png",
    bg: "#1a0a00",
  },
  {
    id: "Aloe",
    label: "Aloe Zen",
    img: "/portal-images/color/Aloe-Zen.png",
    bg: "#1a0a00",
  },
  {
    id: "Nordic",
    label: "Nordic Minimal",
    img: "/portal-images/color/Nordic-Minimal.png",
    bg: "#1a0a00",
  },
];

const SelectColour = ({ formData = {}, onInputChange, onValidChange }) => {
  useEffect(() => {
  onValidChange?.(!!formData.colorScheme);
}, [formData.colorScheme]);

const handleSelect = (id) => {
  onInputChange?.("colorScheme", id);
};
  return (
    <div className="animate-fadeIn w-full flex flex-col items-center">
      <h2
        className="font-bold text-center text-white mb-5 mt-5"
        style={{ fontSize: "clamp(20px, 3vw, 30px)" }}
      >
        Select Color
      </h2>
      <div className="w-full max-w-[900px]">
        <div className="style-grid flex flex-wrap justify-center gap-[clamp(10px,2vw,24px)]">
          {selectedColors.map((option) => {
            const isSelected = formData.colorScheme === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="flex flex-col items-center gap-2 bg-transparent border-0 p-0 cursor-pointer w-[13%]"
              >
                <div
                  className={`transition-all duration-200 ${
                    isSelected ? "" : "scale-100 group-hover:scale-105"
                  }`}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: "22%",
                    padding: isSelected ? "3px" : "0px",
                    background: isSelected
                      ? "linear-gradient(to right, #F53A94, #9B53FF)"
                      : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20%",
                      padding: isSelected ? "6px" : "0px",
                      background: isSelected ? "#000" : "transparent",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="w-full h-full overflow-hidden"
                      style={{
                        borderRadius: "18%",
                        background: option.bg,
                      }}
                    >
                      <img
                        src={option.img}
                        alt={option.label}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <span
                  className={
                    isSelected
                      ? "bg-gradient-to-r from-[#F53A94] to-[#9B53FF] bg-clip-text text-transparent"
                      : "text-white"
                  }
                  style={{
                    fontSize: "clamp(11px, 1.1vw, 14px)",
                    fontWeight: 500,
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
       @media (max-width: 600px) {
      .style-grid button {
        width: 30% !important;
    }
  }
`}</style>
    </div>
  );
};

export default SelectColour;
