"use client";

import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn } from "@data";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useRef } from "react";

export default function UploadResearcherPage3() {
  const router = useRouter();
  const { isLoggedIn, user, uploadData, addResearch, setUploadData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasSubmitted = useRef(false);
  const hasCheckedData = useRef(false);
  
  const navItems = isLoggedIn 
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor") 
    : navItemsUnloggedIn;

  // Simplified data check and submission
  useEffect(() => {
    const handleDataAndSubmission = async () => {
      // Prevent multiple executions
      if (hasCheckedData.current) return;
      hasCheckedData.current = true;

      console.log("Checking upload data:", uploadData);

      // Check if data is complete
      if (!uploadData || !uploadData.file || !uploadData.title || !uploadData.topic || !uploadData.description) {
        console.log("Upload data incomplete, redirecting...");
        router.push("/upload-researcher");
        return;
      }

      // Prevent multiple submissions
      if (hasSubmitted.current || isSubmitting || isSuccess) {
        console.log("Already submitted or submitting, skipping...");
        return;
      }

      // Start submission
      console.log("Starting submission...");
      hasSubmitted.current = true;
      setIsSubmitting(true);
      
      try {
        // Simulate some processing time (remove this in production)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate unique ID for research
        const researchId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        
        // Create new research object
        const newResearch = {
          id: researchId,
          title: uploadData.title,
          topic: uploadData.topic,
          description: uploadData.description,
          status: 'published' as const,
          file: uploadData.file,
          author: user?.name || 'Anonymous',
          date: new Date().toISOString().split('T')[0],
          likes: 0
        };

        console.log("Adding research:", newResearch);
        
        // Add research to context
        addResearch(newResearch);

        // Clear upload data
        setUploadData(null);
        
        // Mark as success
        setIsSubmitting(false);
        setIsSuccess(true);
        
        console.log("Research added successfully!");
        
      } catch (error) {
        console.error("Error uploading research:", error);
        setError("Failed to upload research. Please try again.");
        setIsSubmitting(false);
        hasSubmitted.current = false; // Allow retry
      }
    };

    handleDataAndSubmission();
  }, [uploadData, addResearch, setUploadData, user, router, isSubmitting, isSuccess]);

  const handleSeeResearch = () => {
    setTimeout(() => {
      router.push("/researcher-profile");
      setUploadData(null); // aman setelah berpindah
    }, 100);
  };

  const handleBackToResearcher = () => {
    router.push("/researcher");
  };

  const handleRetry = () => {
    setError(null);
    hasSubmitted.current = false;
    hasCheckedData.current = false;
    setIsSubmitting(false);
  };

  // Error state
  if (error) {
    return (
      <div>
        <NavigationBar 
          navItems={navItems} 
          current_item="Edit" 
          login={isLoggedIn}
          role={user?.role as "Researcher" | "Investor"}
        />
        <div className="min-h-screen text-white flex flex-col items-center justify-center">
          <div className="text-center space-y-6 py-10 max-w-2xl">
            <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Upload Failed</h2>
            <p className="text-gray-400">{error}</p>
            <div className="flex gap-4 justify-center pt-4">
              <button 
                onClick={handleRetry}
                className="bg-[#225491] hover:bg-[#2458a5] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
              <button 
                onClick={handleBackToResearcher}
                className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isSubmitting) {
    return (
      <div>
        <NavigationBar 
          navItems={navItems} 
          current_item="Edit" 
          login={isLoggedIn}
          role={user?.role as "Researcher" | "Investor"}
        />
        <div className="min-h-screen text-white flex flex-col items-center justify-center">
          <div className="text-center space-y-6 py-10">
            <div className="w-16 h-16 mx-auto">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            </div>
            <h2 className="text-2xl font-semibold">Uploading your research...</h2>
            <p className="text-gray-400">Please wait while we process your submission.</p>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div>
        <NavigationBar 
          navItems={navItems} 
          current_item="Edit" 
          login={isLoggedIn}
          role={user?.role as "Researcher" | "Investor"}
        />
        <div className="min-h-screen text-white flex flex-col items-center justify-center">
          <div className="text-center space-y-6 py-10 max-w-2xl">
            <div className="w-[264px] h-[264px] mx-auto bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg 
                className="w-[132px] h-[132px] text-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h2 className="text-[40px] font-semibold leading-tight">
              Thank you! Your paper has been successfully uploaded.
            </h2>
            
            <p className="text-gray-400 text-lg">
              Your research is now available for the community to discover and engage with.
            </p>
            
            <div className="flex gap-4 justify-center pt-4">
              <button 
                onClick={handleSeeResearch} 
                className="bg-[#225491] hover:bg-[#2458a5] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                See Your Research
              </button>
              
              <button 
                onClick={handleBackToResearcher} 
                className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default loading (shouldn't reach here normally)
  return (
    <div>
      <NavigationBar 
        navItems={navItems} 
        current_item="Edit" 
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"}
      />
      <div className="min-h-screen text-white flex flex-col items-center justify-center">
        <div className="text-center space-y-6 py-10">
          <div className="w-16 h-16 mx-auto">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
          </div>
          <h2 className="text-2xl font-semibold">Loading...</h2>
          <p className="text-gray-400">Preparing your upload...</p>
        </div>
      </div>
    </div>
  );
}