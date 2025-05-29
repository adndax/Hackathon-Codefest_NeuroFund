"use client";

import { NavigationBar } from "@/components/Navbar";
import { navItemsUnloggedIn, navItemsLoggedIn, researchList } from "@data";
import { Header, Paragraph } from "@/components/Typography";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../modal";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";


export default function ResearchDetailPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  
    // Cek status login dan role pengguna
    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/login");
      } else if (user?.role !== "Investor") {
        router.push(user?.role === "Researcher" ? "/researcher-research" : "/");
      }
    }, [isLoggedIn, user, router]);
  
    // Jika belum selesai memeriksa otorisasi, tampilkan loading
    if (!isLoggedIn || user?.role !== "Investor") {
      return <div>Loading...</div>;
    }

  const params = useParams();
  const { id } = params;
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Cari penelitian berdasarkan ID
  const research = researchList.find((item) => item.id === parseInt(id as string));

  if (!research) {
    return <div>Research not found</div>;
  }

  const handleFundClick = () => {
    setIsFundingModalOpen(true);
  };

  const handleConfirmFunding = () => {
    setIsFundingModalOpen(false);
    setIsSuccessModalOpen(true);
    // Simulasi pengiriman data ke server (bisa diganti dengan API call)
    setTimeout(() => {
      setIsSuccessModalOpen(false);
      // Kembali ke halaman daftar penelitian setelah sukses
      router.push("/investor-research");
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsFundingModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const navItems = isLoggedIn ? navItemsLoggedIn(user?.role as "Researcher" | "Investor") : navItemsUnloggedIn;

  return (
    <div className="min-h-screen text-white">
      {/* Bagian Navbar */}
      <NavigationBar 
        navItems={navItems} 
        current_item="Research" 
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"} // Pass role dari user object
      />

      <div className="max-w-6xl mx-auto py-10 px-5">
        {/* Judul Penelitian */}
        <Header className="text-4xl font-bold mb-8 pt-20 text-left">{research.title}</Header>

        {/* Garis pemisah */}
        <hr className="border-gray-600 mb-6" />

        {/* Author Info dan Action Buttons - Layout Horizontal */}
        <div className="flex items-center justify-between mb-6">
          {/* Author Info - Kiri */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#E6C798] rounded-full"></div>
            <div>
              <div className="text-white font-medium text-lg">{research.author}</div>
              <div className="text-gray-400 text-sm">{research.date}</div>
            </div>
          </div>
          
          {/* Fund Button - Tengah */}
          <button
            onClick={handleFundClick}
            className="px-8 py-3 bg-[#A7C4EC] text-[#0A1526] rounded-full hover:bg-[#95B8E0] transition font-medium text-lg"
          >
            Fund this research
          </button>

          {/* Action Buttons - Kanan */}
          <div className="flex items-center space-x-4">
            {/* Like/Dislike dengan angka */}
            <div className="flex items-center space-x-2">
              <span className="text-white text-lg font-medium">{research.likes}</span>
              <button className="p-2 rounded-full hover:bg-gray-700 transition">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 transition">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            {/* Save Button */}
            <button className="p-2 rounded-full hover:bg-gray-700 transition">
              <img src="/save.png" alt="Save" className="w-6 h-8" />
            </button>
          </div>
        </div>

        {/* Konten Dokumen - Design Sederhana */}
        <div className="bg-white text-black rounded-lg p-10 min-h-[600px]">
          <h2 className="text-2xl font-bold mb-8 text-center">Abstract</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8 text-justify">
              {research.description}
            </p>
            <p className="text-gray-700 leading-relaxed mb-8 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus arcu nec elit sollicitudin porttitor. Etiam id quam quis tortor hendrerit rhoncus. Donec vel urna neque. Aliquam pellentesque varius felis a suscipit. Sed in risus eget nisi hendrerit porta. Praesent lacinia elit eget sollicitudin aliquet.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8 text-justify">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra odio a purus. Donec lacinia nunc vel diam tempus, sit amet pulvinar magna rhoncus eget. Cras elementum pretium massa, quis porta eros consequat quis. Integer ac lorem quis nisi dignissim tempor.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8 text-justify">
              Fusce eu ligula ut dui convallis molestudas. Praesent lacinia elit eget sollicitudin aliquet. Curabitur tempus vel augue quis imperdiet. Nulla dictum nisl sit amet massa interdum, id tincidunt arcu suscipit. Sed ultricies, mauris vel bibendum consectetur, nunc nisi volutpat dolor, vel tempus magna.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8 text-justify">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec auctor blandit quam. Aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify">
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
            </p>
          </div>
        </div>
      </div>
      
      {/* Modal Konfirmasi Pendanaan */}
      <Modal
        isOpen={isFundingModalOpen}
        onClose={handleCloseModal}
        title="Confirm Your Funding"
      >
        <div className="space-y-4">
          <h3 className="font-semibold">Funding Details:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>📊 Project: {research.title}</p>
            <p>💰 Tokens: 500 ICP</p>
            <p>📅 Milestones: M1, M2</p>
            <p>⏳ Duration: 3 Months</p>
            <p>📅 Starts: 10 May 2025</p>
          </div>
          <h3 className="font-semibold">Connected Wallet:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>👤 Principal ID: abc-123...xyz</p>
            <p>💼 Wallet Address: x4a-98d...a12</p>
            <p>💸 Balance: 1820.14 ICP</p>
          </div>
          <h3 className="font-semibold">Agreement Preview:</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>🔗 <a href="#" className="text-blue-500 underline">View Agreement (PDF)</a></p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="agreement" className="mr-2" />
            <label htmlFor="agreement">I have reviewed and agree to the funding terms</label>
          </div>
          <button
            onClick={handleConfirmFunding}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={!(document.getElementById("agreement") as HTMLInputElement)?.checked}
          >
            Sign & Submit
          </button>
        </div>
      </Modal>

      {/* Modal Keberhasilan Pendanaan */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseModal}
        title=""
      >
        <div className="flex flex-col items-center space-y-4 bg-[#2A5A9B] p-6 rounded-lg">
          <svg
            className="w-16 h-16 text-green-400 border-4 border-green-400 rounded-lg p-2"
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
          <p className="text-center text-white text-xl font-semibold">Funding submitted!</p>
        </div>
      </Modal>
    </div>
  );
}