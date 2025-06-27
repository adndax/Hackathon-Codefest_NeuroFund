"use client";

import { useState } from "react";

// Definisikan tipe untuk props
interface CardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
}

export default function Card({ title, description, author, date, likes }: CardProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [count, setCount] = useState(likes);

  const handleLike = () => {
    setCount(count + 1);
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setCount(count - 1);
    setDisliked(!disliked);
    setLiked(false);
  };

  return (
    <div className="bg-[#225491] rounded-lg p-4 shadow-md min-h-[300px] flex flex-col justify-between">
      {/* Placeholder untuk gambar */}
      <div className="w-full h-48 bg-gray-300 rounded flex items-center justify-center mb-4">
        <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{date}</p>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center space-x-1 bg-gray-500 rounded-full px-2 py-1">
          <span className="text-white text-sm">{count}</span>
          <button
            onClick={handleLike}
            className="p-1 rounded-full hover:bg-gray-600 transition"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </button>
          <button
            onClick={handleDislike}
            className="p-1 rounded-full hover:bg-gray-600 transition transform rotate-180"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}