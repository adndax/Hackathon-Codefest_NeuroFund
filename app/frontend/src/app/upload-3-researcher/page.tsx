"use client";

import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn } from "@data";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UploadResearcherPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const navItems = isLoggedIn 
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor") 
    : navItemsUnloggedIn;

  const handleSeeResearch = () => {
    router.push("/researcher-profile"); // Ganti dengan rute yang sesuai untuk melihat penelitian
  };

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
        <div className="w-[264px] h-[264px] mx-auto bg-green-500/20 rounded-lg flex items-center justify-center">
          <svg className="w-[132px] h-[132px] text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-[40px] font-semibold max-w-4xl">Thank you! Your paper has been successfully uploaded.</h2>
        <button onClick={handleSeeResearch} className="bg-[#225491] hover:bg-[#2458a5] text-white px-6 py-2 rounded">
          See Your Research
        </button>
      </div>
    </div>
    </div>
    
  );
}