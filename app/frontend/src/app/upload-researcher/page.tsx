"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEdit, FiMessageCircle, FiBell } from "react-icons/fi";
import { Header, Paragraph } from "@/components/Typography"
import { Navbar, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, NavbarLogo, NavbarButton, PannelIcon, PannelIconMobile } from "@/components/Navbar";

export default function UploadResearcherPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Research",
      link: "/research"
    }
  ];

  return (
        <>
      {/* Menggunakan struktur Navbar yang sudah ada */}
      <Navbar>
        <NavBody>
        <NavbarLogo />
          
          {/* Menggunakan NavItems yang sudah ada */}
          <NavItems items={navItems} name=" "/>
          
          {/* Panel user dengan ikon-ikon dan avatar */}
          <div className="flex items-center gap-6">
            <PannelIcon name="Edit"/>
            <div className="flex items-center bg-white bg-opacity-10 rounded-full px-5 py-1.5">
              <div className="w-11 h-11 rounded-full bg-[#E6C798] flex items-center justify-center text-gray-800 font-medium mr-2">
              </div>
              <div className="hidden sm:block px-1">
                <div className="text-sm font-inter text-[#001124]/80 font-medium">Hi, Adinda!</div>
                <div className="text-sm font-inter text-[#001124]/80 font-bold">Researcher</div>
              </div>
            </div>
          </div>
        </NavBody>

        {/* Mobile Navbar sesuai struktur yang ada */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="block text-foreground cursor-pointer">{item.name}</span>
              </a>
            ))}
            <PannelIconMobile name="Edit"/>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 text-center">
        <Header>Share Your Research with the World</Header>
        <Paragraph className="font-normal text-[#A7C4EC] mt-3 mb-8">Showcase your breakthroughs and unlock new opportunities.</Paragraph>

        {/* Upload Area */}
        <div className="bg-foreground/85 text-gray-600 rounded-xl p-16 mb-8 mx-30">
          <button className="bg-primary text-foreground font-inter font-semibold px-6 py-3 rounded-md mb-4 cursor-pointer hover:bg-[#2458a5] transition-colors">
            Select documents to upload
          </button>
          <p className="text-primary font-semibold font-inter">or drag & drop</p>
        </div>

        {/* File Information */}
        <p className="text-sm text-[#A7C4EC] font-inter mb-2">
          Supported file types: pdf, doc, docx, ppt, xls, txt, and more.
        </p>
        <p className="text-sm text-[#A7C4EC] font-inter mb-6">
          By uploading, you agree to the{' '}
          <Link href="#" className="text-sm text-[#A7C4EC] font-inter underline hover:text-foreground">
            NeuroFund Usage Terms
          </Link>
          .
        </p>

        <div className="text-sm text-[#A7C4EC] font-inter mb-12">
          You must own the rights to any content you share on NeuroFund. Learn more in our{' '}
          <Link href="#" className="text-sm text-[#A7C4EC] font-inter underline hover:text-foreground">
            Copyright Guidelines
          </Link>
          .
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-16 mx-35">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">Fast, secure, and cost-free research publishing</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">Global exposure to academics, innovators, and funders</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">Distribute your work across platforms with ease</p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">Optimized for discoverability and impact</p>
          </div>
        </div>
      </main>
      </>
  );
}