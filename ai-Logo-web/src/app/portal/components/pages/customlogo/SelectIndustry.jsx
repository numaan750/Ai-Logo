"use client";
import { useEffect, useState } from "react";
const SelectIndustry = ({ formData, onInputChange, onValidChange }) => {
  const [otherText, setOtherText] = useState("");
  const industryOptions = [
    { id: "tech", label: "Tech" },
    { id: "hotel", label: "Hotel" },
    { id: "food", label: "Food" },
    { id: "fashion", label: "Fashion" },
    { id: "e-commerce", label: "E-Commerce" },
    { id: "education", label: "Education" },
    { id: "gaming & esports", label: "Gaming & Esports" },
    { id: "other", label: "Other..." },
  ];
  useEffect(() => {
    if (formData.industry === "other") {
      onValidChange?.(otherText.trim().length > 0);
    } else {
      onValidChange?.(!!formData.industry);
    }
  }, [formData.industry, otherText]);
  return (
    <div className="animate-fadeIn">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-center mb-4 text-white">
        Select Industry
      </h2>
      <div className="flex flex-col gap-3 sm:gap-4 max-h-[400px] sm:max-h-[600px] max-w-[800px] mx-auto overflow-y-auto pr-2 scrollbar-hide">
        {industryOptions.map((option) => (
          <button
            key={option.id}
            className="w-full"
            onClick={() => onInputChange("industry", option.id)}
          >
            <div
              className={`flex items-center cursor-pointer justify-between px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] rounded-full border transition-all
                ${
                  formData.industry === option.id
                    ? "border-[#9B53FF]/50 bg-gradient-to-r from-[#F53A94]/20 to-[#9B53FF]/20"
                    : "border-[#010101] bg-[#010101]"
                }`}
            >
              {option.id === "other" && formData.industry === "other" ? (
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => {
                    setOtherText(e.target.value);
                    onInputChange("industry", "other");
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
                  formData.industry === option.id
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

export default SelectIndustry;
