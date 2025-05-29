"use client";

import { useEffect, useState } from "react";
import { NavigationBar } from "@/components/Navbar";
import { navItemsLoggedIn, navItemsUnloggedIn } from "@data";
import { ImageIcon } from "lucide-react";
import { NextDelButton } from "@/components/Button";
import { InputText, TextArea } from "@/components/TextField";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Modal } from "@/components/Modal";
import Image from 'next/image';

export default function UploadResearcherPage() {
  const router = useRouter();
  const { setLogin, setUser } = useAuth();
  const { isLoggedIn, user } = useAuth();
  const navItems = isLoggedIn ? navItemsLoggedIn(user?.role as "Researcher" | "Investor") : navItemsUnloggedIn;

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    router.push("/upload-4-researcher");
  };

  const handleDelete = () => {
    const user = { name: "Adinda", role: "Researcher" };
    setUser(user);
    setLogin(true);
    router.push("/researcher-profile");
      
  const handleNext = () => {
    setShowModal(true);
  };

  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationBar 
          navItems={navItems} 
          current_item="Home" 
          login={isLoggedIn}
          role={user?.role as "Researcher" | "Investor"} // Pass role dari user object
      />
      <div className="max-w-4xl mx-auto py-40 pl-20">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 py-15">
              <div className="aspect-square w-60 h-65 border-2 border-dashed border-gray-700 bg-foreground/80 flex items-center justify-center -mx-40">
                <ImageIcon size={48} className="text-gray-600" />
              </div>
            </div>

            <div className="w-full md:w-full space-y-6 mt-5">
              <InputText label="title" value={formData.title} onChange={handleChange}>Title*</InputText>
              <InputText label="topic" value={formData.topic} onChange={handleChange}>Topic</InputText>
              <TextArea label="description" value={formData.description} onChange={handleChange} rows={6}>Description</TextArea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-7">
            <NextDelButton onClick={handleDelete}>Delete</NextDelButton>
            <NextDelButton onClick={handleSubmit} className="bg-primary">Next</NextDelButton>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-[#A7C4EC] text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl space-y-6">
          <div className="flex justify-center items-center rounded-t-lg">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded">
              <Image src="/Lock.png" alt="Lock Logo" width={24} height={24} className="object-contain" />
              <h2 className="text-lg font-bold">Confirm Your Funding</h2>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black mb-1">Funding Details:</h3>
            <div className="border rounded-md bg-gray-50 p-4 space-y-1 text-sm">
              <p><strong>🎯 Project:</strong> {formData.title || "Statistical Learning-Based Analysis of Human Driver Model Parameters"}</p>
              <p><strong>💰 Tokens:</strong> 500 ICP</p>
              <p><strong>📅 Milestones:</strong> M1, M2</p>
              <p><strong>⏱ Duration:</strong> 3 Months</p>
              <p><strong>📅 Starts:</strong> 10 May 2025</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black mb-1">Connected Wallet:</h3>
            <div className="border rounded-md bg-gray-50 p-4 space-y-1 text-sm">
              <p><strong>👤 Principal ID:</strong> abc-123...xyz</p>
              <p><strong>💼 Wallet Address:</strong> x4a-98d...a12</p>
              <p><strong>💳 Balance:</strong> 1820.14 ICP</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-bold text-black mb-1">Agreement Preview:</h3>
            <a href="/path/to/agreement.pdf" target="_blank" className="text-blue-600">
              📄 View Agreement (PDF)
            </a>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>I have reviewed and agree to the funding terms</span>
            </label>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setShowModal(false);
                setShowSuccess(true); 
                console.log("Funding confirmed!");
              }}
              className="px-5 py-2 rounded-md bg-[#225491] text-white hover:bg-[#1c477b] font-semibold"
            >
              Sign & Submit
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="relative bg-[#225491] text-white p-8 rounded-xl w-full max-w-md text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <div className="bg-[#5CED73] p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold">Funding submitted!</h2>
        </div>
      </Modal>
    </div>
  );
}
