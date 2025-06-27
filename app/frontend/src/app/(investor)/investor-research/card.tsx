"use client";

import { useState } from "react";
import {Header, Paragraph} from "@/components/Typography";
import Link from "next/link";

interface CardProps {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
}

function Card({ id, title, content, author, date, likes }: CardProps) {

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

  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="max-w-xl bg-gray-100 text-gray-900 rounded-lg p-6 shadow-md">
      <Link href={`/investor-research/${id}`}>
        <Header className="text-xl font-bold mb-2 text-justify">{title}</Header>
        <Paragraph className="text-gray-700 mb-4 text-justify">{content}</Paragraph>
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
          <span className="text-sm font-medium">{author}</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{count}</span>
          {/* Tombol Like */}
          <button
            onClick={handleLike}
            className={`p-2 rounded-full ${liked ? "bg-blue-200" : "bg-gray-200"} hover:bg-blue-300 transition`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </button>

          {/* Tombol Dislike */}
          <button
            onClick={handleDislike}
            className={`p-2 rounded-full ${disliked ? "bg-blue-200" : "bg-gray-200"} hover:bg-blue-300 transition`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Tombol Bookmark */}
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full ${bookmarked ? "bg-blue-200" : "bg-gray-200"} hover:bg-blue-300 transition`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>
    
    
  )
}

export default Card;