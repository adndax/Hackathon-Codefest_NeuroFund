"use client";

import Link from "next/link";
import { Header, Paragraph } from "@/components/Typography"
import { NavigationBar, PannelIcon } from "@/components/Navbar";
import { navItemsUnloggedIn, navItemsLoggedIn } from "@data";
import { useAuth } from "@/context/AuthContext";

export default function UploadResearcherPage() {
  const { isLoggedIn, user } = useAuth();
  const navItems = isLoggedIn 
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor") 
    : navItemsUnloggedIn;
  return (
        <>
      <NavigationBar 
          navItems={navItems} 
          current_item="Edit" 
          login={isLoggedIn}
          role={user?.role as "Researcher" | "Investor"} // Pass role dari user object
      />
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