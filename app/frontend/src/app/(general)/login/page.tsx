'use client';

import { Header, Paragraph } from "@/components/Typography";
import { useAuth } from "@/context/AuthContext"; // Import useAuth
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { setLogin, setUser } = useAuth(); // Menggunakan setLogin dan setUser dari context

  const handleResearcherLogin = () => {
    // Simulasi login sebagai Researcher
    const user = { name: "Adinda", role: "Researcher" }; // Membuat objek user
    setUser(user);       // Menyimpan data user di context
    setLogin(true);      // Mengubah status login menjadi true
    router.push("/researcher");  // Arahkan ke halaman researcher
  };

  const handleInvestorLogin = () => {
    // Simulasi login sebagai Investor
    const user = { name: "Adinda", role: "Investor" }; // Membuat objek user
    setUser(user);       // Menyimpan data user di context
    setLogin(true);      // Mengubah status login menjadi true
    router.push("/investor");    // Arahkan ke halaman investor
  };

  return (
    <div className="flex min-h-screen bg-[#1a2a44] text-white font-sans gap-6">
      {/* Kolom bagian kiri */}
      <div className="flex flex-1 flex-col items-center justify-center py-10 px-5">
        <div className="w-80 h-80 flex items-center justify-center text-white">
          <img src="asset-3d-3.png" alt="NeuroFund Logo" className="w-full h-full object-contain" />
        </div>
        <Paragraph className="text-base leading-relaxed text-center max-w-md text-[#A7C4EC]">
          NeuroFund connects researchers with collective funding through a transparent voting-based platform. Join a community that believes the best innovations deserve collective support!
        </Paragraph>
      </div>

      {/* Kolom bagian kanan untuk form login */}
      <div className="flex flex-1 flex-col items-center justify-center py-10 px-5">
        {/* Judul */}
        <Header className=" mb-5 p-5">
          Login to NeuroFund
        </Header>
        
        {/* Form */}
        <div className="bg-[#e8eef6] rounded-2xl p-10 w-full max-w-md text-gray-800">
          {/* Bagian researcher */}
          <div className="mb-5 pb-3">
            <Paragraph className="text-left mb-3 pb-2">
              Login as Researcher
            </Paragraph>
            <button
              onClick={handleResearcherLogin}
              className="w-full p-3 text-white rounded-lg text-base bg-[#4a6fa5] hover:bg-[#3a5f95] flex items-center justify-center gap-2"
            >
              <span className="w-8 h-8 bg-gray-200 inline-block rounded-2xl">
                <img src="asset-3d-4.png"/>
              </span>
              I&apos;m a Researcher
            </button>
          </div>
    
          {/* Bagian investor*/}
          <div className="mb-5">
            <Paragraph className="text-left mb-3 pb-2">
              Login as Investor
            </Paragraph>
            <button 
            onClick={handleInvestorLogin}
            className="w-full p-3 text-white rounded-lg text-base bg-[#4a6fa5] hover:bg-[#3a5f95] flex items-center justify-center gap-2">
              <span className="w-8 h-8 bg-gray-200 inline-block rounded-2xl">
                <img src="asset-3d-5.png"/>
              </span>
              I&apos;m an Investor
            </button>
          </div>

          {/* Bagian suruh sign up */}
          <p className="text-center text-sm text-gray-800">
            Do not have an account?{" "}
            <a href="/sign-up" className="text-[#4a6fa5] underline font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
