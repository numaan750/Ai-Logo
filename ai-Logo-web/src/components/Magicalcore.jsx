"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { altFromSrcOrAlt } from "@/lib/altText";
// import { MdOutlineArrowOutward } from "react-icons/md";

const Magicalcore = ({ magicalCore, country }) => {
  const pathname = usePathname();

  return (
    <section
      id="features"
      className="bg-black text-white py-12 sm:py-14 md:py-16 relative overflow-hidden"
    >
      <div className="mycontainer px-4 sm:px-6 md:px-8 flex flex-col gap-8 md:gap-10 relative z-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
          <h2 className="text-[24px] sm:text-[30px] md:text-[40px] font-bold">
            {magicalCore?.title}
          </h2>
          <p className="text-[16px] sm:text-[18px] max-w-md sm:max-w-3xl text-white">
            {magicalCore?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {magicalCore?.features?.map((feature, index) => (
            <div
              key={index}
              className="relative bg-[#1a1a1a] rounded-3xl p-[1px] 
             bg-gradient-to-r from-[#F53A94]/50 to-[#9B53FF]/50
             shadow-md overflow-visible"
            >
              <div className="bg-[#1A1C29] rounded-3xl p-2 h-full">
                <a
                  href="https://apps.apple.com/us/app/ai-logo-maker-design-studio/id6747566522"
                  target="_blank"
                  className="block w-full"
                >
                  <div className="w-full aspect-[16/9] relative">
                    <Image
                      src={feature.Imge}
                      alt={feature.alt || "feature image"}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </a>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-white font-bold text-left text-[18px] ml-2">
                    {feature.text}
                  </p>

                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#9B53FF] to-[#F53A94]">
                   <Image
                      src="/home-images/Arrow-up.svg"
                      alt="apple"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Magicalcore;
