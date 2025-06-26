'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FundedResearch() {
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voteCount, setVoteCount] = useState(101);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(48), 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleUpvote = () => {
    if (!liked) {
      setVoteCount((prev) => prev + 1);
      setLiked(true);
    } if(liked){
      setVoteCount((prev) => prev+1);
      setLiked(false);
    }
  };

  const handleDownvote = () => {
    if (liked) {
      setVoteCount((prev) => prev - 1);
      setLiked(false);
    }
    if (!liked) {
      setVoteCount((prev) => prev - 1);
      setLiked(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] text-white min-h-screen">
      {/* Header */}
      <div className="relative md:pb-10 pb-9">
        <div className="h-20 sm:h-24 bg-[#A7C4EC]" />
        <div className="absolute top-0 px-4 sm:px-6 md:px-20 w-full h-full flex items-end justify-between">
          <div className="flex items-end gap-4">
            <div className="w-18 h-15 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#EAD2AC] border-2 border-white" />
                <div>
                <div className="text-black font-semibold text-sm sm:text-md md:text-lg ">Adindashahira Asyraf</div>
                <div className="text-[#A7C4EC] font-semibold text-xs sm:text-sm pb-5">Researcher</div>
                </div>
            </div>
          <div className="text-black text-xs sm:text-sm md:text-md font-normal md:pb-11 pb-9">
            <div className="flex items-center gap-2">
              <Image src="/map.png" alt="ITB Logo" width={24} height={24} className="object-contain" />
              Bandung, Institute of Technology
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
        <div className="px-4 sm:px-6 md:px-20 py-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Card */}
          <div className="flex flex-col gap-6 pt-14">
            <div className="bg-gradient-to-br from-[#225491] to-[#001124] p-4 rounded-xl shadow-md flex flex-col items-center">
              <div className="w-full h-36 sm:h-50 bg-gray-300 rounded-md mb-4" />
              <h3 className="text-center text-sm font-semibold mb-3">
                Research Advances on the Role of Deep Learning in Materials Informatics
              </h3>
              <p className="text-xs text-gray-400 mb-4">Uploaded Jan, 12th 2025</p>

              {/* Voting section */}
              <div className="flex items-center justify-center gap-2 text-sm bg-[#0D1B2A] rounded-md px-3 py-1 mb-3">
                <span>{voteCount}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleUpvote}
                    className={`font-bold transition-colors duration-200 ${
                      liked ? 'text-[#A7C4EC]' : 'hover:text-[#A7C4EC]'
                    }`}
                  >
                    ⬆
                  </button>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={handleDownvote}
                    className="font-bold hover:text-[#A7C4EC] transition-colors duration-200"
                  >
                    ⬇
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-[#778DA9] hover:bg-[#5a6d85] transition duration-300 text-sm text-white px-4 py-2 rounded-md w-full sm:w-auto">
                Funding Dashboard
              </button>
            </div>
          </div>

          {/* Right Metrics */}
          <div className="md:col-span-3 space-y-6">
            <h1 className="text-xl sm:text-2xl text-center font-semibold">Research Detail</h1>

            {/* Total Reach */}
            <div className="bg-[#F5F8FA] text-black rounded-xl p-5">
              <h2 className="text-md sm:text-xl font-semibold mb-8">Total Reach</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {[
                  { count: '5K+', label: 'Investor Reached' },
                  { count: '1K+', label: 'Researcher Reached' },
                  { count: '200', label: 'Total Bookmarks' }
                ].map((item, index) => (
                  <div key={index}>
                    <h4 className="text-2xl sm:text-5xl font-bold pb-2">{item.count}</h4>
                    <p className="text-sm sm:text-md text-[#225491] font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone & Fund */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Milestone */}
              <div className="bg-[#F5F8FA] text-black rounded-xl p-5 flex flex-col items-center group hover:shadow-xl transition-all duration-500">
                <h2 className="text-md sm:text-xl font-semibold mb-4">Milestone Completed</h2>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 group-hover:scale-105 transition-transform duration-800">
                  <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="#A7C4EC" strokeWidth="10" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#225491"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 45}
                      className="transition-[stroke-dashoffset] duration-1000 group-hover:opacity-0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#1B263B"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 45}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xl sm:text-3xl font-bold">
                    <h4>
                      2<span className='text-[#225491] text-sm sm:text-2xl font-semibold'>/4</span>
                    </h4>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs sm:text-sm text-[#225491] font-semibold">
                  2 out of 4 milestones is completed
                </p>
              </div>

              {/* Research Fund */}
              <div className="bg-[#F5F8FA] text-black rounded-xl p-5 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 text-center">
                <h2 className="text-md sm:text-xl font-semibold mb-2">Research Fund</h2>
                <div>
                  <h4 className="text-xl sm:text-4xl font-bold">
                    $192.50 <span className="text-[#225491] text-sm sm:text-2xl font-semibold"> / $400</span>
                  </h4>
                </div>
                <div className="md:h-6 h-3 bg-[#A7C4EC] rounded-full overflow-hidden mt-4 group-hover:scale-105 transition-transform duration-800">
                  <div
                    className="h-full bg-[#225491] transition-all duration-1000 ease-out group-hover:bg-[#1B263B] origin-left"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
