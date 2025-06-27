"use client";
import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-xl"> {/* Wrapper modal box */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 z-10"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

