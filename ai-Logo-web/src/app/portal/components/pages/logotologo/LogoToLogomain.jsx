"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import Step1Upload from "./Step1Upload";
import Step2Result from "./Step2Result";
import Step3Edit from "./Step3Edit";
import { AppContext } from "@/context/Appcontext";
import AILogoLoader from "../../ailogoLoadingScreen";
const TOTAL_STEPS = 3;

const LogoToLogo = ({
  setLogoStep,
  onBack,
  onMessageSent,
  openPremiumPopup,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isStepValid, setIsStepValid] = useState(false);
  const { generateLogoFromLogo, editLogoWithPrompt, isPremium, user } =
    useContext(AppContext);
  const [showLoader, setShowLoader] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const stepTitles = {
    1: "Upload Your Logo",
    2: "Your Generated Logo",
    3: "Edit Your Logo",
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!isPremium && (user?.logoCredits ?? 0) <= 0) {
        openPremiumPopup?.();
        return;
      }
      try {
        setShowLoader(true);
        const result = await generateLogoFromLogo(
          formData.logoFile,
          formData.brandName,
        );

        if (result?.needsPremium) {
          setShowLoader(false);
          openPremiumPopup?.();
          return;
        }
        setShowLoader(true);
        const updatedImage = result.imageUrl;
        setFormData((prev) => ({
          ...prev,
          generatedImage: updatedImage,
          editNotes: "",
        }));
        setTimeout(() => {
          setCurrentStep(2);
          setLogoStep?.(2);
          setIsStepValid(true);
        }, 50);
      } catch (err) {
      } finally {
        setShowLoader(false);
      }
    } else if (currentStep === TOTAL_STEPS) {
      if (!isPremium && (user?.logoCredits ?? 0) <= 0) {
        openPremiumPopup?.();
        return;
      }
      try {
        setShowLoader(true);
        const result = await editLogoWithPrompt({
          sourceImageUrl: formData.generatedImage,
          editPrompt: formData.editNotes,
          brandName: formData.brandName || "",
        });

        if (result?.needsPremium) {
          setShowLoader(false);
          openPremiumPopup?.();
          return;
        }
        setShowLoader(true);
        setFormData((prev) => ({ ...prev, generatedImage: result.imageUrl }));
        setCurrentStep(2);
        setLogoStep?.(2);
        setIsStepValid(true);
      } catch (err) {
      } finally {
        setShowLoader(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
      setLogoStep?.(currentStep + 1);
      setIsStepValid(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep((prev) => prev - 1);
      setLogoStep?.(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Upload
            formData={formData}
            onInputChange={handleInputChange}
            onBack={handleBack}
            onValidChange={setIsStepValid}
          />
        );
      case 2:
        return (
          <Step2Result
            formData={formData}
            onInputChange={handleInputChange}
            onBack={handleBack}
            onValidChange={setIsStepValid}
            openPremiumPopup={openPremiumPopup}
          />
        );
      case 3:
        return (
          <Step3Edit
            formData={formData}
            onInputChange={handleInputChange}
            onBack={handleBack}
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
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
          {renderStep()}
        </div>
        <div className="flex flex-col items-center flex-shrink-0 pt-4 px-2 gap-3 max-w-[400px] w-full mx-auto">
          {currentStep === 2 ? (
            <>
              <div className="flex gap-3 w-full">
                <button
                  onClick={async () => {
                    try {
                      const imageUrl = formData?.generatedImage;
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
                  <Image
                    src="/svgs/SHARE.svg"
                    alt="share icon"
                    width={14}
                    height={14}
                  />
                  Share
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(3);
                    setLogoStep?.(3);
                    setIsStepValid(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[15px] hover:opacity-80 bg-[#010101] cursor-pointer"
                >
                  <Image
                    src="/svgs/Edit.svg"
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
                    const imageUrl = formData?.generatedImage;
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
            </>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isStepValid}
              className={`w-full flex items-center justify-center py-3 rounded-full text-white font-semibold text-[16px] transition
        ${
          isStepValid
            ? "bg-gradient-to-r from-[#F53A94] to-[#9B53FF] cursor-pointer hover:opacity-90"
            : "bg-gray-600 cursor-not-allowed opacity-50"
        }`}
            >
              {currentStep === TOTAL_STEPS ? "Apply Changes" : "Generate Logo"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LogoToLogo;
