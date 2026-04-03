"use client";
import { useEffect } from "react";

const styleOptions = [
  {
    id: "surprise",
    label: "Surprise Me",
    img: "/portal-images/style/Surprise-Me.png",
    bg: "#111827",
  },
  {
    id: "modern",
    label: "Modern",
    img: "/portal-images/style/Modern.png",
    bg: "#1a1a2e",
    activeLabel: true,
  },
  {
    id: "luxury",
    label: "Luxury",
    img: "/portal-images/style/Luxury.png",
    bg: "#1c1409",
  },
  {
    id: "bold",
    label: "Bold",
    img: "/portal-images/style/Bold.png",
    bg: "#2d2d2d",
  },
  {
    id: "elegant",
    label: "Elegant",
    img: "/portal-images/style/Elegant.png",
    bg: "#f8f4ef",
  },
  {
    id: "playful",
    label: "Playful",
    img: "/portal-images/style/Playful.png",
    bg: "#fff7ed",
  },
  {
    id: "futuristic",
    label: "Futuristic",
    img: "/portal-images/style/Futuristic.png",
    bg: "#0d0d1a",
  },
  {
    id: "minimalist",
    label: "Minimalist",
    img: "/portal-images/style/Minimalist.png",
    bg: "#f0f0f0",
  },
  {
    id: "3dlogo",
    label: "3D Logo",
    img: "/portal-images/style/3D-Logo.png",
    bg: "#0a1628",
  },
  {
    id: "traditional",
    label: "Traditional",
    img: "/portal-images/style/Traditional.png",
    bg: "#f5f0e8",
  },
  {
    id: "abstract",
    label: "Abstract",
    img: "/portal-images/style/Abstract.png",
    bg: "#f0e8ff",
  },
  {
    id: "iconic",
    label: "Iconic",
    img: "/portal-images/style/Iconic.png",
    bg: "#1a0a00",
  },
];

const Step6SelectStyle = ({ formData = {}, onInputChange, onValidChange }) => {
  useEffect(() => {
    onValidChange?.(!!formData.logoStyle);
  }, [formData.logoStyle]);

  const handleSelect = (id) => {
    onInputChange?.("logoStyle", id);
  };
  return (
    <div className="animate-fadeIn w-full flex flex-col items-center">
      <h2
        className="font-bold text-center text-white mb-5 mt-5"
        style={{ fontSize: "clamp(20px, 3vw, 30px)" }}
      >
        Select Style
      </h2>
      <div className="w-full" style={{ maxWidth: "900px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "clamp(10px, 2vw, 24px)",
          }}
          className="style-grid"
        >
          {styleOptions.map((option) => {
            const isSelected = formData.logoStyle === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="flex flex-col items-center gap-2 group"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                {" "}
                <div
                  className={`group-hover:scale-105 transition-all duration-200 p-[2.5px] ${
                    isSelected
                      ? "bg-gradient-to-r from-[#F53A94] to-[#9B53FF] scale-110"
                      : "bg-transparent scale-100"
                  }`}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: "22%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20%",
                      overflow: "hidden",
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
          .style-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Step6SelectStyle;
export { Step6SelectStyle };
