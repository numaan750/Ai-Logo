"use client";
import { useEffect, useState } from "react";
const SelectShapes = ({ formData, onInputChange, onValidChange }) => {
  const [otherText, setOtherText] = useState("");
  const shapeOptions = [
    { id: "initials", label: "Initials" },
    { id: "animals", label: "Animals" },
    { id: "architecture", label: "Architecture" },
    { id: "abstract", label: "Abstract" },
    { id: "bold", label: "Bold" },
    { id: "geometric", label: "Geometric" },
    { id: "emblem", label: "Emblem" },
    { id: "other", label: "Other..." },
  ];
  useEffect(() => {
    if (formData.shape === "other") {
      onValidChange?.(otherText.trim().length > 0);
    } else {
      onValidChange?.(!!formData.shape);
    }
  }, [formData.shape, otherText]);
  return (
    <div className="animate-fadeIn">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-center mb-5 mt-5 text-white">
        Select Shapes
      </h2>
      <div className="flex flex-col gap-3 sm:gap-4 max-h-[400px] sm:max-h-[600px] max-w-[800px] mx-auto overflow-y-auto pr-2 scrollbar-hide">
        {shapeOptions.map((option) => (
          <button
            key={option.id}
            className="w-full"
            onClick={() => onInputChange("shape", option.id)}
          >
            <div
              className={`flex items-center cursor-pointer justify-between px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] rounded-full border transition-all
                ${
                  formData.shape === option.id
                    ? "border-[#9B53FF]/50 bg-gradient-to-r from-[#F53A94]/20 to-[#9B53FF]/20"
                    : "border-[#010101] bg-[#010101]"
                }`}
            >
              {option.id === "other" && formData.shape === "other" ? (
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => {
                    setOtherText(e.target.value);
                    onInputChange("shape", "other");
                  }}
                  placeholder="Please specify..."
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  className="bg-transparent outline-none text-[#F3FCFF] font-semibold tracking-wide text-[14px] sm:text-[16px] md:text-[18px] ml-[4px] sm:ml-[8px] w-full"
                />
              ) : (
                <span className="font-semibold text-[#F3FCFF] tracking-wide text-[14px] sm:text-[16px] md:text-[18px] ml-[4px] sm:ml-[8px]">
                  {option.label}
                </span>
              )}
              <div
                className={`w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] mr-[4px] sm:mr-[8px] rounded-full flex-shrink-0 ${
                  formData.shape === option.id
                    ? "bg-gradient-to-r from-[#F53A94] to-[#9B53FF]"
                    : "border border-[#F53A94]/50"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectShapes;
