"use client";
import { NavigationBar } from "@/components/Navbar";
import { Header, Paragraph } from "@/components/Typography";
import { FeaturePlaceholder } from "@/components/FeaturePlaceholder";
import { benefitsData, testimonials } from "@data";
import { navItemsUnloggedIn, navItemsLoggedIn } from "@data";
import { useAuth } from "@/context/AuthContext";

export default function Publication(){
    const { isLoggedIn, user } = useAuth();
    const navItems = isLoggedIn 
        ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor") 
        : navItemsUnloggedIn;
    return(
        <>
        {/* PAGENYA SEBENARNYA RESEARCH */}
        <NavigationBar 
            navItems={navItems} 
            current_item="Home" 
            login={isLoggedIn}
            role={user?.role as "Researcher" | "Investor"} // Pass role dari user object
        />
        <section className="py-32">
        <Header>Statistical Learning-Based 
            <br/>Analysis of Human Driver Model Parameters</Header>
            <div className="flex justify-center py-12 min-h-screen">
            <div className="w-[794px] h-[1123px] p-10 overflow-y-auto">
            {/* Header Author */}
            <div className="relative p-2 border-[#A7C4EC] border-t flex justify-between items-center text-sm text-gray-600">
  
            {/* Kiri: Avatar + Nama & Tanggal */}
            <div className="flex items-center gap-3">
                <div className="bg-[#E6C798] rounded-full w-10 h-10" />
                <div className="flex flex-col">
                <div className="font-medium text-[#F5F8FA]">Adinda Putri</div>
                <div className="text-[#A7C4EC]">26 April 2025</div>
                </div>
            </div>

            {/* Tombol Tengah */}
            <button className="absolute left-1/2 -translate-x-1/2 h-10 bg-[#A7C4EC] rounded-full px-4 py-2 font-semibold text-xs text-[#011224]">
                Fund this research
            </button>

            {/* Kanan: Stats */}
            <div className="flex gap-4 items-center">
                <span>101</span>
                <span>↑</span>
                <span>|</span>
                <span>↓</span>
                <span><img src="save.png" className="w-3 h-4"/></span>
            </div>
            </div>
            <img src="abstract.png"/>
        </div>
        </div>
        </section>
        </>
    )
}