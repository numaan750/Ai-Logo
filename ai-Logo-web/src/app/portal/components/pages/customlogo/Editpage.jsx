"use client";
import { AppContext } from "@/context/Appcontext";
import { useContext, useState } from "react";
import AILogoLoader from "../../ailogoLoadingScreen";

const Editpage = ({
  formData,
  onSave,
  openPremiumPopup,
  onEditNotesChange,
}) => {
  const [editNotes, setEditNotes] = useState("");
  const { editLogoWithPrompt } = useContext(AppContext);
  const [showLoader, setShowLoader] = useState(false);
  const generatedImage = formData?.generatedImageUrl;
  return (
    <div className="animate-fadeIn">
      {showLoader && <AILogoLoader />}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-white">
          Edit Logo
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-[350px] border-2 border-dashed border-[#9B53FF]/50 rounded-xl bg-transparent overflow-hidden">
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="generated logo"
            className="h-full object-contain p-2 rounded-3xl"
          />
        ) : (
          <span className="text-gray-500 text-[14px]">No image uploaded</span>
        )}
      </div>
      <div className="mt-4 w-full flex flex-col">
        <div className="flex flex-col gap-2">
          <label className="text-white text-[14px] sm:text-[16px] font-semibold mb-2">
            Enter What You Want to Change
          </label>
          <textarea
            placeholder="Describe changes or notes..."
            value={editNotes}
            onChange={(e) => {
              setEditNotes(e.target.value);
              onEditNotesChange?.(e.target.value);
            }}
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

export default Editpage;
