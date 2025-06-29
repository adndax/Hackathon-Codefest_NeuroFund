'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Research {
  id: number;
  title: string;
  topic?: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  image?: File | null;
}

interface NewResearch {
  title: string;
  topic?: string;
  description: string;
  image?: File | null;
}

interface ResearchContextType {
  ongoingResearch: Research[];
  publishedResearch: Research[];
  addOngoingResearch: (newResearch: NewResearch) => void;
  moveToPublished: (researchId: number) => void;
  deleteResearch: (researchId: number, type?: 'ongoing' | 'published') => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider = ({ children }: { children: ReactNode }) => {
  const [ongoingResearch, setOngoingResearch] = useState<Research[]>([
    {
      id: 1,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
    {
      id: 2,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
    {
      id: 3,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
    {
      id: 4,
      title: "Research Advances on the Role of Deep Learning in Materials Informatics",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Uploaded Jan, 12th 2025",
      likes: 101,
    },
  ]);

  const [publishedResearch, setPublishedResearch] = useState<Research[]>([
    {
      id: 5,
      title: "Biomarker-Based Disease Detection Using AI",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Published Mar, 15th 2024",
      likes: 150,
    },
    {
      id: 6,
      title: "Multidisciplinary Approaches in Biotechnology",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Published Apr, 20th 2024",
      likes: 120,
    },
    {
      id: 7,
      title: "AI-Driven Solutions for Early Disease Detection",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Published May, 10th 2024",
      likes: 130,
    },
    {
      id: 8,
      title: "Impact of Deep Learning on Biotech Research",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Adindashahira Asyraf",
      date: "Published Jun, 5th 2024",
      likes: 140,
    },
  ]);

  const addOngoingResearch = (newResearch: NewResearch) => {
    const research: Research = {
      ...newResearch,
      id: Date.now(), // Generate unique ID
      author: "Adindashahira Asyraf", // Dari user context
      date: `Uploaded ${new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })}`,
      likes: 0
    };
    
    setOngoingResearch(prev => [research, ...prev]);
  };

  const moveToPublished = (researchId: number) => {
    const research = ongoingResearch.find(r => r.id === researchId);
    if (research) {
      const publishedResearchItem: Research = {
        ...research,
        date: research.date.replace('Uploaded', 'Published')
      };
      
      setPublishedResearch(prev => [publishedResearchItem, ...prev]);
      setOngoingResearch(prev => prev.filter(r => r.id !== researchId));
    }
  };

  const deleteResearch = (researchId: number, type: 'ongoing' | 'published' = 'ongoing') => {
    if (type === 'ongoing') {
      setOngoingResearch(prev => prev.filter(r => r.id !== researchId));
    } else {
      setPublishedResearch(prev => prev.filter(r => r.id !== researchId));
    }
  };

  return (
    <ResearchContext.Provider value={{
      ongoingResearch,
      publishedResearch,
      addOngoingResearch,
      moveToPublished,
      deleteResearch
    }}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = (): ResearchContextType => {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};