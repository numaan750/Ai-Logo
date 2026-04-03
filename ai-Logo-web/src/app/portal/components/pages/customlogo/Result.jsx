"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
const Result = ({ formData, onEdit, openPremiumPopup }) => {
  const generatedImage = formData?.generatedImageUrl || null;

  const [modalMockup, setModalMockup] = useState(null);
  const [showMockupCard, setShowMockupCard] = useState(false);
  const [renderedMockupRect, setRenderedMockupRect] = useState(null);
  const mockupPreviewRef = useRef(null);
  const modalImageRef = useRef(null);

  useEffect(() => {
    if (showMockupCard && modalMockup) {
      setTimeout(recalculateMockupRect, 100);
    }
  }, [showMockupCard, modalMockup]);

  useEffect(() => {
    window.addEventListener("resize", recalculateMockupRect);
    return () => window.removeEventListener("resize", recalculateMockupRect);
  }, []);

  const logoPositions = [
    { top: "49%", left: "65%", width: "40%", opacity: 1 },
    { top: "36%", left: "63%", width: "15%", opacity: 1 },
    { top: "50%", left: "50%", width: "50%", opacity: 0.9 },
    { top: "50%", left: "51%", width: "40%", opacity: 1 },
    { top: "50%", left: "50%", width: "35%", opacity: 1 },
    { top: "62%", left: "50%", width: "50%", opacity: 1 },
    { top: "30%", left: "50%", width: "50%", opacity: 0.9 },
    { top: "45%", left: "49.7%", width: "30%", opacity: 1 },
  ];

  const recalculateMockupRect = () => {
    const container = mockupPreviewRef.current;
    const img = container?.querySelector("img");
    if (!container || !img || !img.naturalWidth) return;
    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;
    const scale = Math.min(
      containerW / img.naturalWidth,
      containerH / img.naturalHeight,
    );
    const renderedW = img.naturalWidth * scale;
    const renderedH = img.naturalHeight * scale;
    const offsetX = (containerW - renderedW) / 2;
    const offsetY = (containerH - renderedH) / 2;
    setRenderedMockupRect({ renderedW, renderedH, offsetX, offsetY });
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[14px] sm:text-[16px] md:text-[18px] font-bold text-white">
          Your Logo is here!
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
          <span className="text-gray-500 text-[14px]">No logo generated</span>
        )}
      </div>
      <div className="mt-4 w-full">
        <p className="text-gray-300 text-[14px] sm:text-[15px] md:text-[16px] font-semibold mb-3">
          Mockups
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((mockup, index) => {
            const pos = logoPositions[index];
            return (
              <div
                key={index}
                className="flex-shrink-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-[#1A1A1A] rounded-2xl overflow-hidden relative cursor-pointer hover:opacity-80 transition"
                onClick={() => {
                  setModalMockup({ index, num: mockup });
                  setShowMockupCard(true);
                }}
              >
                <img
                  src={`/mockups/mockup-${mockup}.png`}
                  alt={`mockup ${mockup}`}
                  className="w-full h-full object-contain"
                />
                {generatedImage && pos && (
                  <img
                    src={generatedImage}
                    alt="logo overlay"
                    style={{
                      position: "absolute",
                      top: pos.top,
                      left: pos.left,
                      width: pos.width,
                      opacity: pos.opacity,
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                      mixBlendMode: "multiply",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {showMockupCard &&
        modalMockup &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
            <div className="relative bg-[#1A1A1A] rounded-xl p-4 w-[90vw] max-w-[400px] flex flex-col items-center gap-4">
              <button
                onClick={() => setShowMockupCard(false)}
                className="absolute top-5 right-8 z-10 text-white bg-black rounded-full p-1 hover:opacity-80 cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div
                ref={mockupPreviewRef}
                className="relative w-full rounded-2xl overflow-hidden"
                style={{ height: "350px" }}
              >
                <img
                  ref={modalImageRef}
                  src={`/mockups/mockup-${modalMockup.num}.png`}
                  alt="mockup full"
                  className="w-full h-full object-contain"
                  onLoad={recalculateMockupRect}
                />
                {renderedMockupRect &&
                  (() => {
                    const pos = logoPositions[modalMockup.index];
                    const { renderedW, renderedH, offsetX, offsetY } =
                      renderedMockupRect;
                    const topPx =
                      offsetY + (parseFloat(pos.top) / 100) * renderedH;
                    const leftPx =
                      offsetX + (parseFloat(pos.left) / 100) * renderedW;
                    const widthPx = (parseFloat(pos.width) / 100) * renderedW;
                    return (
                      <img
                        src={generatedImage}
                        alt="logo overlay"
                        style={{
                          position: "absolute",
                          top: topPx,
                          left: leftPx,
                          width: widthPx,
                          opacity: pos.opacity,
                          transform: "translate(-50%, -50%)",
                          pointerEvents: "none",
                          mixBlendMode: "multiply",
                        }}
                      />
                    );
                  })()}
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={async () => {
                    try {
                      const mockupImg = modalImageRef.current;
                      if (!mockupImg) return;
                      const pos = logoPositions[modalMockup.index];
                      const canvas = document.createElement("canvas");
                      canvas.width = mockupImg.naturalWidth;
                      canvas.height = mockupImg.naturalHeight;
                      const ctx = canvas.getContext("2d");
                      ctx.drawImage(
                        mockupImg,
                        0,
                        0,
                        canvas.width,
                        canvas.height,
                      );
                      const logoImg = await new Promise((resolve, reject) => {
                        const img = new window.Image();
                        img.crossOrigin = "anonymous";
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                        img.src = generatedImage + "?t=" + Date.now();
                      });
                      const logoW =
                        (parseFloat(pos.width) / 100) * canvas.width;
                      const logoH =
                        logoW * (logoImg.naturalHeight / logoImg.naturalWidth);
                      const centerX =
                        (parseFloat(pos.left) / 100) * canvas.width;
                      const centerY =
                        (parseFloat(pos.top) / 100) * canvas.height;
                      ctx.globalAlpha = pos.opacity;
                      ctx.globalCompositeOperation = "multiply";
                      ctx.drawImage(
                        logoImg,
                        centerX - logoW / 2,
                        centerY - logoH / 2,
                        logoW,
                        logoH,
                      );
                      ctx.globalCompositeOperation = "source-over";
                      ctx.globalAlpha = 1;
                      const blob = await new Promise((res) =>
                        canvas.toBlob(res, "image/png"),
                      );
                      const file = new File([blob], "Ai-Logo-Mockup.png", {
                        type: "image/png",
                      });
                      if (
                        navigator.canShare &&
                        navigator.canShare({ files: [file] })
                      ) {
                        await navigator.share({
                          title: "Check out my logo!",
                          files: [file],
                        });
                      } else {
                        await navigator.clipboard.writeText(
                          URL.createObjectURL(blob),
                        );
                        alert("Link copied!");
                      }
                    } catch (err) {
                      if (err.name !== "AbortError") alert("Share failed.");
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[15px] hover:opacity-80 bg-[#010101] cursor-pointer border border-[#9B53FF]/30"
                >
                  <Image
                    src="/svgs/SHARE.svg"
                    alt="share"
                    width={14}
                    height={14}
                  />
                  Share
                </button>
                <button
                  onClick={async () => {
                    try {
                      const mockupImg = modalImageRef.current;
                      if (!mockupImg) return;
                      const pos = logoPositions[modalMockup.index];
                      const canvas = document.createElement("canvas");
                      canvas.width = mockupImg.naturalWidth;
                      canvas.height = mockupImg.naturalHeight;
                      const ctx = canvas.getContext("2d");
                      ctx.drawImage(
                        mockupImg,
                        0,
                        0,
                        canvas.width,
                        canvas.height,
                      );
                      const logoImg = await new Promise((resolve, reject) => {
                        const img = new window.Image();
                        img.crossOrigin = "anonymous";
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                        img.src = generatedImage + "?t=" + Date.now();
                      });
                      const logoW =
                        (parseFloat(pos.width) / 100) * canvas.width;
                      const logoH =
                        logoW * (logoImg.naturalHeight / logoImg.naturalWidth);
                      const centerX =
                        (parseFloat(pos.left) / 100) * canvas.width;
                      const centerY =
                        (parseFloat(pos.top) / 100) * canvas.height;
                      ctx.globalAlpha = pos.opacity;
                      ctx.globalCompositeOperation = "multiply";
                      ctx.drawImage(
                        logoImg,
                        centerX - logoW / 2,
                        centerY - logoH / 2,
                        logoW,
                        logoH,
                      );
                      ctx.globalCompositeOperation = "source-over";
                      ctx.globalAlpha = 1;
                      canvas.toBlob(async (blob) => {
                        if (!blob) {
                          alert("Download failed.");
                          return;
                        }
                        if (window.showSaveFilePicker) {
                          const fileHandle = await window.showSaveFilePicker({
                            suggestedName: "Ai-Logo-Mockup.png",
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
                          link.download = "Ai-Logo-Mockup.png";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                        }
                      }, "image/png");
                    } catch (err) {
                      alert("Download failed.");
                    }
                  }}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] hover:opacity-90 transition cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Result;
