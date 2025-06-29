"use client";

import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = () => {
    // Langsung arahkan ke halaman login karena e-wallet akan digunakan di sana
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#1a2a44] text-white font-sans flex-col items-center justify-center">
      {/* Judul */}
      <h1 className="text-3xl font-semibold mb-12 text-white">
        Are you an Investor or a Researcher?
      </h1>

      {/* Kontainer untuk dua kolom */}
      <div className="flex w-full max-w-4xl gap-20">
        {/* Investor */}
        <div className="flex-1 bg-[#e8eef6] rounded-2xl p-8 text-gray-800 flex flex-col items-center">
          <div className="w-40 h-40 flex items-center justify-center mb-5">
            <img src="investor.png" alt="Investor" />
          </div>
          <p className="text-base leading-relaxed text-center mb-5 h-32 overflow-hidden">
            Gain early access to groundbreaking research and support innovative
            projects. Connect with talented researchers, invest in ideas with
            impact, and help shape the future.
          </p>
          <button
            onClick={handleSignUp}
            className="w-full max-w-xs p-3 text-white rounded-lg text-base bg-[#4a6fa5] hover:bg-[#3a5f95]"
          >
            Sign up as Investor
          </button>
        </div>

        {/* Researcher */}
        <div className="flex-1 bg-[#e8eef6] rounded-2xl p-8 text-gray-800 flex flex-col items-center">
          <div className="w-40 h-40 flex items-center justify-center mb-5">
            <img src="researcher.png" alt="Researcher" />
          </div>
          <p className="text-base leading-relaxed text-center mb-5 h-32 overflow-hidden">
            Showcase your innovative work, find funding opportunities, and
            collaborate with investors who believe in your vision. Turn your
            research into real-world impact.
          </p>
          <button
            onClick={handleSignUp}
            className="w-full max-w-xs p-3 text-white rounded-lg text-base bg-[#4a6fa5] hover:bg-[#3a5f95]"
          >
            Sign up as Researcher
          </button>
        </div>
      </div>
    </div>
  );
}
