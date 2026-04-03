"use client";
import Link from "next/link";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { altFromSrcOrAlt } from "@/lib/altText";

const Footer = ({footer, country}) => {
  const pathname = usePathname();

  const title = footer?.title ?? "Ai Logo Generator";

  const privacyLabel =
    footer?.page1 ??
    footer?.links?.find((l) => /privacy|privac/i.test(l?.label ?? ""))?.label ??
    "Privacy Policy";

  const termsLabel =
    footer?.page2 ??
    footer?.links?.find((l) => /terms|condition/i.test(l?.label ?? ""))?.label ??
    "Terms & Conditions";

  const footerText = footer?.text ?? footer?.copyright ?? footer?.description;

  const handleHomeClick = (e) => {
    e.preventDefault();

    if (pathname === "/") {
      scrollToSection("home");
    } else {
      router.push("/");

      setTimeout(() => {
        scrollToSection("home");
      }, 300);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const navbarHeight = 80;
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };
  const handleFooterClick = (e, targetId) => {
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80; // same offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-[#F53A94]/20 to-[#9B53FF]/20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <Image
              src="/home-images/AI-Logo-Generator.webp"
              alt={altFromSrcOrAlt({ alt: "AI-Logo-Generator", locale: country })}
              width={48}
              height={48}
              className="rounded-xl"
            />
          </div>

          <p className="text-[24px] sm:text-[30px] md:text-[40px] font-bold">{footer?.title}</p>

          <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-[16px] sm:text-[18px]">
            {/* <a
              href="/"
              onClick={handleHomeClick}
              className="hover:text-blue-400 transition-colors"
            >
              Home
            </a> */}
            <Link
              href="/privecypolice"
              className="hover:text-blue-400 transition-colors"
            >
              {privacyLabel}
            </Link>

            <Link
              href="/conditions"
              className="hover:text-blue-400 transition-colors"
            >
              {termsLabel}
            </Link>
            <Link href="/blog" className="hover:text-blue-400 transition-colors">
              Blog
            </Link>

            {/* <a
              href="#contact"
              onClick={(e) => handleFooterClick(e, "contact")}
              className="hover:text-blue-400 transition-colors"
            >
              Contact Us
            </a> */}
          </nav>

          <p className="text-[16px] sm:text-[18px] text-gray-400 max-w-xs sm:max-w-lg">
            {footerText}
          </p>

          {/* <div className="flex items-center gap-5 sm:gap-6 mt-2">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
