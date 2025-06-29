// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Research {
  id: number;
  title: string;
  topic: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  status: 'ongoing' | 'funded' | 'published';
  userId: string;
  file?: File;
}

interface User {
  id: string;
  name: string;
  role: 'Researcher' | 'Investor';
  email?: string;
  location?: string;
  bio?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  userResearch: Research[];
  allResearch: Research[];
  setLogin: (status: boolean) => void;
  setUser: (user: User | null) => void;
  addResearch: (research: Omit<Research, 'id' | 'author' | 'date' | 'likes' | 'userId'>) => void;
  updateResearch: (id: number, updates: Partial<Research>) => void;
  deleteResearch: (id: number) => void;
  getUserResearch: (userId: string) => Research[];
  likeResearch: (id: number, increment: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial research data
const initialResearch: Research[] = [
  {
    id: 1,
    title: "Research Advances on the Role of Deep Learning in Materials Informatics",
    topic: "Deep Learning",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Smith",
    date: "Uploaded Jan, 10th 2025",
    likes: 95,
    status: 'published',
    userId: 'default-user-1'
  },
  {
    id: 2,
    title: "Biomarker-Based Disease Detection Using AI",
    topic: "Artificial Intelligence",
    description: "Innovative approaches to early disease detection through biomarker analysis.",
    author: "Dr. Johnson",
    date: "Uploaded Jan, 8th 2025",
    likes: 142,
    status: 'published',
    userId: 'default-user-2'
  },
  {
    id: 3,
    title: "Machine Learning Applications in Drug Discovery",
    topic: "Machine Learning",
    description: "Exploring how ML algorithms can accelerate pharmaceutical research.",
    author: "Dr. Wilson",
    date: "Uploaded Jan, 5th 2025",
    likes: 78,
    status: 'ongoing',
    userId: 'default-user-3'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [allResearch, setAllResearch] = useState<Research[]>(initialResearch);

  const setLogin = (status: boolean) => {
    setIsLoggedIn(status);
    if (!status) {
      setUserState(null);
    }
  };

  const setUser = (userData: User | null) => {
    setUserState(userData);
  };

  const addResearch = (researchData: Omit<Research, 'id' | 'author' | 'date' | 'likes' | 'userId'>) => {
    if (!user) return;

    const newResearch: Research = {
      ...researchData,
      id: Math.max(...allResearch.map(r => r.id), 0) + 1,
      author: user.name,
      date: `Uploaded ${new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })}`,
      likes: 0,
      userId: user.id,
    };

    setAllResearch(prev => [newResearch, ...prev]);
  };

  const updateResearch = (id: number, updates: Partial<Research>) => {
    setAllResearch(prev => 
      prev.map(research => 
        research.id === id ? { ...research, ...updates } : research
      )
    );
  };

  const deleteResearch = (id: number) => {
    setAllResearch(prev => prev.filter(research => research.id !== id));
  };

  const getUserResearch = (userId: string): Research[] => {
    return allResearch.filter(research => research.userId === userId);
  };

  const userResearch = user ? getUserResearch(user.id) : [];

  const likeResearch = (id: number, increment: boolean) => {
    setAllResearch(prev => 
      prev.map(research => 
        research.id === id 
          ? { ...research, likes: research.likes + (increment ? 1 : -1) }
          : research
      )
    );
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    userResearch,
    allResearch,
    setLogin,
    setUser,
    addResearch,
    updateResearch,
    deleteResearch,
    getUserResearch,
    likeResearch
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}