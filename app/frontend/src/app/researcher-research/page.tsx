"use client";

import NavbarComponent from "@/components/NavbarComponents";
import {Header, Paragraph} from "@/components/Typography";
import Card from "./card";
import { researchList } from "../../../data/data"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResearchPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  // Cek status login dan role pengguna
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.role !== "Researcher") {
      router.push(user?.role === "Investor" ? "/investor/research" : "/home");
    }
  }, [isLoggedIn, user, router]);

  // Jika belum selesai memeriksa otorisasi, tampilkan loading
  if (!isLoggedIn || user?.role !== "Researcher") {
    return <div>Loading...</div>;
  }

  interface ResearchItem {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    likes: number;
  }

  function createCard(research: ResearchItem) {
    return (
      <Card
        key={research.id}
        id={research.id}
        title={research.title}
        content={research.description}
        author={research.author}
        date={research.date}
        likes={research.likes}
      />
    )
  }

  return (
    <div>
      {/* Bagian Navbar */}
      <NavbarComponent />

      <div className="w-7xl mx-auto">
        {/* Bagian Atas */}
        <Header className="pb-20 pt-30">Explore More Research</Header>
        <div className="flex items-center justify-between px-10 pb-5">

          {/* Bagian Search */}
          <div className="flex item-center space-x-4">
            <span className="text-[#A7C4EC] content-center">All Research: </span>
            <input type="text"
              placeholder="Mie gacoan level 1" 
              className="bg-[#F5F8FAB2] rounded-md w-[462px] h-[45px] pl-2"
            />
            <button className="px-4 py-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
            
          {/* Bagian Sort dan Filter */}
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#225491] transition">
              <span>Sort by</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </button>
            <button className="px-4 py-2 rounded-lg bg-[#225491] transition">
              Filter
            </button>
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className="research-list flex flex-wrap gap-10 place-content-center ">
          {researchList.map(createCard)}
        </div>

    </div>
    </div>
    
  )
}