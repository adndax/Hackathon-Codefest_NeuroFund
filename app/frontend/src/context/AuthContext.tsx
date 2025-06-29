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

export interface FundedResearch {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  fundingAmount: number;
  fundingDate: string;
}

// Add interface for upload data
interface UploadData {
  file?: File;
  title?: string;
  topic?: string;
  description?: string;
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
  plugWallet?: any;
  principalId?: string | null;
  fundedResearch: FundedResearch[];
  addFundedResearch: (research: FundedResearch) => void;
  clearFundedResearch: () => void;
  // Add upload data methods
  uploadData: UploadData | null;
  setUploadData: (data: UploadData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial research data
const initialResearch: Research[] = [
  {
    id: 1,
    title: "Research Advances on the Role of Deep Learning in Materials Informatics",
    topic: "Deep Learning",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
    description: "Innovative approaches to early disease detection through biomarker analysis using advanced artificial intelligence techniques. This research focuses on developing novel computational methods for identifying disease signatures in biological samples.",
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
    description: "Exploring how ML algorithms can accelerate pharmaceutical research and development processes. This comprehensive study examines various machine learning techniques applied to drug discovery pipelines.",
    author: "Dr. Wilson",
    date: "Uploaded Jan, 5th 2025",
    likes: 78,
    status: 'ongoing',
    userId: 'default-user-3'
  }
];

// Global state variables to persist data across component re-renders
let globalFundedResearch: FundedResearch[] = [];
let globalAllResearch: Research[] = [...initialResearch];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [allResearch, setAllResearch] = useState<Research[]>(globalAllResearch);
  const [fundedResearch, setFundedResearch] = useState<FundedResearch[]>(globalFundedResearch);
  const [plugWallet, setPlugWallet] = useState<any>(null);
  const [principalId, setPrincipalId] = useState<string | null>(null);
  const [uploadData, setUploadDataState] = useState<UploadData | null>(null);

  // Sync with global state on mount
  useEffect(() => {
    setAllResearch(globalAllResearch);
    setFundedResearch(globalFundedResearch);
  }, []);

  const setLogin = (status: boolean) => {
    setIsLoggedIn(status);
    if (!status) {
      setUserState(null);
    }
  };

  const setUploadData = (data: UploadData | null) => {
    setUploadDataState(data);
  };

  const addFundedResearch = (researchData: FundedResearch) => {
    console.log("Adding funded research:", researchData);
    
    // Update both local and global state
    const updateFundedResearch = (prev: FundedResearch[]) => {
      const existing = prev.find(r => r.id === researchData.id);
      let newState: FundedResearch[];
      
      if (existing) {
        // Update existing funded research
        newState = prev.map(r => r.id === researchData.id ? researchData : r);
      } else {
        // Add new funded research
        newState = [...prev, researchData];
      }
      
      // Update global state
      globalFundedResearch = newState;
      return newState;
    };

    setFundedResearch(updateFundedResearch);

    // Update the research status in allResearch
    const updateAllResearch = (prev: Research[]) => {
      const newState = prev.map(research =>
        research.id === researchData.id
          ? { ...research, status: 'funded' as const }
          : research
      );
      
      // Update global state
      globalAllResearch = newState;
      return newState;
    };

    setAllResearch(updateAllResearch);

    console.log("Funded research added. Total funded:", globalFundedResearch.length);
  };

  const clearFundedResearch = () => {
    setFundedResearch([]);
    globalFundedResearch = [];
    
    // Reset research status
    const resetResearch = initialResearch.map(r => ({ ...r }));
    setAllResearch(resetResearch);
    globalAllResearch = resetResearch;
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

    const updateResearch = (prev: Research[]) => {
      const newState = [newResearch, ...prev];
      globalAllResearch = newState;
      return newState;
    };

    setAllResearch(updateResearch);
  };

  const updateResearch = (id: number, updates: Partial<Research>) => {
    const updateResearch = (prev: Research[]) => {
      const newState = prev.map(research => 
        research.id === id ? { ...research, ...updates } : research
      );
      globalAllResearch = newState;
      return newState;
    };

    setAllResearch(updateResearch);
  };

  const deleteResearch = (id: number) => {
    const updateResearch = (prev: Research[]) => {
      const newState = prev.filter(research => research.id !== id);
      globalAllResearch = newState;
      return newState;
    };

    setAllResearch(updateResearch);
  };

  const getUserResearch = (userId: string): Research[] => {
    return allResearch.filter(research => research.userId === userId);
  };

  const userResearch = user ? getUserResearch(user.id) : [];

  const likeResearch = (id: number, increment: boolean) => {
    const updateResearch = (prev: Research[]) => {
      const newState = prev.map(research => 
        research.id === id 
          ? { ...research, likes: research.likes + (increment ? 1 : -1) }
          : research
      );
      globalAllResearch = newState;
      return newState;
    };

    setAllResearch(updateResearch);
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
    likeResearch,
    plugWallet,
    principalId,
    fundedResearch,
    addFundedResearch,
    clearFundedResearch,
    uploadData,
    setUploadData
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