"use client";
import { NavigationBar } from "@/components/Navbar";
import { navItemsUnloggedIn, navItemsLoggedIn } from "../../../../data/data";
import {Header, Paragraph} from "@/components/Typography";
import Card from "./card";
import { researchList } from "../../../../data/data"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

// Pindahkan interface ke atas, di luar komponen
interface ResearchItem {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
}

export default function ResearchPage() {
  const { isLoggedIn, user } = useAuth();
  const navItems = isLoggedIn
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor")
    : navItemsUnloggedIn;
  const router = useRouter();

  // State untuk search dan sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof ResearchItem>("likes"); // Specify type
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Specify type
  const [showSortDropdown, setShowSortDropdown] = useState(false);

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

  // Opsi sorting - hanya field yang ada di ResearchItem
  const sortOptions: { value: keyof ResearchItem; label: string }[] = [
    { value: 'likes', label: 'Likes' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'date', label: 'Date' },
  ];

  // Fungsi untuk sorting dan filtering dengan useMemo untuk performance
  const sortedAndFilteredResearchList = useMemo(() => {
    // Filter berdasarkan search query
    let filtered = researchList.filter(research =>
      research.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      research.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      research.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort berdasarkan pilihan user
    return filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      // Handle different data types
      if (sortBy === 'date') {
        aValue = new Date(aValue as string);
        bValue = new Date(bValue as string);
      }
      
      if (sortBy === 'likes') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [searchQuery, sortBy, sortOrder]);

  // Handle sort change
  const handleSortChange = (newSortBy: keyof ResearchItem) => {
    if (sortBy === newSortBy) {
      // Jika sama, toggle order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Jika beda, set sort baru dengan desc default
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setShowSortDropdown(false);
  };

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
      <NavigationBar
        navItems={navItems}
        current_item="Research"
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"}
      />
      
      <div className="w-7xl mx-auto">
        {/* Bagian Atas */}
        <Header className="pb-20 pt-30">Explore More Research</Header>
        
        <div className="flex items-center justify-between px-10 pb-5">
          {/* Bagian Search */}
          <div className="flex item-center space-x-4">
            <span className="text-[#A7C4EC] content-center">All Research: </span>
            <input 
              type="text"
              placeholder="Search research..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#FFFFFF] text-black rounded-md w-[462px] h-[45px] pl-2"
            />
            <button className="px-4 py-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>

          {/* Bagian Sort dan Filter */}
          <div className="flex space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#225491] transition hover:bg-[#1a4275]"
              >
                <span>Sort by {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        {sortBy === option.value && (
                          <span className="text-xs">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="px-4 py-2 rounded-lg bg-[#225491] transition hover:bg-[#1a4275]">
              Filter
            </button>
          </div>
        </div>

        {/* Info hasil */}
        <div className="px-10 pb-3">
          <span className="text-[#A7C4EC] text-sm">
            Showing {sortedAndFilteredResearchList.length} results
            {searchQuery && ` for "${searchQuery}"`}
            • Sorted by {sortOptions.find(opt => opt.value === sortBy)?.label} 
            ({sortOrder === 'asc' ? 'ascending' : 'descending'})
          </span>
        </div>

        {/* Bagian Bawah */}
        <div className="research-list flex flex-wrap gap-10 place-content-center">
          {sortedAndFilteredResearchList.length > 0 ? (
            sortedAndFilteredResearchList.map(createCard)
          ) : (
            <div className="text-center py-12 w-full">
              <div className="text-[#A7C4EC] text-lg mb-2">No research found</div>
              <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}