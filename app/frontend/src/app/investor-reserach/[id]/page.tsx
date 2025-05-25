"use client";

import NavbarComponent from "@/components/NavbarComponents";
import { Header, Paragraph } from "@/components/Typography";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { researchList } from "../../../../data/data";
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
        router.push(user?.role === "Researcher" ? "/researcher/research" : "/home");
      }
    }, [isLoggedIn, user, router]);
  
    // Jika belum selesai memeriksa otorisasi, tampilkan loading
    if (!isLoggedIn || user?.role !== "Investor") {
      return <div>Loading...</div>;
    }

  const params = useParams();
  const { id } = params;
  // const router = useRouter();
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
      router.push("/investor/research");
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsFundingModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Bagian Navbar */}
      <NavbarComponent />

      <div className="max-w-4xl mx-auto py-10 px-5">
        {/* Judul Penelitian */}
        <Header className="text-3xl font-bold mb-4 pb-20 pt-30">{research.title}</Header>

        {/* Penulis dan Tanggal */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
            <span className="text-gray-400">{research.author}</span>
            <span className="text-gray-400">{research.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFundClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Fund this research
            </button>
            <div className="flex items-center space-x-1 bg-gray-500 rounded-full px-2 py-1">
              <span className="text-white text-sm">{research.likes}</span>
              <button className="p-1 rounded-full hover:bg-gray-600 transition">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-gray-600 transition transform rotate-180">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Konten Dokumen */}
        <div className="bg-white text-black p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{research.title}</h2>
          <p className="text-gray-700 leading-relaxed">{research.description}</p>
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