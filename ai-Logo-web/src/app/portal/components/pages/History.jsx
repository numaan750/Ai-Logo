"use client";

import Image from "next/image";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "@/context/Appcontext";
import AILogoLoader from "../ailogoLoadingScreen";
const History = ({ openPremiumPopup }) => {
  const { getLogoHistory, generateLogoFromLogo } = useContext(AppContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false); // ADD
  const [editNotes, setEditNotes] = useState(""); // ADD
  const [showLoader, setShowLoader] = useState(false); // ADD
  const [selectedItem, setSelectedItem] = useState(null);
  const { editLogoWithPrompt } = useContext(AppContext);
  const [selectedMockup, setSelectedMockup] = useState(null);
  const [modalMockup, setModalMockup] = useState(null);
  //   const [logoPositions, setLogoPositions] = useState([
  //     { top: "49%", left: "65%", width: "40%", opacity: 1 },
  //     { top: "36%", left: "63%", width: "15%", opacity: 1 },
  //     { top: "50%", left: "50%", width: "50%", opacity: 0.9 },
  //     { top: "50%", left: "51%", width: "40%", opacity: 1 },
  //     { top: "50%", left: "50%", width: "35%", opacity: 1 },
  //     { top: "62%", left: "50%", width: "50%", opacity: 1 },
  //     { top: "30%", left: "50%", width: "50%", opacity: 0.9 },
  //     { top: "45%", left: "49.7%", width: "30%", opacity: 1 },
  //   ]);
  //   const [logoPositionsLarge, setLogoPositionsLarge] = useState([
  //     { top: "49%", left: "54%", width: "10%", opacity: 1 },
  //     { top: "33%", left: "53%", width: "4%", opacity: 1 },
  //     { top: "50%", left: "50%", width: "14%", opacity: 0.9 },
  //     { top: "50%", left: "50%", width: "10%", opacity: 1 },
  //     { top: "50%", left: "50%", width: "10%", opacity: 1 },
  //     { top: "62%", left: "50%", width: "10%", opacity: 1 },
  //     { top: "30%", left: "50%", width: "15%", opacity: 0.9 },
  //     { top: "45%", left: "49.7%", width: "10%", opacity: 1 },
  //   ]);

  //   const [logoPositionsLargeSmall, setLogoPositionsLargeSmall] = useState([
  //   { top: "50%", left: "50%", width: "50%", opacity: 1 },
  //   { top: "35%", left: "50%", width: "12%", opacity: 1 },
  //   { top: "50%", left: "50%", width: "28%", opacity: 0.9 },
  //   { top: "50%", left: "50%", width: "22%", opacity: 1 },
  //   { top: "50%", left: "50%", width: "22%", opacity: 1 },
  //   { top: "60%", left: "50%", width: "24%", opacity: 1 },
  //   { top: "35%", left: "50%", width: "26%", opacity: 0.9 },
  //   { top: "45%", left: "50%", width: "20%", opacity: 1 },
  // ]);
  const [showMockupCard, setShowMockupCard] = useState(false);
  const mockupPreviewRef = useRef(null);
  const modalImageRef = useRef(null);
  const [renderedMockupRect, setRenderedMockupRect] = useState(null);

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
    const imgNaturalW = img.naturalWidth;
    const imgNaturalH = img.naturalHeight;
    const scale = Math.min(containerW / imgNaturalW, containerH / imgNaturalH);
    const renderedW = imgNaturalW * scale;
    const renderedH = imgNaturalH * scale;
    const offsetX = (containerW - renderedW) / 2;
    const offsetY = (containerH - renderedH) / 2;
    setRenderedMockupRect({ renderedW, renderedH, offsetX, offsetY });
  };
  useEffect(() => {
    window.addEventListener("resize", recalculateMockupRect);
    return () => window.removeEventListener("resize", recalculateMockupRect);
  }, [selectedMockup]);

  useEffect(() => {
    if (selectedMockup) {
      setTimeout(recalculateMockupRect, 50);
    }
  }, [selectedMockup]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getLogoHistory();
        setHistory(data || []);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  // ===== RESULT SCREEN =====
  if (selectedImage && !showEdit) {
    return (
      <div className="flex flex-col h-full">
        {showLoader && <AILogoLoader />}

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4 scrollbar-hide">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedImage(null)}
              className="text-white cursor-pointer"
            >
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
            <h4 className="text-[16px] font-semibold text-white">
              Your Logo is here!
            </h4>
          </div>
          <div
            className="relative rounded-xl overflow-hidden border-2 border-dashed border-[#9B53FF]/50 bg-transparent w-full shrink-0"
            style={{ height: "350px" }}
          >
            {" "}
            {selectedMockup ? (
              <>
                <img
                  src={`/mockups/mockup-${selectedMockup.num}.png`}
                  alt="mockup"
                  className="w-full h-full object-contain"
                  onLoad={recalculateMockupRect}
                />
                {renderedMockupRect &&
                  (() => {
                    const pos = logoPositions[selectedMockup.index];
                    const { renderedW, renderedH, offsetX, offsetY } =
                      renderedMockupRect;
                    const topPx =
                      offsetY + (parseFloat(pos.top) / 100) * renderedH;
                    const leftPx =
                      offsetX + (parseFloat(pos.left) / 100) * renderedW;
                    const widthPx = (parseFloat(pos.width) / 100) * renderedW;
                    return (
                      <img
                        src={selectedImage}
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
              </>
            ) : (
              <img
                src={selectedImage}
                alt="result"
                className="w-full h-full object-contain p-2"
              />
            )}
          </div>
          <div className="mt-2 w-full">
            <p className="text-gray-300 text-[14px] font-semibold mb-3">
              Mockups
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((mockup, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-40 bg-[#1A1A1A] rounded-2xl overflow-hidden relative cursor-pointer hover:opacity-80 transition"
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
                  {selectedImage && logoPositions[index] && (
                    <img
                      src={selectedImage}
                      alt="logo overlay"
                      style={{
                        position: "absolute",
                        top: logoPositions[index].top,
                        left: logoPositions[index].left,
                        width: logoPositions[index].width,
                        opacity: logoPositions[index].opacity,
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {showMockupCard && modalMockup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
            <div className="relative bg-[#1A1A1A] rounded-xl p-4 w-[90vw] max-w-[400px] flex flex-col items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMockupCard(false);
                }}
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
                        src={selectedImage}
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
                        img.src = selectedImage + "?t=" + Date.now();
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
                        const blobUrl = URL.createObjectURL(blob);
                        await navigator.clipboard.writeText(blobUrl);
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
                        img.src = selectedImage + "?t=" + Date.now();
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
                      console.error(err);
                      alert("Download failed.");
                    }
                  }}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] hover:opacity-90 transition cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex-shrink-0 pt-4 pb-2 px-2 flex flex-col gap-3 max-w-[400px] w-full mx-auto">
          <div className="flex gap-3 w-full">
            <button
              onClick={async () => {
                try {
                  const imageUrl = selectedImage;
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
                  if (err.name !== "AbortError") {
                    alert("Share failed. Please try again.");
                  }
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[15px] hover:opacity-80 bg-[#010101] cursor-pointer border border-[#9B53FF]/30"
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
                setShowEdit(true);
                setEditNotes("");
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold text-[15px] hover:opacity-80 bg-[#010101] cursor-pointer border border-[#9B53FF]/30"
            >
              <Image
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
                const response = await fetch(selectedImage);
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
                if (err.name !== "AbortError") {
                  alert("Download failed. Please try again.");
                }
              }
            }}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#F53A94] to-[#9B53FF] text-white font-semibold text-[15px] hover:opacity-90 transition cursor-pointer"
          >
            Download
          </button>
        </div>
      </div>
    );
  }

  // ===== EDIT SCREEN =====
  if (selectedImage && showEdit) {
    return (
      <div className="flex flex-col h-full">
        {showLoader && <AILogoLoader />}

        <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-4 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setShowEdit(false)}
              className="text-white cursor-pointer"
            >
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
            <h4 className="text-[16px] font-semibold text-white">Edit Logo</h4>
          </div>
          <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-[#9B53FF]/50 bg-transparent w-full aspect-square max-h-[350px] shrink-0 ">
            <img
              src={selectedImage}
              alt="edit preview"
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-white text-[14px] font-semibold">
              Enter What You Want to Change
            </label>
            <textarea
              placeholder="Describe changes or notes..."
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              rows={3}
              className="w-full rounded-2xl bg-[#010101] border-2 border-dashed border-[#9B53FF]/50 text-white text-[14px] px-4 py-3 resize-none outline-none focus:border-[#F53A94]/50 transition"
            />
          </div>
        </div>
        <div className="flex-shrink-0 pt-4 pb-2 px-2 max-w-[400px] w-full mx-auto">
          <button
            onClick={async () => {
              if (!editNotes.trim()) return;
              try {
                setShowLoader(true);
                const result = await editLogoWithPrompt({
                  sourceImageUrl: selectedImage,
                  editPrompt: editNotes,
                  brandName: selectedItem?.brandName || "",
                });
                if (result?.needsPremium) {
                  setShowLoader(false);
                  openPremiumPopup?.();
                  return;
                }
                if (result?.imageUrl) {
                  setSelectedImage(result.imageUrl);
                  setShowEdit(false);
                  setEditNotes("");
                }
              } catch {
              } finally {
                setShowLoader(false);
              }
            }}
            disabled={!editNotes.trim()}
            className={`w-full py-3 rounded-full text-white font-semibold text-[15px] transition
            ${
              editNotes.trim()
                ? "bg-gradient-to-r from-[#F53A94] to-[#9B53FF] cursor-pointer hover:opacity-90"
                : "bg-gray-600 cursor-not-allowed opacity-50"
            }`}
          >
            Apply Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      {showLoader && <AILogoLoader />}
      {!loading && history.length > 0 && (
        <div className="flex gap-3 mb-6">
          <p className="text-lg font-semibold">Recent Activity</p>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
          <div className="cursor-pointer">
            <Image
              src="/svgs/empty-history-imag.svg"
              alt="No Data"
              width={150}
              height={150}
            />
          </div>
          <p className="text-gray-400 text-[14px]">No Recent Logo Found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {history.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedImage(item.imageUrl);
                setSelectedItem(item);
                setShowEdit(false);
                setEditNotes("");
              }}
              className="rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-700">
                <img
                  src={item.imageUrl}
                  alt={item.brandName || "Logo"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
