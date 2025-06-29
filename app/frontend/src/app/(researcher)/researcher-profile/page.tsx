"use client"

import { useState } from "react";
import {Header, Paragraph} from "@/components/Typography";
import Card from "./card"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResearcherProfile() {
  const { isLoggedIn, user, userResearch, allResearch } = useAuth();
  const router = useRouter();

  // Cek status login dan role pengguna
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.role !== "Researcher") {
      router.push(user?.role === "Investor" ? "/investor-profile" : "/");
    }
  }, [isLoggedIn, user, router]);

  // Handler untuk tombol X
  const handleClose = () => {
    router.push("/researcher");
  };

  // Jika belum selesai memeriksa otorisasi, tampilkan loading
  if (!isLoggedIn || user?.role !== "Researcher") {
    return <div>Loading...</div>;
  }

  // Filter research berdasarkan user dan status
  const ongoingResearchList = userResearch.filter(research => 
    research.status === 'ongoing' || research.status === 'published'
  );
  
  const fundedResearchList = userResearch.filter(research => 
    research.status === 'funded'
  );

  // Pilih data berdasarkan tab aktif
  const [activeTab, setActiveTab] = useState("ongoing");
  const researchList = activeTab === "ongoing" ? ongoingResearchList : fundedResearchList;
  

  return (
    <div className="min-h-screen text-white">
      {/* X Button - Fixed positioning di pojok kanan atas */}
      <button
        onClick={handleClose}
        className="fixed top-6 right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group cursor-pointer"
        aria-label="Close and return to researcher page"
      >
        <svg 
          className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Header Section dengan Background */}
      <div className="relative">
        {/* Background biru muda */}
        <div className="w-full h-40 bg-[#A7C4EC]"></div>
        
        {/* Profile Photo - Lingkaran yang overlap */}
        <div className="absolute left-55 -bottom-8">
          <div className="w-24 h-24 rounded-full bg-[#E6C798] border-4 border-white flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">
              {user?.name?.charAt(0).toUpperCase() || "R"}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-10 pt-12 pb-10">
        {/* Profile Info - Layout Horizontal */}
        <div className="flex justify-between items-start mb-6">
          {/* Kiri: Nama dan Role */}
          <div className="flex flex-col items-start">
            <Header className="text-3xl font-bold mb-1">
              {user?.name || "Researcher Name"}
            </Header>
            <Paragraph className="text-[#A7C4EC] text-lg">{user?.role}</Paragraph>
          </div>
          
          {/* Kanan: Location */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-gray-400">
              {user?.location || "Bandung, Institute of Technology"}
            </span>
          </div>
        </div>

        {/* Bio - Full Width */}
        <Paragraph className="text-gray-300 mb-8 text-justify leading-relaxed">
          {user?.bio || "A biotechnology researcher with over 8 years of experience in developing early disease detection methods using biomarker-based approaches. Actively publishing in international journals and passionate about multidisciplinary collaborations that bring real-world impact to society."}
        </Paragraph>

        {/* Tab Navigation - Left Aligned */}
        <div className="flex space-x-8 mb-6">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`pb-2 text-lg font-medium border-b-2 transition ${
              activeTab === "ongoing" 
                ? "text-[#A7C4EC] border-[#A7C4EC]" 
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            My Research ({ongoingResearchList.length})
          </button>
          <button
            onClick={() => setActiveTab("funded")}
            className={`pb-2 text-lg font-medium border-b-2 transition ${
              activeTab === "funded" 
                ? "text-[#A7C4EC] border-[#A7C4EC]" 
                : "text-gray-400 border-transparent hover:text-gray-300"
            }`}
          >
            Funded Research ({fundedResearchList.length})
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">All Research:</span>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search your research..." 
                className="bg-white text-black rounded-md w-80 h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#A7C4EC]"
              />
              <button className="ml-2 p-2 text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-6 py-2 bg-[#225491] text-white rounded-lg hover:bg-[#1e4a7f] transition font-medium">
              <span>Sort by</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </button>
            <button className="px-6 py-2 bg-[#225491] text-white rounded-lg hover:bg-[#1e4a7f] transition font-medium">
              Filter
            </button>
          </div>
        </div>

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchList.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg">
                {activeTab === "ongoing" 
                  ? "No research uploaded yet. Start uploading your research to see them here!"
                  : "No funded research yet."}
              </div>
              {activeTab === "ongoing" && (
                <div className="mt-4">
                  <button 
                    onClick={() => router.push('/upload-researcher')}
                    className="px-6 py-2 bg-[#225491] text-white rounded-lg hover:bg-[#1e4a7f] transition font-medium"
                  >
                    Upload Research
                  </button>
                </div>
              )}
            </div>
          ) : (
            researchList.map((research) => (
              <Card
                key={research.id}
                title={research.title}
                description={research.description}
                author={research.author}
                date={research.date}
                likes={research.likes}
              />
            ))
          )}
        </div>

        {/* Research Statistics */}
        {userResearch.length > 0 && (
          <div className="mt-8 bg-[#225491] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Research Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#A7C4EC]">
                  {userResearch.length}
                </div>
                <div className="text-gray-300">Total Research</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#A7C4EC]">
                  {userResearch.filter(r => r.status === 'published').length}
                </div>
                <div className="text-gray-300">Published</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#A7C4EC]">
                  {userResearch.filter(r => r.status === 'funded').length}
                </div>
                <div className="text-gray-300">Funded</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#A7C4EC]">
                  {userResearch.reduce((total, research) => total + research.likes, 0)}
                </div>
                <div className="text-gray-300">Total Likes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) 
}