'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Tambahkan walletAddress ke tipe User
export interface User {
  name: string;
  role: string;
  walletAddress?: string; // optional, bisa diisi atau tidak
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  setLogin: (login: boolean) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setLogin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
