"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Header, Paragraph } from "@/components/Typography"
import { NavigationBar } from "@/components/Navbar";
import { BlueButton } from "@/components/Button";
import { navItemsUnloggedIn, navItemsLoggedIn } from "@data";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UploadResearcherPage() {
  const { isLoggedIn, user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const navItems = isLoggedIn 
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor") 
    : navItemsUnloggedIn;

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file only.');
      event.target.value = '';
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Handle file upload logic here
      console.log('Uploading file:', selectedFile.name);
      // Navigate to upload-2-research page
      router.push('/upload-2-researcher');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <NavigationBar 
        navItems={navItems} 
        current_item="Edit" 
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"}
      />
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 text-center">
        <Header>Share Your Research with the World</Header>
        <Paragraph className="font-normal text-[#A7C4EC] mt-3 mb-8">
          Showcase your breakthroughs and unlock new opportunities.
        </Paragraph>

        {/* Upload Area */}
        <div className="bg-foreground/85 text-gray-600 rounded-xl p-16 mb-8 mx-30">
          {!selectedFile ? (
            <>
              <button 
                onClick={handleFileSelect}
                className="bg-primary text-foreground font-inter font-semibold px-6 py-3 rounded-md mb-4 cursor-pointer hover:bg-[#2458a5] transition-colors"
              >
                Select documents to upload
              </button>
              <p className="text-primary font-semibold font-inter">or drag & drop</p>
            </>
          ) : (
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-gray-400 hover:text-gray-600 ml-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* File Information */}
        <p className="text-sm text-[#A7C4EC] font-inter mb-2">
          Supported file types: PDF only.
        </p>
        <p className="text-sm text-[#A7C4EC] font-inter mb-6">
          By uploading, you agree to the{' '}
          <Link href="#" className="text-sm text-[#A7C4EC] font-inter underline hover:text-foreground">
            NeuroFund Usage Terms
          </Link>
          .
        </p>

        <div className="text-sm text-[#A7C4EC] font-inter">
          You must own the rights to any content you share on NeuroFund. Learn more in our{' '}
          <Link href="#" className="text-sm text-[#A7C4EC] font-inter underline hover:text-foreground">
            Copyright Guidelines
          </Link>
          .
        </div>

        {/* Submit Button - Only show when file is selected */}
        {selectedFile && (
          <div className="mb-8">
            <BlueButton onClick={handleSubmit}>
              Submit Research
            </BlueButton>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-16 mx-35">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">
              Fast, secure, and cost-free research publishing
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">
              Global exposure to academics, innovators, and funders
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">
              Distribute your work across platforms with ease
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 border border-gray-600 mb-4 bg-[#E1E1E1]"></div>
            <p className="text-sm text-foreground/80 font-medium font-inter">
              Optimized for discoverability and impact
            </p>
          </div>
        </div>
      </main>
    </>
  );
}