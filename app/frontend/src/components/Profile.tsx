"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export const Profile = ({
  login, 
  role, 
  onLogout
}: {
  login: boolean;
  role?: "Researcher" | "Investor";
  onLogout?: () => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tentukan link profile berdasarkan role
  const profileLink = role === "Investor" ? "/investor-profile" : "/researcher-profile";
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    }
    console.log("Logging out...");
  };

  const profileMenuItems = [
    {
      icon: "👤",
      label: "View Profile",
      href: profileLink,
      action: () => setIsDropdownOpen(false)
    },
    {
      icon: "↗️",
      label: "Logout",
      action: handleLogout,
      isLogout: true
    }
  ];

  return (
    <>
      {login && (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <div 
            className="flex items-center bg-white bg-opacity-10 rounded-full px-5 py-1.5 cursor-pointer hover:-translate-y-0.5 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-11 h-11 rounded-full bg-[#E6C798] flex items-center justify-center text-gray-800 font-medium mr-2">
              {role?.[0] ?? ""}
            </div>
            <div className="hidden sm:block px-1">
              <div className="text-sm font-inter text-[#001124]/80 font-medium whitespace-nowrap">
                Hi, Adinda!
                <div className="text-sm font-inter text-[#001124]/80 font-bold">{role}</div>
              </div>
            </div>
            {/* Dropdown Arrow */}
            <div className={`ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E6C798] flex items-center justify-center text-gray-800 font-medium mr-3">
                    {role?.[0] ?? ""}
                  </div>
                  <div>
                    <div className="text-sm font-inter text-[#001124]/80 font-medium whitespace-nowrap">Adinda</div>
                    <div className="text-sm font-inter text-[#001124]/80 font-bold">{role}</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              {profileMenuItems.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link 
                      href={item.href}
                      onClick={item.action}
                      className={`flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        item.isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-3 text-base">{item.icon}</span>
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className={`w-full flex items-center px-4 py-3 text-sm hover:bg-gray-50 cursor-pointer transition-colors ${
                        item.isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-3 text-base">{item.icon}</span>
                      {item.label}
                    </button>
                  )}
                  {/* Separator before logout */}
                  {index === profileMenuItems.length - 2 && (
                    <div className="border-t border-gray-100 my-1"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const MobileProfile = ({
  login,
  role,
  onLogout,
  onClose
}: {
    login: boolean;
  role?: "Researcher" | "Investor";
  onLogout?: () => void;
  onClose?: () => void; // untuk close sidebar setelah navigasi
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileLink = role === "Investor" ? "/investor-profile" : "/researcher-profile";

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onClose) onClose(); // Close sidebar
    if (onLogout) onLogout();
    console.log("Logging out...");
  };

//   const handleNavigation = () => {
//     setIsDropdownOpen(false);
//     if (onClose) onClose(); // Close sidebar setelah navigasi
//   };

  const profileMenuItems = [
    {
      icon: "👤",
      label: "View Profile",
      href: profileLink,
      action: () => setIsDropdownOpen(false)
    },
    {
      icon: "↗️",
      label: "Logout",
      action: handleLogout,
      isLogout: true
    }
  ];

  return (
    <>
    { login && (<div className="relative" ref={dropdownRef}>
      {/* Profile Menu Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center justify-between py-3 text-gray-300 hover:text-white cursor-pointer rounded-lg px-3 transition-colors"
      >
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#E6C798] flex items-center justify-center text-gray-800 font-medium mr-2">
            {role?.[0] ?? "U"}
          </div>
          Profile
        </div>
        <div className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Profile Dropdown */}
      {isDropdownOpen && (
        <div className="mt-2 ml-4 space-y-1">
          {/* User Info Header */}
          <div className="px-4 py-2 border-b border-gray-600 mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#E6C798] flex items-center justify-center text-gray-800 font-medium mr-3 text-sm">
                {role?.[0] ?? "U"}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Adinda</div>
                <div className="text-xs text-gray-400">{role}</div>
              </div>
            </div>
          </div>

          {/* Profile Menu Items */}
          {profileMenuItems.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <Link 
                  href={item.href}
                  onClick={item.action}
                  className={`flex items-center py-2 px-4 text-sm rounded-lg transition-colors ${
                    item.isLogout 
                      ? 'text-red-400 hover:text-red-300 cursor-pointer hover:-translate-y-0.5' 
                      : 'text-gray-300 hover:text-foreground cursor-pointer hover:-translate-y-0.5'
                  }`}
                >
                  <span className="mr-3 text-base flex items-center justify-center w-4 h-4">{item.icon}</span>
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={item.action}
                  className={`w-full flex items-center py-2 px-4 text-sm rounded-lg transition-colors ${
                    item.isLogout 
                      ? 'text-red-400 hover:text-red-300 cursor-pointer hover:-translate-y-0.5' 
                      : 'text-gray-300 hover:text-foreground cursor-pointer hover:-translate-y-0.5'
                  }`}
                >
                  <span className="mr-3 text-base flex items-center justify-center w-4 h-4">{item.icon}</span>
                  {item.label}
                </button>
              )}
              {/* Separator before logout */}
              {index === profileMenuItems.length - 2 && (
                <div className="border-t border-gray-600 my-2"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    )}
    </>
  );
};