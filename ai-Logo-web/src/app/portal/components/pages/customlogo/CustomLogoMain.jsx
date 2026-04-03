"use client";

import { useContext, useState } from "react";

import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import BrandName from "./BrandName";
import Purpose from "./Purpose";
import SelectColor from "./SelectColor";
import SelectStyle, { Step6SelectStyle } from "./SelectStyle";
import SelectIndustry from "./SelectIndustry";
import SelectShapes from "./SelectShapes";
import TargetedAudience from "./TargetedAudience";
import Result from "./Result";
import Editpage from "./Editpage";
import { AppContext } from "@/context/Appcontext";
import AILogoLoader from "../../ailogoLoadingScreen";
// import { IoShareSocialSharp } from "react-icons/io5";
// import { GiSaveArrow } from "react-icons/gi";

const TOTAL_STEPS = 7;

const CustomLogoMain = ({
  setLogoStep,
  onBack,
  onMessageSent,
  openPremiumPopup,
}) => {
  const { generateLogo, editLogoWithPrompt, isPremium, user } =
    useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isStepValid, setIsStepValid] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [currentView, setCurrentView] = useState("form");
  const [generatedLogo, setGeneratedLogo] = useState(null);
  // const [showSharePopup, setShowSharePopup] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      setLogoStep?.(currentStep + 1);
      setIsStepValid(false);
    } else {
      if (!isPremium && (user?.logoCredits ?? 0) <= 0) {
        openPremiumPopup?.();
        return;
      }
      try {
        setShowLoader(true);

        const result = await generateLogo(formData);

        if (result.needsPremium) {
          setShowLoader(false);
          openPremiumPopup?.();
          return;
        }

        setGeneratedLogo({
          ...formData,
          generatedImageUrl: result.imageUrl,
        });

        setCurrentView("result");
        setLogoStep?.(8);
      } catch (err) {
        console.error(err);
      } finally {
        setShowLoader(false); // ✅ end me OFF
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack?.();
    } else {
      setCurrentStep((prev) => prev - 1);
      setLogoStep?.(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BrandName
            formData={formData}
            onInputChange={handleInputChange}
            onValidChange={setIsStepValid}
          />
        );
      case 2:
        return (
          <SelectIndustry
            formData={formData}
            onInputChange={handleInputChange}
            onValidChange={setIsStepValid}
          />
        );
      case 3:
        return (
          <Step6SelectStyle
            formData={formData}
            onInputChange={handleInputChange}
            onValidChange={setIsStepValid}
          />
        );
      case 4:
        return (
          <SelectColor
            formData={formData}
            onInputChange={handleInputChange}
            onValidChange={setIsStepValid}
          />
        );
      case 5:
        return (
          <TargetedAudience
            formData={formData}
            onInputChange={handleInputChange}
            onValidChange={setIsStepValid}
          />
        );
      case 6:
        return (
          <SelectShapes
            formData={formData}
            onInputChange={handleInputChange}
            onValidChange={setIsStepValid}
          />
        );
      case 7:
        return (
          <Purpose
            formData={formData}
            onInputChange={handleInputChange}
            onValidChange={setIsStepValid}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showLoader && <AILogoLoader />}
      <div className="h-full flex flex-col">
        {currentView === "form" && (
          <div className="w-full px-4 mb-6 flex-shrink-0">
            <div className="flex items-center justify-between max-w-[900px] mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-[#F3FCFF] -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-[4px] bg-gradient-to-r from-[#F53A94] to-[#9B53FF] -translate-y-1/2 z-0 transition-all duration-300"
                style={{
                  width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%`,
                }}
              />
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                const step = i + 1;
                return (
                  <div key={step} className="z-10 flex-shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-300
                  ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-[#F53A94] to-[#9B53FF]"
                      : "bg-[#F3FCFF]"
                  }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
          {currentView === "form" && renderStep()}

          {currentView === "result" && (
            <Result
              formData={generatedLogo}
              onEdit={() => setCurrentView("edit")}
              openPremiumPopup={openPremiumPopup}
            />
          )}

          {currentView === "edit" && (
            <Editpage
              formData={generatedLogo}
              onEditNotesChange={(val) =>
                setGeneratedLogo((prev) => ({ ...prev, editNotes: val }))
              }
              onBack={() => {
                setCurrentView("result");
                setLogoStep?.(8);
              }}
              onSave={(updated) => {
                setGeneratedLogo(updated);
                setCurrentView("result");
                setLogoStep?.(8);
              }}
              openPremiumPopup={openPremiumPopup}
            />
          )}
        </div>
        {currentView === "form" && (
          <div className="flex flex-col items-center flex-shrink-0 pt-4 px-2 gap-3 max-w-[400px] w-full mx-auto">
            <div className="flex gap-3 w-full">
              <button
                onClick={handleBack}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full text-white font-semibold text-[16px] bg-[#1a1a1a] border border-[#9B53FF]/30 hover:opacity-80 transition cursor-pointer"
              >
                <FaArrowLeft className="mt-1" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid || generating}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[16px] transition
              ${isStepValid && !generating ? "bg-gradient-to-r from-[#F53A94] to-[#9B53FF] cursor-pointer hover:opacity-90" : "bg-gray-600 cursor-not-allowed opacity-50"}`}
              >
                {generating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {currentStep === TOTAL_STEPS ? "Generate Logo" : "Next"}
                    <FaArrowRight className="mt-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        {currentView === "result" && (
          <div className="flex flex-col items-center flex-shrink-0 pt-4 px-2 gap-3 max-w-[400px] w-full mx-auto">
            <div className="flex gap-3 w-full">
              <button
                onClick={async () => {
                  try {
                    const imageUrl = generatedLogo?.generatedImageUrl;
                    if (!imageUrl) return;
                    if (navigator.share) {
                      const response = await fetch(imageUrl);
                      const blob = await response.blob();
                      const file = new File([blob], "Ai-Logo.png", {
                        type: blob.type,
                      });
                      if (
                        navigator.canShare &&
                        navigator.canShare({ files: [file] })
                      ) {
                        await navigator.share({
                          title: "Check out my logo!",
                          text: "Created with Ai Logo",
                          files: [file],
                        });
                      } else {
                        await navigator.share({
                          title: "Check out my logo!",
                          text: "Created with Ai Logo",
                          url: imageUrl,
                        });
                      }
                    } else {
                      await navigator.clipboard.writeText(imageUrl);
                      alert("Link copied to clipboard!");
                    }
                  } catch (err) {
                    if (err.name !== "AbortError")
                      alert("Share failed. Please try again.");
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[15px] hover:opacity-80 bg-[#010101] cursor-pointer"
              >
                <img
                  src="/svgs/SHARE.svg"
                  alt="share icon"
                  width={14}
                  height={14}
                />
                Share
              </button>
              <button
                onClick={() => {
                  setCurrentView("edit");
                  setLogoStep?.(9);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[15px] hover:opacity-80 bg-[#010101] cursor-pointer"
              >
                <img
                  src="/svgs/EDIT.svg"
                  alt="edit icon"
                  width={14}
                  height={14}
                />
                Edit
              </button>
            </div>
            <button
              onClick={async () => {
                try {
                  const imageUrl = generatedLogo?.generatedImageUrl;
                  if (!imageUrl) return;
                  const response = await fetch(imageUrl);
                  const blob = await response.blob();
                  if (window.showSaveFilePicker) {
                    const fileHandle = await window.showSaveFilePicker({
                      suggestedName: `Ai-Logo.png`,
                      types: [
                        {
                          description: "Image",
                          accept: { "image/png": [".png"] },
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
                    link.download = "Ai-Logo.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                  }
                } catch (err) {
                  if (err.name !== "AbortError")
                    alert("Download failed. Please try again.");
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] hover:opacity-90 transition cursor-pointer"
            >
              Download
            </button>
          </div>
        )}
        {currentView === "edit" && (
          <div className="flex flex-col items-center flex-shrink-0 pt-4 px-2 gap-3 max-w-[400px] w-full mx-auto">
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setCurrentView("result");
                  setLogoStep?.(8);
                }}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full text-white font-semibold text-[16px] bg-[#1a1a1a] border border-[#9B53FF]/30 hover:opacity-80 transition cursor-pointer"
              >
                <FaArrowLeft className="mt-1" /> Back
              </button>
              <button
                onClick={async () => {
                  if (!generatedLogo?.editNotes?.trim()) return;
                  if (!isPremium && (user?.logoCredits ?? 0) <= 0) {
                    openPremiumPopup?.();
                    return;
                  }
                  try {
                    setShowLoader(true);
                    const result = await editLogoWithPrompt({
                      sourceImageUrl: generatedLogo.generatedImageUrl,
                      editPrompt: generatedLogo.editNotes,
                      brandName: generatedLogo.brandName || "",
                    });
                    if (result?.needsPremium) {
                      openPremiumPopup?.();
                      return;
                    }
                    setGeneratedLogo((prev) => ({
                      ...prev,
                      generatedImageUrl: result.imageUrl,
                      editNotes: "",
                    }));
                    setTimeout(() => {
                      setCurrentView("result");
                      setLogoStep?.(8);
                    }, 50);
                  } catch (err) {
                    console.error("Edit logo error:", err);
                  } finally {
                    setShowLoader(false);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[16px] bg-gradient-to-r from-[#F53A94] to-[#9B53FF] cursor-pointer hover:opacity-90 transition"
              >
                Save Changes
                <FaArrowRight className="mt-1" />
              </button>
            </div>
          </div>
        )}

        <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
      `}</style>
      </div>
    </>
  );
};

export default CustomLogoMain;
