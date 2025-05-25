"use client"

import { useState } from "react";
import {Header, Paragraph} from "@/components/Typography";
import Card from "./card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from 'next/link';

export default function ResearcherProfile() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const handleFunded = () => {
    router.push("/fundedResearch");  // Arahkan ke halaman researcher
  };


  // Cek status login dan role pengguna
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.role !== "Researcher") {
      router.push(user?.role === "Investor" ? "/investor/profile" : "/home");
    }
  }, [isLoggedIn, user, router]);

  // Jika belum selesai memeriksa otorisasi, tampilkan loading
  if (!isLoggedIn || user?.role !== "Researcher") {
    return <div>Loading...</div>;
  }

  // Data untuk Ongoing Research
  const ongoingResearchList = [
    {
      id: 1,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
    {
      id: 2,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
    {
      id: 3,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
    {
      id: 4,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
  ];

  // Data untuk Funded Research
  const fundedResearchList = [
    {
      id: 5,
      title: "Biomarker-Based Disease Detection Using AI",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Funded Mar, 15th 2024",
      likes: 150,
    },
    {
      id: 6,
      title: "Multidisciplinary Approaches in Biotechnology",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Funded Apr, 20th 2024",
      likes: 120,
    },
    {
      id: 7,
      title: "AI-Driven Solutions for Early Disease Detection",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Funded May, 10th 2024",
      likes: 130,
    },
    {
      id: 8,
      title: "Impact of Deep Learning on Biotech Research",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Funded Jun, 5th 2024",
      likes: 140,
    },
    {
      id: 9,
      title: "Impact of Deep Learning on Biotech Research",
      description: "",
      author: "Adindashahira Asyraf",
      date: "Funded Jun, 5th 2024",
      likes: 140,
    },
  ];

  // Pilih data berdasarkan tab aktif
  const [activeTab, setActiveTab] = useState("ongoing");
  const researchList = activeTab === "ongoing" ? ongoingResearchList : fundedResearchList;

  return (
    <div className="w-screen mx-auto bg-gray-900 text-white">
      {/* Ini yang warna di atas dan pingin buat lingkaran (belum tau caranya) */}
      <div className="w-screen h-40 bg-[#A7C4EC]"></div>
      
      {/* Isi Kontennya */}
      <div className="max-w-6xl mx-auto px-10 py-6">
        {/* Bagian nama dan lokasi */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <Header className="text-2xl font-bold">Adindashahira Asyraf</Header>
            <Paragraph className="text-[#A7C4EC]">Researcher</Paragraph>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-gray-400">Bandung, Institute of Technology</span>
          </div>
        </div>

        {/* Bagian Bio */}
        <Paragraph className="text-gray-300 mb-6 text-justify">
          A biotechnology researcher with over 8 years of experience in developing early disease detection methods using biomarker-based approaches. Actively publishing in international journals and passionate about multidisciplinary collaborations that bring real-world impact to society.
        </Paragraph>

        {/* Tab Research */}
        <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`px-4 py-2 border-b-2 transition-colors duration-200 ${
            activeTab === "ongoing"
              ? "text-blue-400 border-blue-400"
              : "text-gray-400 border-transparent hover:text-blue-400 hover:border-blue-400"
          }`}
        >
          Ongoing Research
        </button>
        <button
          onClick={() => setActiveTab("funded")}
          className={`px-4 py-2 border-b-2 transition-colors duration-200 ${
            activeTab === "funded"
              ? "text-blue-400 border-blue-400"
              : "text-gray-400 border-transparent hover:text-blue-400 hover:border-blue-400"
          }`}
        >
          Funded Research
        </button>
      </div>


        {/* Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">All Research:</span>
            <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Mie gacoan level 1"
                className="w-64 px-4 py-2 bg-transparent outline-none text-white placeholder-gray-500"
              />
              <button className="px-4 py-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-[#225491] rounded-lg hover:bg-blue-700 transition">Sort by</button>
            <button className="px-4 py-2 bg-[#225491] rounded-lg hover:bg-blue-700 transition">Filter</button>
          </div>
        </div>

        {/* Daftar Penelitian */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchList.map((research) => {
            const isFunded = activeTab !== "ongoing";
            const cardElement = (
              <Card
                key={research.id}
                title={research.title}
                description={research.description}
                author={research.author}
                date={research.date}
                likes={research.likes}
              />
            );

            return isFunded ? (
              <Link href="/fundedResearch" key={research.id} className="block hover:opacity-90 transition-opacity">
                {cardElement}
              </Link>
            ) : (
              <div key={research.id}>{cardElement}</div>
            );
          })}
        </div>

      </div>


    </div>
  ) 
}