"use client";

import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn } from "@data";
import { Header, Paragraph } from "@/components/Typography";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ResearcherPage() {
  const { isLoggedIn, user, setLogin, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (user?.role !== "Researcher") {
      router.push(user?.role === "Investor" ? "/investor" : "/home");
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || user?.role !== "Researcher") {
    return <div>Loading...</div>;
  }

  const topics = [
    { key: 1, name: "Academic", link: "/topics/academic" },
    { key: 2, name: "Professional", link: "/topics/professional" },
    { key: 3, name: "Culture", link: "/topics/culture" },
    { key: 4, name: "Personal Growth", link: "/topics/personal-growth" },
  ];

  const navItems = isLoggedIn
    ? navItemsLoggedIn(isLoggedIn, user?.role as "Researcher" | "Investor")
    : navItemsUnloggedIn;

  return (
    <div>
      {/* Navbar */}
      <NavigationBar
        navItems={navItems}
        current_item="Home"
        login={isLoggedIn}
        role={user?.role as "Researcher" | "Investor"}
      />

      {/* Info login & logout (positioned below navbar) */}
      <div className="w-full pt-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Logged in as{" "}
              <span className="font-semibold text-blue-600">
                {user?.name || user?.walletAddress || "Unknown User"}
              </span>{" "}
              <span className="text-gray-500">({user?.role})</span>
            </p>
            <button
              onClick={() => {
                setLogin(false);
                setUser(null);
                router.push("/login");
              }}
              className="text-sm bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Konten utama */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="pt-10 flex flex-col">
          <Header className="w-full mx-auto">
            Search Research. Spark Impact.
          </Header>
          <Paragraph className="w-full mt-5 text-[#A7C4EC]">
            A place to discover, publish, and power ideas that shape the future.
          </Paragraph>

          {/* Searchbar */}
          <div className="w-full mx-auto mt-10">
            <div className="flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 px-6 py-3 bg-transparent outline-none text-gray-600 placeholder-gray-400"
              />
              <button className="bg-[#225491E5] hover:bg-[#1A2A44] text-white px-6 py-3 rounded-full transition">
                Search
              </button>
            </div>
          </div>

          {/* Topik */}
          <div className="w-full mt-10 py-6">
            <h2 className="text-2xl font-semibold">Topic</h2>
            <div className="flex justify-between gap-6 mt-4 flex-wrap">
              {topics.map((topic) => (
                <div
                  key={topic.key}
                  className="w-48 h-48 bg-[#A7C4EC] rounded-lg flex flex-col justify-end"
                >
                  <div className="w-48 h-24 bg-gradient-to-b from-[#225491] to-[#225491] rounded-b-lg flex flex-col justify-end p-4 text-white">
                    <span className="text-lg font-medium">{topic.name}</span>
                    <a href={topic.link} className="text-sm opacity-80 hover:underline">
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
  );
}