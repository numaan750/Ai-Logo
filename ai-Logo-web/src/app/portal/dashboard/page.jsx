"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import ProfileDropdown from "@/components/ProfileDropdown";
import PremiumPopup from "../components/pages/PremiumPopup";
import { Menu, X } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AppContext } from "@/context/Appcontext";
import { Toaster } from "react-hot-toast";
import HomeSection from "../components/pages/HomeSection";
import Explore from "../components/pages/Explore";
import History from "../components/pages/History";
import LogoToLogo from "../components/pages/logotologo/LogoToLogomain";
import CustomLogo from "../components/pages/customlogo/CustomLogoMain";
import AilogoLoadingScreen from "../components/ailogoLoadingScreen";

const SoulmateSidebar = () => {
  const { isPremium, premiumExpiryDate } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState("home");
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [isPremiumPopupOpen, setIsPremiumPopupOpen] = useState(false);
  const [logoStep, setLogoStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const [hasMessages, setHasMessages] = useState(false);
  const [exploreCategory, setExploreCategory] = useState(null);
  const chatSections = ["explore", "history"];
  const [homeSectionKey, setHomeSectionKey] = useState(0);

  const handleSectionChange = (section) => {
    if (chatSections.includes(activeSection) && hasMessages) {
      setPendingSection(section);
      setShowLeavePopup(true);
    } else {
      setActiveSection(section);
      setHasMessages(false);
      if (section === "home") {
        setHomeSectionKey((prev) => prev + 1);
      }
    }
  };
  const handlePremiumSection = (section) => {
    if (
      isPremium &&
      premiumExpiryDate &&
      new Date() < new Date(premiumExpiryDate)
    ) {
      handleSectionChange(section);
    } else {
      setIsPremiumPopupOpen(true);
    }
  };
  return (
    <ProtectedRoute>
      <>
        <Toaster position="top-center" />
        <div className="flex flex-col h-screen bg-black font-sans overflow-hidden">
          <nav className="mycontainer w-full pt-5 pb-5 bg-black text-white flex items-center justify-between border-b border-[#4C23714D] shadow-sm shadow-[#4C23714D] flex-shrink-0 z-50 relative">
            <div className="flex items-center gap-2">
              <Image
                src="/home-images/AI-Logo-Generator.webp"
                alt="AI-Logo-Generator.webp"
                width={36}
                height={36}
                className="rounded-xl"
              />
              <h3 className="font-semibold text-white">AI Logo Generator</h3>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => {
                  handleSectionChange("home");
                  setActiveSubTab(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer ${
                  activeSection === "home" ||
                  activeSection === "logo-from-logo" ||
                  activeSection === "create-custom-logo"
                    ? "bg-transparent bg-gradient-to-r to-[#9B53FF] from-[#F53A94] text-transparent bg-clip-text border border-[#9B53FF]/30"
                    : "text-white "
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  handleSectionChange("explore");
                  setActiveSubTab(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer ${
                  activeSection === "explore"
                    ? "bg-transparent bg-gradient-to-r to-[#9B53FF] from-[#F53A94] text-transparent bg-clip-text border border-[#9B53FF]/30"
                    : "text-white"
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => {
                  handleSectionChange("history");
                  setActiveSubTab(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer ${
                  activeSection === "history"
                    ? "bg-transparent bg-gradient-to-r to-[#9B53FF] from-[#F53A94] text-transparent bg-clip-text border border-[#9B53FF]/30"
                    : "text-white"
                }`}
              >
                History
              </button>
            </div>
            <div className="flex items-center gap-3">
              {!isPremium && (
                <button
                  onClick={() => setIsPremiumPopupOpen(true)}
                  className="hidden sm:inline-flex items-center gap-2 cursor-pointer px-3 py-2 bg-gradient-to-r from-[#F53A94] to-[#9B53FF] rounded-full text-sm font-semibold text-white shadow-lg"
                >
                  <Image
                    src="/home-images/primium-getpro-icon.svg"
                    alt="Get Pro"
                    width={16}
                    height={16}
                  />
                  <span>Get Pro</span>
                </button>
              )}
              <ProfileDropdown />
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden text-white p-1"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            {open && (
              <div className="absolute top-full left-0 w-full bg-black border-t border-[#4C23714D] shadow-sm shadow-[#4C23714D] flex flex-col p-4 gap-1 lg:hidden z-50">
                <button
                  onClick={() => {
                    handleSectionChange("home");
                    setActiveSubTab(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer ${
                    activeSection === "home" ||
                    activeSection === "logo-from-logo" ||
                    activeSection === "create-custom-logo"
                      ? "bg-transparent bg-gradient-to-r to-[#9B53FF] from-[#F53A94] text-transparent bg-clip-text border border-[#9B53FF]/30"
                      : "text-white "
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    handleSectionChange("explore");
                    setActiveSubTab(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer ${
                    activeSection === "explore"
                      ? "bg-transparent bg-gradient-to-r to-[#9B53FF] from-[#F53A94] text-transparent bg-clip-text border border-[#9B53FF]/30"
                      : "text-white"
                  }`}
                >
                  Explore
                </button>
                <button
                  onClick={() => {
                    handleSectionChange("history");
                    setActiveSubTab(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer ${
                    activeSection === "history"
                      ? "bg-transparent bg-gradient-to-r to-[#9B53FF] from-[#F53A94] text-transparent bg-clip-text border border-[#9B53FF]/30"
                      : "text-white"
                  }`}
                >
                  History
                </button>
              </div>
            )}
          </nav>
          <div className="mycontainer flex-1 bg-black flex flex-col overflow-hidden">
            <main className="flex-1 bg-[#1A1C29] text-white flex flex-col overflow-hidden rounded-tl-3xl border border-[#ABD8FC80] rounded-tr-3xl mt-4 ">
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-4 max-w-full flex-1 flex flex-col overflow-hidden">
                  <div className="sticky top-0 z-10 bg-[#1A1C29] flex items-center justify-between mb-8 border-b pb-2 border-[#ABD8FC80] px-2 py-2">
                    <h3 className="text-[20px] font-bold tracking-tight flex">
                      {activeSection === "home" && "Home"}
                      {activeSection === "explore" && "Explore"}
                      {activeSection === "history" && "History"}
                      {activeSection === "create-custom-logo" &&
                        (logoStep === 1
                          ? "Create Custom Logo"
                          : logoStep === 2
                            ? "Create Custom Logo"
                            : logoStep === 3
                              ? "Create Custom Logo"
                              : logoStep === 4
                                ? "Create Custom Logo"
                                : logoStep === 5
                                  ? "Create Custom Logo"
                                  : logoStep === 6
                                    ? "Create Custom Logo"
                                    : logoStep === 7
                                      ? "Create Custom Logo"
                                      : logoStep === 8
                                        ? "Result"
                                        : logoStep === 9
                                          ? "Edit Your Logo"
                                          : "Create Custom Logo")}
                      {activeSection === "logo-from-logo" &&
                        (logoStep === 1
                          ? "Upload Your Logo"
                          : logoStep === 2
                            ? "Result"
                            : "Edit Your Logo")}{" "}
                    </h3>
                  </div>
                  <div
                    className={`flex-1 flex flex-col ${
                      ["create-custom-logo", "logo-from-logo"].includes(
                        activeSection,
                      )
                        ? "overflow-hidden"
                        : "overflow-y-auto scrollbar-hide"
                    }`}
                  >
                    {" "}
                    {activeSection === "home" && (
                      <HomeSection
                        key={homeSectionKey}
                        handleSectionChange={handleSectionChange}
                        handlePremiumSection={handlePremiumSection}
                        setActiveSection={setActiveSection}
                        setActiveSubTab={setActiveSubTab}
                        onCardClick={(type, categoryId = null) => {
                          if (type === "explore") {
                            setExploreCategory(categoryId);
                            setActiveSection("explore");
                          } else {
                            setActiveSection(type);
                          }
                        }}
                      />
                    )}
                    {activeSection === "create-custom-logo" && (
                      <CustomLogo
                        setLogoStep={setLogoStep}
                        onBack={() => setActiveSection("home")}
                        onMessageSent={() => setHasMessages(true)}
                        openPremiumPopup={() => setIsPremiumPopupOpen(true)}
                      />
                    )}
                    {activeSection === "logo-from-logo" && (
                      <LogoToLogo
                        setLogoStep={setLogoStep}
                        onBack={() => setActiveSection("home")}
                        onMessageSent={() => setHasMessages(true)}
                        openPremiumPopup={() => setIsPremiumPopupOpen(true)}
                      />
                    )}
                    {activeSection === "history" && (
                      <History
                        openPremiumPopup={() => setIsPremiumPopupOpen(true)}
                      />
                    )}
                    {activeSection === "explore" && (
                      <Explore defaultCategory={exploreCategory} />
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
          <PremiumPopup
            isOpen={isPremiumPopupOpen}
            onClose={() => setIsPremiumPopupOpen(false)}
          />
        </div>
      </>
    </ProtectedRoute>
  );
};

export default SoulmateSidebar;
