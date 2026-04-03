import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { altFromSrcOrAlt } from "@/lib/altText";

const Home = ({hero, country}) => {
  return (
    <section id="home" className="bg-black text-white min-h-[90vh] flex flex-col justify-center items-center relative overflow-hidden">
      <div className="mycontainer flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="flex-1 flex flex-col gap-6 sm:gap-8 max-w-xl text-start md:text-left relative z-10 mt-5">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[50px] font-bold leading-tight">
           
           <span className="bg-gradient-to-r to-[#9B53FF] from-[#F53A94] text-transparent bg-clip-text">{hero?.subTitle}</span> {hero?.title}
            
          </h1>

          <p className="text-white text-[18px] sm:text-[24px] leading-relaxed ">
            {hero?.description}
          </p>

          <div className="flex justify-start md:justify-start">
            <a
              href="https://apps.apple.com/us/app/ai-logo-maker-design-studio/id6747566522"
              target="blank"
            >
              <button className="inline-flex cursor-pointer items-center justify-center gap-1.5 bg-gradient-to-r to-[#9B53FF] from-[#F53A94]  text-white font-medium px-5 sm:px-6 py-3 rounded-full  w-fit">
                <div className=" text-[#AABFFF]">
                  <Image 
                    src="/home-images/generate-icon.svg"
                    alt="apple"
                    width={18}
                    height={18}
                  />
                </div>
                <span className="text-[14px] sm:text-[16px]">
                  {hero?.buttonText}
                </span>
              </button>
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center max-sm:min-h-[350px] md:justify-end relative z-10">
          <Image
            src={hero?.image}
            alt={altFromSrcOrAlt({ alt: hero?.alt, src: hero?.image, locale: country })}
            width={500}
            height={500}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 500px"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
