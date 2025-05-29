"use client";

import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn } from "@data";
import {Header, Paragraph} from "@/components/Typography";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InvestorPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  //Cek status login dan role pengguna
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.role !== "Investor") {
      router.push(user?.role === "Researcher" ? "/researcher" : "/home");
    }
  }, [isLoggedIn, user, router]);

  // Jika belum selesai memeriksa otorisasi, tampilkan loading
  if (!isLoggedIn || user?.role !== "Investor") {
    return <div>Loading...</div>;
  }

  // Ini sementara doang
  const topics = [
    { key:1, name: "Academic", link: "/topics/academic"},
    { key:2, name: "Professional", link: "/topics/academic"},
    { key:3, name: "Culture", link: "/topics/academic"},
    { key:4, name: "Personal Growth", link: "/topics/academic"},
  ]

  const navItems = isLoggedIn ? navItemsLoggedIn(user?.role as "Researcher" | "Investor") : navItemsUnloggedIn;

  return(
    <div>
      {/* Bagian navbar */}
      <NavigationBar 
        navItems={navItems} 
        current_item="Home" 
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"} // Pass role dari user object
      />
      <div className="w-4xl mx-auto">
        <div className="pt-30 flex flex-col">
          {/* Bagian Atas */}
          <Header className="w-full mx-auto">Search Research. Spark Impact.</Header>
          <Paragraph className="w-full mt-5 text-[#A7C4EC]">A place to discover, publish, and power ideas that shape the future.</Paragraph>
        
          {/* Searchbar */}
          <div className="w-full mx-auto mt-10">
            <div className="flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 px-6 py-3 bg-transparent outline-none text-gray-600 placeholder-gray-400"
              />
              <button className="bg-[#225491E5] hover:bg-[#1A2A44] text-white px-6 py-3 rounded-full  transition">
                Search
              </button>
            </div>
          </div>

          {/* Bagian Topic */}
          <div className="w-full mt-10 py-6">
            <h2 className="text-2xl font-semibold">Topic</h2>
            <div className="flex justify-between align-center gap-6 mt-4">
              {topics.map((topicsterm) => (
                <div key={topicsterm.key} className="w-48 h-48 bg-[#A7C4EC] rounded-lg flex flex-col justify-end">
                  <div className="w-48 h-24 bg-gradient-to-b from-[#225491] to-[#225491] rounded-b-lg flex flex-col justify-end p-4 text-white">
                    <span className="text-lg font-medium">{topicsterm.name}</span>
                    <a href={topicsterm.link} className="text-sm opacity-80 hover:underline">
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}